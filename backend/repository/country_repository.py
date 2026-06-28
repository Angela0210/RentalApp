from sqlalchemy.orm import Session
from models.models import Country
from schemas.schemas import CountryCreateSchema

def get_all(db: Session):
    return db.query(Country).all()

def get_by_id(db: Session, country_id: int):
    return db.query(Country).filter(Country.id == country_id).first()

def create(db: Session, data: CountryCreateSchema):
    country = Country(**data.model_dump())
    db.add(country)
    db.commit()
    db.refresh(country)
    return country

def delete(db: Session, country_id: int):
    country = get_by_id(db, country_id)
    if country:
        db.delete(country)
        db.commit()
    return country
