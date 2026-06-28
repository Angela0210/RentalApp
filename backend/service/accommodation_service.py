from sqlalchemy.orm import Session
from repository import accommodation_repository
from schemas.schemas import AccommodationCreateSchema, AccommodationUpdateSchema
from fastapi import HTTPException

def get_all(db: Session):
    return accommodation_repository.get_all(db)

def get_by_id(db: Session, accommodation_id: int):
    acc = accommodation_repository.get_by_id(db, accommodation_id)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    return acc

def create(db: Session, data: AccommodationCreateSchema):
    return accommodation_repository.create(db, data)

def update(db: Session, accommodation_id: int, data: AccommodationUpdateSchema):
    acc = accommodation_repository.update(db, accommodation_id, data)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    return acc

def delete(db: Session, accommodation_id: int):
    acc = accommodation_repository.delete(db, accommodation_id)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    return acc

def mark_as_rented(db: Session, accommodation_id: int):
    acc = accommodation_repository.mark_as_rented(db, accommodation_id)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    return acc
