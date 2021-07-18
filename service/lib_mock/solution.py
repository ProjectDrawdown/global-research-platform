"""
  This file serves as a mock functionality of the solutions library
  untuil it is fully implemented
"""
from fastapi import UploadFile

def validate_and_convert_resource(entity: str, file: UploadFile):
  """
    Mock function of processing the file
    TODO: Discuss with Denise on potential implementation
  """
  print(f"Mock Processing {entity} Resource with {file.filename}")
  return dict()
