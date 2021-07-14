"""
    Generate connection to the database
"""
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

metadata = MetaData()

def get_session_maker(database_url):
	"""
    Generate database session

    Parameters
    ----
    database_url: str
      the URL of the database
  """
	engine = create_engine(database_url)
	return sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
