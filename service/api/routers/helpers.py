from datetime import datetime, timedelta
from fastapi import UploadFile
from fastapi import HTTPException, status
from fastapi.security.utils import get_authorization_scheme_param
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.params import Security
from pydantic import ValidationError
import json
import jwt
from api.config import get_settings
from .schemas import User
from api.db import models
from api.transform import (
  csv_to_json
)


settings = get_settings()
security = HTTPBearer() 
credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d

def get_user_from_header(credentials: HTTPAuthorizationCredentials = Security(security)) -> User:
    try:
        payload = jwt.decode(
            credentials.credentials, settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm]
        )
        try:
            token_data = User(**payload)
            return token_data
        except ValidationError:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception

def get_refresh_token_from_header(credentials: HTTPAuthorizationCredentials = Security(security)) -> str:
    try:
        payload = jwt.decode(
            credentials.credentials, settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm]
        )
        try:
            return payload['refresh_token']
        except ValidationError:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception

def create_access_token(*, data: User, exp: int = None) -> bytes:
    to_encode = data
    if exp is not None:
        to_encode.update({"exp": exp})
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
        to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm
    )
    return encoded_jwt

def generate_token():
    """
        generate a default token
    """
    return 0

def decode_google_id_token(id_token):
    """
        decode the token provided by google

        Parameter:
        ----
        id_token: str
            token to be decoded
    """
    decoded_token = jwt.decode(id_token, verify=False)
    return decoded_token

def validate_and_convert_resource_file(entity: models.EntityName, file: UploadFile):
  """
    process input file and convert them into data to be saved to the database
    TODO: Discuss with Denise on potential implementation
    TODO: How should we validate the data format?

    Parameters:
    ----
    entity: EntityName
        entity type for the object we are updating
    file: UploadFile
        the uploaded file streamed from the API
  """
  if (entity in ["scenario", "reference"]):
    return json.loads(file.file.read())

  data = csv_to_json(file.file.read().decode('utf-8').splitlines())

  return {'rows':data}
