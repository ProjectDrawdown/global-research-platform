"""
  This file serves as a mock functionality of the solutions library
  untuil it is fully implemented
"""
import json
from fastapi import UploadFile
from api.db import models

from api.transform import (
  csv_to_json
)

def validate_and_convert_resource(entity: models.EntityName, file: UploadFile):
  """
    Mock function of processing the file
    TODO: Discuss with Denise on potential implementation
  """
  if (entity in ["scenario", "reference"]):
    return json.loads(file.file.read())

  data = csv_to_json(file.file.read())

  return {'rows':data}

