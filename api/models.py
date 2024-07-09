from typing import Optional
from pydantic import BaseModel, Field
import uuid
from uuid import UUID, uuid4

class Order(BaseModel):
    Id : UUID = uuid4()
    Name : str
    Phone : Optional[str] = None
    Email : Optional[str] = None
    Method : str
    Message : str

class AddOrderModel(BaseModel):
    name : str
    phone : Optional[str] = None
    email : Optional[str] = None
    method : str
    message : str