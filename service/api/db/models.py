"""
	Models objects for Postgres database
"""
import json
import enum
from datetime import datetime
from jsonschema import validate
from sqlalchemy import DateTime, Boolean, Column, ForeignKey, Integer, String, Enum, LargeBinary
from sqlalchemy.dialects.postgresql import JSONB, ARRAY
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from api.config import get_resource_path, get_path
from .database import Base
from .json_schemas import workbook_schema

class UserRole(enum.Enum):
	"""
		Base enum for User Role
	"""
	default = 1

class User(Base):
	"""
		Represent the User Table
	"""
	__tablename__ = "user"

	id = Column(Integer, primary_key=True, index=True)
	login = Column(String, unique=True, index=True)
	email = Column(String, unique=True, index=True)
	provider = Column(String)
	name = Column(String)
	company = Column(String)
	location = Column(String)
	picture = Column(String)
	is_active = Column(Boolean, default=True)
	role = Column(Enum(UserRole), default=UserRole.default)
	meta = Column(JSONB)
	workbooks = relationship("Workbook", back_populates="author")
	vma_csvs = relationship("VMA_CSV", back_populates="author")

class Workbook(Base):
	"""
		Represent the Workbook Table
	"""
	__tablename__ = 'workbook'

	id = Column(Integer, primary_key=True, index=True)
	version = Column(Integer, default=0)
	name = Column(String)
	description = Column(String)
	regions = Column(ARRAY(String), default=['World'])
	author_id = Column(Integer, ForeignKey('user.id'))
	author = relationship("User", back_populates="workbooks")
	ui = Column(JSONB)
	start_year = Column(Integer)
	end_year = Column(Integer)
	variations = Column(ARRAY(JSONB))
	has_run = Column(Boolean, default=False)
	created_at = Column(DateTime, default=datetime.now())
	updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())

	@validates('data')
	def validate_data(self, _, value):
		"""
			Validate input value with schema
		"""
		my_json = json.loads(value)
		# Validate will raise exception if given json is not
		# what is described in schema.
		validate(instance=my_json, schema=workbook_schema)

class Resource(object):
	"""
		Represent the Resource Table
	"""
	__tablename__ = 'resource'

	id = Column(Integer, primary_key=True)
	name = Column(String, index=True)
	# uniqe name to prevent duplication on fetch
	ref_name = Column(String, index=True)
	data = Column(JSONB)
	author_id = Column(Integer, ForeignKey('user.id'))
	author = relationship("User")

	@hybrid_property
	def path(self):
		"""
			return resource path
		"""
		return get_resource_path(self.__tablename__, self.id)

class Scenario(Resource, Base):
	"""
		Represent the Scenario Table
	"""
	__tablename__ = 'scenario'

class Reference(Resource, Base):
	"""
		Represent the Reference Table
	"""
	__tablename__ = 'reference'

class Variation(Resource, Base):
	"""
		Represent the Variation Table
	"""
	__tablename__ = 'variation'

class VMA_CSV(Base): # pylint: disable=invalid-name
	"""
		Represent the VMA_CVS Table
	"""
	__tablename__ = 'vma_csv'
	id = Column(Integer, primary_key=True)
	name = Column(String, index=True)
	technology = Column(String)
	variable = Column(String)
	legacy_variable = Column(String)
	original_filename = Column(String)
	author_id = Column(Integer, ForeignKey('user.id'))
	author = relationship("User", back_populates="vma_csvs")
	data = Column(LargeBinary)

	@hybrid_property
	def path(self):
		"""
			Get the path of VMA
		"""
		return get_path(self.__tablename__, self.id)

class TAM(Resource, Base):
	"""
		Represent the TAM Table
	"""
	__tablename__ = 'tam'

class VMA(Resource, Base):
	"""
		Represent the VMA Table
	"""
	__tablename__ = 'vma'

class AdoptionData(Resource, Base):
	"""
		Represent the Adoption Data Table
	"""
	__tablename__ = 'adoption_data'

class CustomAdoptionPDS(Resource, Base):
	"""
		Represent the Custom Adoption PDS Table
	"""
	__tablename__ = 'ca_pds'

class CustomAdoptionRef(Resource, Base):
	"""
		Represent the Custom Adoption Reference Table
	"""
	__tablename__ = 'ca_ref'
