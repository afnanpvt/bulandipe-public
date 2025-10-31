# BulandiPe - Premium Marketing Website

A next-generation institutional funding and support platform marketing website built with modern web technologies.

## 🎨 Design Philosophy

- **Apple/Stripe-inspired** minimalist design
- **Primary Brand Color**: #2563EB (blue)
- Clean whites, subtle grays, and strategic blue accents
- Perfect symmetry, consistent padding, generous white space
- Modern typography using Inter and Poppins
- Smooth animations and premium feel

## 🚀 Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **React Router 6.20** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

### Backend
- **FastAPI 0.115** - Modern Python web framework
- **MongoDB** - NoSQL database for form submissions
- **Pydantic** - Data validation
- **CORS enabled** - Cross-origin resource sharing

## 📄 Pages & Sections

1. **Home** - Hero section with compelling tagline, CTAs, and impact statistics
2. **Why BulandiPe** - 6 key value propositions (Transparency, Efficiency, Impact, Network, Technology, Community)
3. **How It Works** - 4-step process explanation with visual illustration
4. **For Institutions** - Partnership benefits and collaboration request form
5. **Contact Us** - Professional contact form with validation
6. **Footer** - Social links, legal pages, and contact information

## 🎯 Key Features

- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ Smooth scroll navigation
- ✅ Active section highlighting in navbar
- ✅ Two functional forms:
  - Contact form
  - Collaboration request form
- ✅ Real-time form validation
- ✅ Success/error message handling
- ✅ MongoDB data persistence
- ✅ Chatbot placeholder UI (extensible for future logic)
- ✅ All submissions stored with unique IDs and timestamps

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB running on localhost:27017

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python server.py
```

Backend runs on: `http://localhost:8001`

### Frontend Setup
```bash
cd frontend
yarn install
yarn start
```

Frontend runs on: `http://localhost:3000`

## 🔌 API Endpoints

### Health Check
```bash
GET /api/health
```

### Contact Form Submission
```bash
POST /api/contact
Content-Type: application/json

{
  "institution_name": "University Name",
  "contact_person": "John Doe",
  "email": "john@university.edu",
  "phone": "+91 98765 43210",
  "message": "Your message here"
}
```

### Collaboration Request
```bash
POST /api/collaboration
Content-Type: application/json

{
  "institution_name": "College Name",
  "contact_person": "Jane Smith",
  "email": "jane@college.edu",
  "phone": "+91 12345 67890",
  "message": "Collaboration interests"
}
```

### Submission Statistics
```bash
GET /api/submissions/stats
```

## 🗄️ Database Schema

### Contact Submissions Collection
```json
{
  "id": "uuid-string",
  "institution_name": "string",
  "contact_person": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "submitted_at": "ISO-8601 timestamp",
  "status": "new"
}
```

### Collaboration Requests Collection
```json
{
  "id": "uuid-string",
  "institution_name": "string",
  "contact_person": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "submitted_at": "ISO-8601 timestamp",
  "status": "pending"
}
```

## 🎨 Color Palette

- **Primary**: #2563EB
- **Primary Dark**: #1d4ed8
- **Primary Light**: #3b82f6
- **Background**: #ffffff
- **Gray Shades**: #f9fafb, #f3f4f6, #e5e7eb
- **Text**: #1f2937, #4b5563, #6b7280

## 🌐 Social Links

- **LinkedIn**: https://linkedin.com/company/bulandipe
- **Twitter (X)**: https://x.com/bulandipe
- **Email**: support@bulandipe.com
- Instagram & YouTube (placeholders for future)

## 🧪 Testing

All forms have been tested and validated:
- ✅ Contact form submission working
- ✅ Collaboration request working
- ✅ Data persistence in MongoDB verified
- ✅ Success messages displaying correctly
- ✅ Form validation working
- ✅ Responsive design tested on multiple viewports

## 🚀 Production Considerations

For production deployment:
1. Update MongoDB connection string in `backend/.env`
2. Update backend URL in `frontend/.env`
3. Add proper error logging
4. Implement rate limiting on API endpoints
5. Add email notification service integration
6. Implement actual Privacy Policy and Terms of Use pages
7. Add Google Analytics or similar tracking
8. Optimize images for production
9. Enable HTTPS
10. Add proper authentication for admin dashboard (future)

## 📦 Project Structure

```
bulandipe-public/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Component styles
│   │   ├── index.js           # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   └── .env                   # Environment variables
└── README.md                  # This file
```

## 🎯 Future Enhancements

- [ ] Admin dashboard for viewing submissions
- [ ] Email notification integration (SendGrid/SMTP)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Blog/News section
- [ ] Success stories/testimonials section
- [ ] Interactive chatbot with AI
- [ ] Institution onboarding workflow
- [ ] Payment integration for supporters

## 📝 License

© 2025 BulandiPe. All rights reserved.

## 🤝 Support

For support, email support@bulandipe.com or visit our contact page.