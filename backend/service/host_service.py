from sqlalchemy.orm import Session
from repository import host_repository
from schemas.schemas import HostCreateSchema

def get_all(db: Session):
    return host_repository.get_all(db)

def get_by_id(db: Session, host_id: int):
    return host_repository.get_by_id(db, host_id)

def create(db: Session, data: HostCreateSchema):
    return host_repository.create(db, data)

def delete(db: Session, host_id: int):
    return host_repository.delete(db, host_id)
