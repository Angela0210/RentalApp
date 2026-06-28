from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from service import country_service
from schemas.schemas import CountrySchema, CountryCreateSchema

router = APIRouter(prefix="/countries", tags=["Countries"])

@router.get("/", response_model=list[CountrySchema])
def get_all(db: Session = Depends(get_db)):
    return country_service.get_all(db)

@router.get("/{country_id}", response_model=CountrySchema)
def get_by_id(country_id: int, db: Session = Depends(get_db)):
    return country_service.get_by_id(db, country_id)

@router.post("/", response_model=CountrySchema)
def create(data: CountryCreateSchema, db: Session = Depends(get_db)):
    return country_service.create(db, data)

@router.delete("/{country_id}", response_model=CountrySchema)
def delete(country_id: int, db: Session = Depends(get_db)):
    return country_service.delete(db, country_id)
