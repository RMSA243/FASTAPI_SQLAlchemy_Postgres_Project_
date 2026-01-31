import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


#Load variables from .env
load_dotenv()

#fetching the URL, or use a fallback for local testing
db_url = os.getenv("DATABASE_URL")

if not db_url:
    raise ValueError("DATABASE_URL not found in environment variables")

engine = create_engine(db_url)

sessionlocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)
