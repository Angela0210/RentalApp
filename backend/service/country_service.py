from sqlalchemy.orm import Session
from repository import country_repository
from schemas.schemas import CountryCreateSchema

def get_all(db: Session):
    return country_repository.get_all(db)

def get_by_id(db: Session, country_id: int):
    return country_repository.get_by_id(db, country_id)

def create(db: Session, data: CountryCreateSchema):
    return country_repository.create(db, data)

def delete(db: Session, country_id: int):
    return country_repository.delete(db, country_id)
