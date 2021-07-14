"""
  Query set for the User object
"""
from sqlalchemy.orm import Session
from api.db import models

def get_user(database: Session, user: models.User):
	"""
		Get user object from database based on currently logged in user
  """
	return database.query(models.User).filter(models.User.login == user.login).first()

def create_user(database: Session, user: models.User):
	"""
    Create new User in the database
  """
	database.add(user)
	database.commit()
	database.refresh(user)
	return user

def all_users(database: Session):
	"""
    Get all user from database
  """
	return database.query(models.User).all()

def save_user(database: Session, user: models.User):
	"""
    Save User object to database
  """
	database.add(user)
	database.commit()
	database.refresh(user)
	return user
