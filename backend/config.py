import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Load database credentials from environment variables
    PGHOST = os.getenv("PGHOST")
    PGPORT = os.getenv("PGPORT")
    PGUSER = os.getenv("PGUSER")
    PGDATABASE = os.getenv("PGDATABASE")
    PGPASSWORD = os.getenv("PGPASSWORD")

    # Construct the database URI
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{PGUSER}:{PGPASSWORD}@{PGHOST}:{PGPORT}/{PGDATABASE}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
