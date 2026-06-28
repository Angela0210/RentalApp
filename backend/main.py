from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models.models import Base
from web import country_router, host_router, accommodation_router, reservation_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Rental App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(country_router.router)
app.include_router(host_router.router)
app.include_router(accommodation_router.router)
app.include_router(reservation_router.router)
