from pydantic import BaseModel
from typing import Optional
from datetime import date
from models.models import CategoryEnum

class CountrySchema(BaseModel):
    id: int
    name: str
    continent: str

    class Config:
        from_attributes = True

class CountryCreateSchema(BaseModel):
    name: str
    continent: str

class HostSchema(BaseModel):
    id: int
    name: str
    surname: str
    country: CountrySchema

    class Config:
        from_attributes = True

class HostCreateSchema(BaseModel):
    name: str
    surname: str
    country_id: int

class AccommodationSchema(BaseModel):
    id: int
    name: str
    category: CategoryEnum
    host: HostSchema
    numRooms: int
    is_available: bool

    class Config:
        from_attributes = True

class AccommodationCreateSchema(BaseModel):
    name: str
    category: CategoryEnum
    host_id: int
    numRooms: int
    is_available: bool = True

class AccommodationUpdateSchema(BaseModel):
    name: Optional[str] = None
    category: Optional[CategoryEnum] = None
    host_id: Optional[int] = None
    numRooms: Optional[int] = None
    is_available: Optional[bool] = None

class UserSchema(BaseModel):
    id: int
    name: str
    surname: str

    class Config:
        from_attributes = True

class UserCreateSchema(BaseModel):
    name: str
    surname: str

class ReservationSchema(BaseModel):
    id: int
    list_id: int
    accommodation_id: int
    date_from: date
    date_to: date

    class Config:
        from_attributes = True

class ReservationCreateSchema(BaseModel):
    accommodation_id: int
    date_from: date
    date_to: date

class ReservationListSchema(BaseModel):
    id: int
    user_id: int
    reservations: list[ReservationSchema] = []

    class Config:
        from_attributes = True
