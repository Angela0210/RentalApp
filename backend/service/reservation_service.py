from sqlalchemy.orm import Session
from repository import reservation_repository, accommodation_repository
from schemas.schemas import ReservationCreateSchema, UserCreateSchema
from fastapi import HTTPException

def create_user(db: Session, data: UserCreateSchema):
    return reservation_repository.create_user(db, data)

def get_all_users(db: Session):
    return reservation_repository.get_all_users(db)

def get_list(db: Session, user_id: int):
    list_ = reservation_repository.get_list_by_user_id(db, user_id)
    if not list_:
        raise HTTPException(status_code=404, detail="Reservation list not found for this user")
    return list_

def add_to_list(db: Session, user_id: int, data: ReservationCreateSchema):
    list_ = reservation_repository.get_list_by_user_id(db, user_id)
    if not list_:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if accommodation is available
    acc = accommodation_repository.get_by_id(db, data.accommodation_id)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    if not acc.is_available:
        raise HTTPException(status_code=400, detail="Accommodation is not available")

    # Check if already in the list
    existing = reservation_repository.get_reservations_by_list(db, list_.id)
    for r in existing:
        if r.accommodation_id == data.accommodation_id:
            raise HTTPException(status_code=400, detail="Accommodation already in reservation list")

    return reservation_repository.add_reservation(db, list_.id, data)

def remove_from_list(db: Session, reservation_id: int):
    r = reservation_repository.remove_reservation(db, reservation_id)
    if not r:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return r

def clear_list(db: Session, user_id: int):
    list_ = reservation_repository.get_list_by_user_id(db, user_id)
    if not list_:
        raise HTTPException(status_code=404, detail="User not found")
    reservation_repository.clear_list(db, list_.id)

def confirm_all(db: Session, user_id: int):
    list_ = reservation_repository.get_list_by_user_id(db, user_id)
    if not list_:
        raise HTTPException(status_code=404, detail="User not found")

    reservations = reservation_repository.get_reservations_by_list(db, list_.id)
    for r in reservations:
        accommodation_repository.mark_as_rented(db, r.accommodation_id)

    reservation_repository.clear_list(db, list_.id)
    return {"message": "All accommodations reserved successfully"}
