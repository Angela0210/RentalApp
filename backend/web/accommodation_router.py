from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from service import accommodation_service
from schemas.schemas import AccommodationSchema, AccommodationCreateSchema, AccommodationUpdateSchema

router = APIRouter(prefix="/accommodations", tags=["Accommodations"])

@router.get("/", response_model=list[AccommodationSchema])
def get_all(db: Session = Depends(get_db)):
    return accommodation_service.get_all(db)

@router.get("/{accommodation_id}", response_model=AccommodationSchema)
def get_by_id(accommodation_id: int, db: Session = Depends(get_db)):
    return accommodation_service.get_by_id(db, accommodation_id)

@router.post("/", response_model=AccommodationSchema)
def create(data: AccommodationCreateSchema, db: Session = Depends(get_db)):
    return accommodation_service.create(db, data)

@router.put("/{accommodation_id}", response_model=AccommodationSchema)
def update(accommodation_id: int, data: AccommodationUpdateSchema, db: Session = Depends(get_db)):
    return accommodation_service.update(db, accommodation_id, data)

@router.delete("/{accommodation_id}", response_model=AccommodationSchema)
def delete(accommodation_id: int, db: Session = Depends(get_db)):
    return accommodation_service.delete(db, accommodation_id)

@router.patch("/{accommodation_id}/rent", response_model=AccommodationSchema)
def mark_as_rented(accommodation_id: int, db: Session = Depends(get_db)):
    return accommodation_service.mark_as_rented(db, accommodation_id)
