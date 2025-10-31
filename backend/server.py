from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/bulandipe')
client = MongoClient(MONGO_URL)
db = client.bulandipe

# Collections
contact_submissions = db.contact_submissions
collaboration_requests = db.collaboration_requests

# Pydantic Models
class ContactSubmission(BaseModel):
    institution_name: str
    contact_person: str
    email: EmailStr
    phone: str = ""
    message: str

class CollaborationRequest(BaseModel):
    institution_name: str
    contact_person: str
    email: EmailStr
    phone: str = ""
    message: str = ""

@app.get("/")
def read_root():
    return {"message": "BulandiPe API is running", "status": "healthy"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/contact")
def submit_contact_form(submission: ContactSubmission):
    try:
        contact_data = {
            "id": str(uuid.uuid4()),
            "institution_name": submission.institution_name,
            "contact_person": submission.contact_person,
            "email": submission.email,
            "phone": submission.phone,
            "message": submission.message,
            "submitted_at": datetime.now().isoformat(),
            "status": "new"
        }
        
        contact_submissions.insert_one(contact_data)
        
        return {
            "success": True,
            "message": "Thank you for contacting us! We'll get back to you soon.",
            "submission_id": contact_data["id"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting form: {str(e)}")

@app.post("/api/collaboration")
def submit_collaboration_request(request: CollaborationRequest):
    try:
        collaboration_data = {
            "id": str(uuid.uuid4()),
            "institution_name": request.institution_name,
            "contact_person": request.contact_person,
            "email": request.email,
            "phone": request.phone,
            "message": request.message,
            "submitted_at": datetime.now().isoformat(),
            "status": "pending"
        }
        
        collaboration_requests.insert_one(collaboration_data)
        
        return {
            "success": True,
            "message": "Thank you for your interest! Our team will reach out to discuss collaboration opportunities.",
            "request_id": collaboration_data["id"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting request: {str(e)}")

@app.get("/api/submissions/stats")
def get_submission_stats():
    try:
        total_contacts = contact_submissions.count_documents({})
        total_collaborations = collaboration_requests.count_documents({})
        
        return {
            "total_contacts": total_contacts,
            "total_collaborations": total_collaborations,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)