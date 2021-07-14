"""
    Query Set for Resource Object
"""
from sqlalchemy.orm import Session

from api.db import models
from api.db.models import Variation, Workbook
from api.db.helpers import clone

def row2dict(row):
	"""
		Convert object row from database into python dict

		parameters:
		----
			row: row of query result
	"""
	data = {}
	for column in row.__table__.columns:
		data[column.name] = str(getattr(row, column.name))
	return data

def get_entity(database: Session, input_id: int, table):
	"""
		Get Resource from table by ID
	"""
	return database.query(table).filter(table.id == input_id).first()

def get_entities_by_name(database: Session, name: str, table):
	"""
		Get multiple Resource from table by name
	"""
	return database.query(table).filter(table.name.like(name)).all()

def get_entity_by_name(database: Session, name: str, table):
	"""
		Get first object from table by name
	"""
	return database.query(table).filter(table.name.like(name)).first()

def all_entities(database: Session, table):
	"""
		Get all object from table
	"""
	return database.query(table).all()

def all_entity_paths(database: Session, _, table):
	"""
		Get all objects path from table
	"""
	return list(map(lambda r: r.path, database.query(table).all()))

def clone_variation(database: Session, input_id: int):
	"""
		Get Variation object from database and create local clone
	"""
	cloned = clone(database, database.query(Variation).filter(Variation.id == input_id))
	return cloned

def save_variation(database: Session, variation: Variation):
	"""
		Save Variation object to database
	"""
	database.add(variation)
	database.commit()
	database.refresh(variation)
	return variation

def save_entity(database: Session, name: str, obj, table):
	"""
		Save object to database

		parameters:
		---
			database: Session
				database session
			name: str
				primary name key
			obj: dict
				modified data
			table: Models
				object model
	"""
	db_obj = table(
			name=name,
			data=obj)

	database.add(db_obj)
	database.commit()
	database.refresh(db_obj)
	return db_obj

def delete_unused_variations(database: Session):
	"""
		Delete unused Variation objects (NOT FUNCTIONAL)
	"""
	# would be nice to do in the db but this doesn't work because path is a hybrid property
	# unused_vars = db.query(Variation).join(Workbook, Workbook.variations.contains([Variation.path])).all()

	all_workbooks = database.query(Workbook).all()
	all_variations = database.query(Variation).all()
	for variation in all_variations:
		found = False
		for workbook in all_workbooks:
			if variation.path in workbook.variations:
				found = True
				if not found:
					database.delete(variation)
	database.commit()

def clear_all_tables(database: Session):
	"""
		clear all data in the database
	"""
	for model in [
			models.VMA,
			models.TAM,
			models.AdoptionData,
			models.CustomAdoptionPDS,
			models.CustomAdoptionRef,
			models.Scenario,
			models.Reference,
			models.Variation,
			models.Workbook,
			models.VMA_CSV
		]:
		database.query(model).delete()
	database.commit()
