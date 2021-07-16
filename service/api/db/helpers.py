"""
  Cloning query into object
"""
from sqlalchemy.orm import Session
from sqlalchemy.orm import Query
from sqlalchemy.orm.session import make_transient

def clone(database: Session, query: Query):
	"""
		Queries the database and return result as object

		Parameters:
		-----
		DB: Session
			session object
		query: Query
			Intended query
	"""
	source_obj = query.all()[0]

	database.expunge(source_obj)  # expunge the object from session
	# http://docs.sqlalchemy.org/en/rel_1_1/orm/session_api.html#sqlalchemy.orm.session.make_transient
	make_transient(source_obj)
	delattr(source_obj, 'id')
	return source_obj
