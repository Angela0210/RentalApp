from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from service import host_service
from schemas.schemas import HostSchema, HostCreateSchema

router = APIRouter(prefix="/hosts", tags=["Hosts"])

@router.get("/", response_model=list[HostSchema])
def get_all(db: Session = Depends(get_db)):
    return host_service.get_all(db)

@router.get("/{host_id}", response_model=HostSchema)
def get_by_id(host_id: int, db: Session = Depends(get_db)):
    return host_service.get_by_id(db, host_id)

@router.post("/", response_model=HostSchema)
def create(data: HostCreateSchema, db: Session = Depends(get_db)):
    return host_service.create(db, data)

@router.delete("/{host_id}", response_model=HostSchema)
def delete(host_id: int, db: Session = Depends(get_db)):
    return host_service.delete(db, host_id)
