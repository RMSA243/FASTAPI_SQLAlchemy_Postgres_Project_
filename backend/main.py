from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from models import product
from models import ProductCreate
from database import sessionlocal, engine
import database_model
from sqlalchemy.orm import Session

app = FastAPI()

#Load variables from .env
load_dotenv()

#fetching the URL, or use a fallback for local testing
FE_url = os.getenv("FRONTEND_URL")

if not FE_url:
    raise ValueError("Frontend_URL not found in environment variables")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FE_url],
    allow_methods=["*"]
)

database_model.Base.metadata.create_all(bind=engine)

@app.get("/")
def great():
    return "Welcome to RSolvers"


products = [
    product(id=1,name="laptop",description="budget laptop",price=998, quantity=3),
    product(id=2,name="android device",description="phones smart",price=99, quantity=2),
    product(id=3,name="lamp",description="budget lamp",price=998, quantity=3),
    product(id=4,name="Huawive",description="Tablet",price=99.098, quantity=23)
]

def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    db = sessionlocal()
    count = db.query(database_model.product).count()

    if count == 0:
        for p in products:
            db.add(database_model.product(**p.model_dump()))

        db.commit()

    
init_db()


@app.get("/products")
def get_all_products(db : Session = Depends(get_db)):

    db_products = db.query(database_model.product).all()

    return db_products

@app.get("/products/{idd}")
def get_product_Byid(idd: int, db : Session = Depends(get_db)):

    db_product = db.query(database_model.product).filter(database_model.product.id == idd).first()

    if db_product.id == idd:
        return db_product
        
    return "Error: product not found"



# @app.post("/products")
# def add_product(product: product, db : Session = Depends(get_db)):
#     db.add(database_model.product(**product.model_dump()))
#     db.commit()
#     return product

@app.post("/products", response_model=product)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = database_model.product(**product.model_dump())

    db.add(db_product)
    db.commit()
    db.refresh(db_product)  #fetching auto-generated ID

    return db_product



@app.put("/products/{idd}")
def update_product(idd: int, product: product, db : Session = Depends(get_db)):
    
    db_product = db.query(database_model.product).filter(database_model.product.id == idd).first()

    if db_product:
        db_product.name = product.name
        db_product.description = product.description
        db_product.price = product.price
        db_product.quantity = product.quantity

        db.commit()
        return "Product updated Successfully."
    else:
        return "Sorry, Product not found"
    
    

@app.delete("/products/{idd}")
def delete_product(idd: int, db : Session = Depends(get_db)):
    db_product = db.query(database_model.product).filter(database_model.product.id == idd).first()

    if db_product:
        db.delete(db_product)
        db.commit()

        return "Product Deleted successfully"
    else:
        return "Sorry, product not found"