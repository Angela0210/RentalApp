from sqlalchemy.orm import Session
from models.models import Accommodation
from schemas.schemas import AccommodationCreateSchema, AccommodationUpdateSchema

def get_all(db: Session):
    return db.query(Accommodation).all()

def get_by_id(db: Session, accommodation_id: int):
    return db.query(Accommodation).filter(Accommodation.id == accommodation_id).first()

def create(db: Session, data: AccommodationCreateSchema):
    accommodation = Accommodation(**data.model_dump())
    db.add(accommodation)
    db.commit()
    db.refresh(accommodation)
    return accommodation

def update(db: Session, accommodation_id: int, data: AccommodationUpdateSchema):
    accommodation = get_by_id(db, accommodation_id)
    if accommodation:
        for key, value in data.model_dump(exclude_none=True).items():
            setattr(accommodation, key, value)
        db.commit()
        db.refresh(accommodation)
    return accommodation

def delete(db: Session, accommodation_id: int):
    accommodation = get_by_id(db, accommodation_id)
    if accommodation:
        db.delete(accommodation)
        db.commit()
    return accommodation

def mark_as_rented(db: Session, accommodation_id: int):
    accommodation = get_by_id(db, accommodation_id)
    if accommodation:
        accommodation.is_available = False
        db.commit()
        db.refresh(accommodation)
    return accommodation
