from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from service import reservation_service
from schemas.schemas import UserSchema, UserCreateSchema, ReservationListSchema, ReservationCreateSchema

router = APIRouter(tags=["Reservations"])

@router.post("/users", response_model=UserSchema)
def create_user(data: UserCreateSchema, db: Session = Depends(get_db)):
    return reservation_service.create_user(db, data)

@router.get("/users", response_model=list[UserSchema])
def get_all_users(db: Session = Depends(get_db)):
    return reservation_service.get_all_users(db)

@router.get("/users/{user_id}/list", response_model=ReservationListSchema)
def get_list(user_id: int, db: Session = Depends(get_db)):
    return reservation_service.get_list(db, user_id)

@router.post("/users/{user_id}/list")
def add_to_list(user_id: int, data: ReservationCreateSchema, db: Session = Depends(get_db)):
    return reservation_service.add_to_list(db, user_id, data)

@router.delete("/reservations/{reservation_id}")
def remove_reservation(reservation_id: int, db: Session = Depends(get_db)):
    return reservation_service.remove_from_list(db, reservation_id)

@router.delete("/users/{user_id}/list")
def clear_list(user_id: int, db: Session = Depends(get_db)):
    reservation_service.clear_list(db, user_id)
    return {"message": "List cleared"}

@router.post("/users/{user_id}/list/confirm")
def confirm_all(user_id: int, db: Session = Depends(get_db)):
    return reservation_service.confirm_all(db, user_id)
