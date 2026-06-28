from sqlalchemy.orm import Session
from models.models import Host
from schemas.schemas import HostCreateSchema

def get_all(db: Session):
    return db.query(Host).all()

def get_by_id(db: Session, host_id: int):
    return db.query(Host).filter(Host.id == host_id).first()

def create(db: Session, data: HostCreateSchema):
    host = Host(**data.model_dump())
    db.add(host)
    db.commit()
    db.refresh(host)
    return host

def delete(db: Session, host_id: int):
    host = get_by_id(db, host_id)
    if host:
        db.delete(host)
        db.commit()
    return host
