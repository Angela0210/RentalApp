from sqlalchemy.orm import Session
from models.models import ReservationList, Reservation, User
from schemas.schemas import ReservationCreateSchema, UserCreateSchema

def get_or_create_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, data: UserCreateSchema):
    user = User(**data.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    list_ = ReservationList(user_id=user.id)
    db.add(list_)
    db.commit()
    db.refresh(user)
    return user

def get_all_users(db: Session):
    return db.query(User).all()

def get_list_by_user_id(db: Session, user_id: int):
    return db.query(ReservationList).filter(ReservationList.user_id == user_id).first()

def add_reservation(db: Session, list_id: int, data: ReservationCreateSchema):
    reservation = Reservation(
        list_id=list_id,
        accommodation_id=data.accommodation_id,
        date_from=data.date_from,
        date_to=data.date_to
    )
    db.add(reservation)
    db.commit()
    db.refresh(reservation)
    return reservation

def remove_reservation(db: Session, reservation_id: int):
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if reservation:
        db.delete(reservation)
        db.commit()
    return reservation

def clear_list(db: Session, list_id: int):
    db.query(Reservation).filter(Reservation.list_id == list_id).delete()
    db.commit()

def get_reservations_by_list(db: Session, list_id: int):
    return db.query(Reservation).filter(Reservation.list_id == list_id).all()
