"""
    Route mapping for the Resource API
"""
from typing import List
import pathlib
from fastapi import APIRouter, Depends, File, UploadFile, Form
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound
from api.config import get_settings, get_db
from api.db import models
from api.routers import schemas
from api.routers.auth import get_current_active_user
from api.routers.helpers import (
  convert_resource_file
)
from api.queries.resource_queries import (
    get_entity,
  get_entities_by_name,
  save_entity,
  publish_entity,
  all_entities,
  all_entity_paths,
  clone_variation,
  save_variation,
  clear_all_tables
)
from api.queries.workbook_queries import (
  save_workbook
)
from api.transform import (
  transform,
  populate,
  convert_vmas_to_binary
)

settings = get_settings()
router = APIRouter()
DATADIR = pathlib.Path(__file__).parents[0].joinpath('data')

entity_mapping = {
  'scenario': models.Scenario,
  'reference': models.Reference,
  'variation': models.Variation,
  'vma': models.VMA,
  'adoption_data': models.AdoptionData,
  'tam': models.TAM,
  'ca_pds': models.CustomAdoptionPDS,
  'ca_ref': models.CustomAdoptionRef
}

@router.get('/resource/vma/info/{technology}/{name}',
  summary="Get the VMA info for a given technology",
  description="VMA info exists when VMA sources cannot be viewed." +
      "Note that there may not be existing VMA info for every technology.",
  tags=["Resource"]
  )
async def get_vma_info(name:str, technology: str, database: Session = Depends(get_db), db_active_user: models.User = Depends(get_current_active_user)):
  """
    VMA info exists when VMA sources cannot be viewed.
        Note that there may not be existing VMA info for every technology.

    Parameters:
    ------
    technology: str
      given technology name
    database: Session
      database session, defaults to initialize session
  """
  return get_entities_by_name(database, name, technology, models.VMA, db_active_user)


@router.get('/resource/vma/all/{technology}',
  summary="Get all the VMA data for a given technology",
  description="Returns all VMA data for a technology",
  tags=["Resource"]
  )
async def get_vma_all(technology: str, database: Session = Depends(get_db), db_active_user: models.User = Depends(get_current_active_user)):
  """
    Get all the VMA data for a given technology

    Parameters:
    ------
    technology: str
      given technology name
    database: Session
      database session, defaults to initialize session
  """
  return get_entities_by_name(database, f'solution/{technology}/%.csv', models.VMA, db_active_user)


@router.get('/resource/{entity}/{input_id}', response_model=schemas.ResourceOut,
  summary="Get resource entity by id",
  tags=["Resource"]
  )
async def get_by_id(entity: models.EntityName, input_id: int, database: Session = Depends(get_db)):
  """
    Get resource entity by id

    Parameters:
    ------
    entity: EntityName
      resource entity, maps to the EntityName enum
    input_id: int
      desired resource entity id
    database: Session
      database session, defaults to initialize session
  """
  return get_entity(database, input_id, entity_mapping[entity])


@router.get('/resource/{entity}', response_model=List[schemas.ResourceOut],
  summary="Get resource entity by name",
  tags=["Resource"]
  )
async def get_by_name(entity: models.EntityName, name: str, 
  database: Session = Depends(get_db), db_active_user: models.User = Depends(get_current_active_user)):
  """
    Get resource entity by name

    Parameters:
    ------
    entity: EntityName
      resource entity, maps to the EntityName enum
    name: str
      resource entity name
    database: Session
      database session, defaults to initialize session
  """
  return get_entities_by_name(database, name, entity_mapping[entity], db_active_user)


@router.get('/resource/{entity}s/full', response_model=List[schemas.ResourceOut],
  summary="Get the full resource (all data) of an entity by name",
  tags=["Resource"]
  )
async def get_all(entity: models.EntityName, database: Session = Depends(get_db),
  db_active_user: models.User = Depends(get_current_active_user)):
  """
    Get the full resource (all data) of an entity by name

    Parameters:
    ------
    entity: EntityName
      resource entity, maps to the EntityName enum
    database: Session
      database session, defaults to initialize session
    db_active_user: User
      current logged in user
  """
  return all_entities(database, entity_mapping[entity], db_active_user)


@router.get('/resource/{entity}s/paths', response_model=List[str],
  summary="Get the resource paths (no data) of an entity by name",
  tags=["Resource"]
  )
async def get_all_paths(entity: models.EntityName, database: Session = Depends(get_db)):
  """
    Get the resource paths (no data) of an entity by name

    Parameters:
    -----
    entity: EntityName
      resource entity, maps to the EntityName enum
    database: Session
      database session, defaults to initialize session
  """
  return all_entity_paths(database, entity, entity_mapping[entity])


@router.post('/resource/{technology}/{entity}',
  summary="Uploads a new resource data of an entity by name",
  description="Uploads a new resource data of an entity by name. Accepts an Excel file" +
    "with a valid format",
  tags=["Resource"]
  )
async def post_resource_data(
    technology: str,
    entity: models.EntityName, file: UploadFile = File(...),
    name: str = Form(...), database: Session = Depends(get_db),
  db_active_user: models.User = Depends(get_current_active_user)):
  """
    Uploads a new resource data of an entity by name. Accepts CSV and Json object

    Parameters:
    ----
    entity: EntityName
      resource entity, maps to the EntityName enum
    file: UploadFile
      Uploaded Excel file
    name: str
      Name intended for resource
    database: Session
      database session, defaults to initialize session
  """
  if file.content_type not in [
    "text/comma-separated-values", "text/csv", "application/csv",
    "application/excel", "application/vnd.ms-excel", "application/vnd.msexcel",
    "application/json"]:
    raise HTTPException(status_code=400, detail="Invalid document type")

  resource_obj = convert_resource_file(file)

  # TODO: object validation when saved to DB
  return save_entity(database, name, technology, resource_obj, entity_mapping[entity], db_active_user)

@router.put('/resource/{entity}/{input_id}/publish',
  summary='publish resource to be public',
  description='publishing resource by entity to be public, if public, the resource ' +
    'are then accessable for other users',
  tags=["Resource"])
async def publish_resource_by_id(entity: models.EntityName, input_id: int,
  database: Session = Depends(get_db),
  db_active_user: models.User = Depends(get_current_active_user)):
  """
    Publishing an entity to make it public by its entity id and type

    Parameters:
    ----
    entity: EntityName
      resource entity, maps to the EntityName enum
    input_id: str
      id of entity
    database: Session
      database session, defaults to initialize session
    db_active_user: User
      logged in user
  """
  try:
    return publish_entity(database, entity_mapping[entity], input_id, db_active_user, True)
  except NoResultFound:
    raise HTTPException(status_code=404, detail=entity + " not found")

@router.delete('/resource/{entity}/{input_id}/publish',
  summary='unpublish resource to be private',
  description='unpublish a public resource to and make it accessable only to author',
  tags=["Resource"])
async def unpublish_resource_by_id(entity: models.EntityName, input_id: int,
  database: Session = Depends(get_db),
  db_active_user: models.User = Depends(get_current_active_user)):
  """
    Unpublish an entity to make it private by its entity id and type

    Parameters:
    ----
    entity: EntityName
      resource entity, maps to the EntityName enum
    input_id: str
      id of entity
    database: Session
      database session, defaults to initialize session
    db_active_user: User
      logged in user
  """
  try:
    return publish_entity(database, entity_mapping[entity], input_id, db_active_user, False)
  except NoResultFound:
    raise HTTPException(status_code=404, detail=entity + " not found")

@router.post('/variation/fork/{input_id}', response_model=schemas.VariationOut,
  summary="Fork a variation with given id",
  description="Finds the variation by id, cloning and override the value before saving it" +
    "back to the database.",
  tags=["Resource"]
  )
async def fork_variation(input_id: int, patch: schemas.VariationPatch, database: Session = Depends(get_db)):
  """
    Finds the variation by id, cloning and override the value before saving it
    back to the database.

    Parameters:
    ----
    input_id: str
      variation id
    patch: schemas.VariationPatch
      overidding value of Variation object
    database: Session
      database session, defaults to initialize session
  """
  try:
    cloned_variation = clone_variation(database, input_id)
  except:
    raise HTTPException(status_code=400, detail="Variation not found")

  if patch.scenario_parent_path is not None:
    cloned_variation.data['scenario_parent_path'] = patch.scenario_parent_path
  if patch.scenario_parent_path is not None:
    cloned_variation.data['reference_parent_path'] = patch.reference_parent_path
  if patch.scenario_vars is not None:
    cloned_variation.data['scenario_vars'] = patch.scenario_vars
  if patch.reference_vars is not None:
    cloned_variation.data['reference_vars'] = patch.reference_vars
  if patch.vma_sources is not None:
    cloned_variation.data['vma_sources'] = patch.reference_vars

  return save_variation(database, cloned_variation)

@router.post('/variation', response_model=schemas.VariationOut,
  summary="Create a new variation",
  description="Note: the variation is not automatically added to the workbook." +
    "Use `POST /workbook/{id}/variation` to add a variation to a workbook.",
  tags=["Resource"]
  )
async def post_variation(variation: schemas.VariationIn, database: Session = Depends(get_db)):
  """
    Create a new variation from input, variation is not automatically added to workbook.

    Parameters:
    ----
    patch: schemas.VariationPatch
      overidding value of Variation object
    database: Session
      database session, defaults to initialize session
  """
  new_variation = models.Variation(
    name=variation.name,
    data={},
  )
  new_variation.data['scenario_parent_path'] = variation.scenario_parent_path
  new_variation.data['reference_parent_path'] = variation.reference_parent_path
  new_variation.data['scenario_vars'] = variation.scenario_vars
  new_variation.data['reference_vars'] = variation.reference_vars
  new_variation.data['vma_sources'] = variation.vma_sources
  return save_variation(database, new_variation)

@router.get("/initialize",
  summary="Initialize the database with data",
  description="""
    Puts default scenario, reference, VMA, etd data into the database.
    Creates corresponding workbook for each scenario. In production, initialization is only allowed once.
  """,
  tags=["Resource"]
  )
async def initialize(database: Session = Depends(get_db)):
  """
    Initialize the database with data

    Parameters:
    ----
    database: Session
      database session, defaults to initialize session
  """
  if database.query(models.VMA).count() > 0:
    if settings.is_production:
      raise HTTPException(status_code=400, detail="Database already initialized")

    clear_all_tables(database)

  [scenario_json, references_json] = transform()

  # create base scenario
  canonical_scenarios = ['drawdown-2020', 'plausible-2020', 'optimum-2020']
  for canonical_scenario in canonical_scenarios:
    scenario = save_entity(database, canonical_scenario, "n/a", scenario_json, models.Scenario)
    reference = save_entity(database, canonical_scenario, "n/a", references_json, models.Reference)
    variation = models.Variation(
      name='default',
      data={
        "scenario_parent_path": scenario.path,
        "reference_parent_path": reference.path,
        "scenario_vars": {},
        "reference_vars": {},
        "vma_sources": {}
      }
    )
    save_variation(database, variation)
    variation_dict = variation.__dict__['data']
    workbook = models.Workbook(
      name=canonical_scenario,
      description=canonical_scenario + " one of the canonical scenarios.",
      ui={},
      regions=['World'],
      start_year=2014,
      end_year=2060,
      variations=[
        variation_dict
      ]
    )
    _ = save_workbook(database, workbook)

  # populate resource tables:
  resource_models = [
    ('vma_data', models.VMA),
    ('tam', models.TAM),
    ('ad', models.AdoptionData),
    ('ca_pds_data', models.CustomAdoptionPDS),
    ('ca_ref_data', models.CustomAdoptionRef)
  ]
  for (directory, model) in resource_models:
    resources = populate(directory)
    for res in resources:
      tokens = res['technology'].split('/')
      save_entity(database, res['filename'], tokens[len(tokens) - 1], res['data'], model)

  vmas = convert_vmas_to_binary()
  for vma in vmas:
    tokens = vma['filename'].split('/')
    vma_csv = models.VMA_CSV(
      name=tokens[len(tokens) - 1],
      technology=vma['technology'],
      variable=vma['path'],
      legacy_variable=vma['legacy_variable'],
      original_filename=vma['filename'],
      data=vma['data']
    )
    database.add(vma_csv)
  database.commit()

