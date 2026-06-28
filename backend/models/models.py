from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Enum as SAEnum, Date
from sqlalchemy.orm import relationship, declarative_base
import enum

Base = declarative_base()

class CategoryEnum(str, enum.Enum):
    ROOM = "ROOM"
    HOUSE = "HOUSE"
    FLAT = "FLAT"
    APARTMENT = "APARTMENT"
    HOTEL = "HOTEL"
    MOTEL = "MOTEL"

class Country(Base):
    __tablename__ = "countries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    continent = Column(String)

    hosts = relationship("Host", back_populates="country")

class Host(Base):
    __tablename__ = "hosts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    surname = Column(String)
    country_id = Column(Integer, ForeignKey("countries.id"))

    country = relationship("Country", back_populates="hosts")
    accommodations = relationship("Accommodation", back_populates="host")

class Accommodation(Base):
    __tablename__ = "accommodations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(SAEnum(CategoryEnum))
    host_id = Column(Integer, ForeignKey("hosts.id"))
    numRooms = Column(Integer)
    is_available = Column(Boolean, default=True)

    host = relationship("Host", back_populates="accommodations")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    surname = Column(String)

    reservation_list = relationship("ReservationList", back_populates="user", uselist=False)

class ReservationList(Base):
    __tablename__ = "reservation_lists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="reservation_list")
    reservations = relationship("Reservation", back_populates="reservation_list")

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    list_id = Column(Integer, ForeignKey("reservation_lists.id"))
    accommodation_id = Column(Integer, ForeignKey("accommodations.id"))
    date_from = Column(Date)
    date_to = Column(Date)

    reservation_list = relationship("ReservationList", back_populates="reservations")
    accommodation = relationship("Accommodation")
