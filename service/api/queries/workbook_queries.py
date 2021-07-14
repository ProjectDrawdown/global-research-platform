"""
  Query set for the Workbook object
"""
from sqlalchemy.orm import Session

from api.db.helpers import clone
from api.db.models import Workbook as DBWorkbook

def workbook_by_id(database: Session, input_id: int) -> DBWorkbook:
	"""
		Get Workbook from database by ID
	"""
	return database.query(DBWorkbook).get(input_id)

def workbook_by_commit(database: Session, uuid: str) -> DBWorkbook:
	"""
		Get Workbook from database by commit
	"""
	return database.query(DBWorkbook).filter(DBWorkbook.commit == uuid).first()

def workbooks_by_user_id(database: Session, author_id: int) -> DBWorkbook:
	"""
		Get Workbook from database by user ID
	"""
	return database.query(DBWorkbook).filter(DBWorkbook.author_id == author_id).all()

def workbooks_by_default_user(database: Session) -> DBWorkbook:
	"""
		Get Workbook from database when user ID is None
	"""
	return database.query(DBWorkbook).filter(DBWorkbook.author_id.is_(None)).all()

def all_workbooks(database: Session, input_id: int):
	"""
		Get all Workbook from datas
	"""
	query_1 = database.query(DBWorkbook).filter(DBWorkbook.author_id == input_id)
	query_2 = database.query(DBWorkbook).filter(DBWorkbook.author_id.is_(None))
	query_3 = query_1.union(query_2)
	return query_3.all()

def clone_workbook(database: Session, input_id: int):
	"""
		Get Workbook by ID and create a local clone
	"""
	cloned = clone(database, database.query(DBWorkbook).filter(DBWorkbook.id == input_id))
	return cloned

def save_workbook(database: Session, workbook: DBWorkbook):
	"""
		Save Workbook object to database
	"""
	database.add(workbook)
	database.commit()
	database.refresh(workbook)
	return workbook
