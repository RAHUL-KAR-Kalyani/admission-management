# Admission Management System

> A comprehensive, role-based admission management platform designed for educational institutions to streamline applicant processing, document verification, and seat allocation.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

---

## Deployed Link

**Frontend: https://admission-management-frontend.onrender.com**
**Backend: https://admission-management-b0a8.onrender.com**
#### Deployed on render but free instance so it might be delay to load


## Overview

EduMerge is a full-stack admission management system built to help educational institutions efficiently manage their admission processes. The platform supports multiple user roles with specific permissions for school administrators, admission officers, and applicants.

**Key Capabilities:**
- Multi-role access control (Admin, Admission Officer, Management)
- Document verification and management
- Fee tracking and updates
- Seat allocation and management
- Analytics and reporting dashboards
- Real-time admission status updates

---

## Features

### 📊 Admin Dashboard
- Manage institutions and campuses
- Configure departments and programs
- Monitor admissions overview

### 👥 Admission Officer Module
- View and process applicant applications
- Document verification workflows
- Manage fee updates and payments
- Allocate seats to qualified candidates
- Track admission confirmations

### 📈 Applicant Portal
- Submit applications
- Document upload and management
- View admission status in real-time
- Track assigned seats
- Fee payment updates

### 🎯 Analytics
- Program-wise enrollment charts
- Seat status visualization
- Document verification metrics
- Dashboard summaries with key indicators

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt for password hashing
- **CORS:** Cross-Origin Resource Sharing enabled
- **Environment:** dotenv for configuration

### Frontend
- **Framework:** React 19.x
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS 4.x with DaisyUI
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Notifications:** Sonner

---

## Project Structure

```
Edumerge/
├── client/                                   # React Frontend Application
│   ├── public/                               # Static public files│   
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx                     # User login page
│   │   │   ├── Signup.jsx                    # User registration page
│   │   │   ├── Profile.jsx                   # User profile management
│   │   │   └── Dashboard.jsx                 # Management dashboard
│   │   ├── components/
│   │   │   ├── admin/                        # Admin-specific components
│   │   │   │   ├── Institution.jsx
│   │   │   │   ├── Campus.jsx
│   │   │   │   ├── Department.jsx
│   │   │   │   └── Program.jsx
│   │   │   ├── admissionOfficer/            # Admission officer components
│   │   │   │   ├── Applicants.jsx
│   │   │   │   ├── DocumentVerify.jsx
│   │   │   │   ├── SeatAllocation.jsx
│   │   │   │   ├── FeeUpdate.jsx
│   │   │   │   └── ConfirmAdmission.jsx
│   │   │   └── extra/                        # Shared components
│   │   │       ├── Navbar.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── redux/
│   │   │   ├── authSlice.js                 # Auth state management
│   │   │   └── store.js                     # Redux store configuration
│   │   ├── assets/                           # Static assets
│   │   ├── App.jsx                           # Root component
│   │   ├── MainLayout.jsx                    # Layout wrapper
│   │   ├── index.css                         # Global styles
│   │   └── main.jsx                          # Entry point
│   ├── package.json
│   ├── vite.config.js                        # Vite configuration
│   ├── eslint.config.js
│   └── index.html
│
├── server/                                    # Express Backend Application
│   ├── models/                               # Mongoose schemas
│   │   ├── userModel.js                      # User schema
│   │   ├── applicantModel.js                 # Applicant schema
│   │   ├── admissionModel.js                 # Admission records
│   │   ├── institutionModel.js               # Institution config
│   │   ├── campusModel.js                    # Campus config
│   │   ├── departmentModel.js                # Department config
│   │   └── programModel.js                   # Program config
│   ├── controllers/                          # Request handlers
│   │   ├── userController.js                 # Auth & user management
│   │   ├── applicantController.js            # Applicant operations
│   │   ├── admissionController.js            # Admission logic
│   │   ├── dashboardController.js            # Analytics & reports
│   │   ├── institutionController.js
│   │   ├── campusController.js
│   │   ├── departmentController.js
│   │   └── programController.js
│   ├── routes/                               # API route definitions
│   │   ├── userRoutes.js
│   │   ├── applicantRoutes.js
│   │   ├── admissionRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── instituteRoutes.js
│   │   ├── campusRoutes.js
│   │   ├── departmentRoutes.js
│   │   └── programRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js                 # JWT verification
│   │   └── roleMiddleware.js                 # Role-based access control
│   ├── config/
│   │   └── db.js                             # MongoDB connection
│   ├── app.js                                # Express app setup
│   ├── package.json
│   └── .env                                  # Server config
│
└── README.md                                 # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **npm** (v8.x or higher) - Comes with Node.js
- **MongoDB** (v5.0+) - [Local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (Optional) - For version control



---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Edumerge
```

### 2. Backend Setup

#### Install Backend Dependencies

```bash
cd server
npm install
```

#### Create Environment File

Create a `.env` file in the `server` directory:

```bash
# If example exists, or create manually

```

(See [Environment Configuration](#environment-configuration) section for details)

### 3. Frontend Setup

#### Install Frontend Dependencies

```bash
cd client
npm install
```


#### Create Environment File

Create a `.env` file in the `client` directory:

```bash

```

(See [Environment Configuration](#environment-configuration) section for details)

---

## Environment Configuration

### Server Environment Variables (`.env`)

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
PORT=PORT_NUMBER
MONGO_URI=MONGO_URI
SALT=SALT_NUMBER
SECRET_KEY=jwt_secret_key
FRONTEND_URL=react_url

```

### Client Environment Variables (`.env`)

Create a `.env` file in the `client/` directory:

```env
# API Configuration
VITE_USER_ENDPOINT=backend_user_endpoint

VITE_APPLICANT_ENDPOINT=backend_applicant_endpoint

VITE_ADMISSION_ENDPOINT=backend_admission_endpoint

VITE_INSTITUTE_ENDPOINT=backend_uinstitute_endpoint

VITE_CAMPUS_ENDPOINT=backend_campus_endpoint

VITE_DEPARTMENT_ENDPOINT=backend_department_endpoint

VITE_PROGRAM_ENDPOINT=backend_program_endpoint
```

---

## Running the Application

### Development Mode

#### Terminal 1: Start the Backend Server

```bash
cd server
npm run dev
```

Expected output:
```
Server is running at: http://localhost:${PORT}
Connection to MongoDB established!
```

#### Terminal 2: Start the Frontend Development Server

```bash
cd client
npm run dev
```

Expected output:
```
VITE v7.3.1  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

### Build for Production

#### Build Backend

Backend doesn't require building for deployment. Simply ensure `NODE_ENV=production` in `.env`.

#### Build Frontend

```bash
cd client
npm run build
```

This generates optimized static files in the `dist/` directory.

---

## API Documentation

### Authentication Endpoints

```
POST   /api/users/register          # Register new user
POST   /api/users/login             # Login user
POST   /api/users/logout            # Logout user
GET    /api/users/profile           # Get user profile
```

### Admin Endpoints

```
GET    /api/institutions            # List all institutions
POST   /api/institutions            # Create institution
PUT    /api/institutions/:id        # Update institution
DELETE /api/institutions/:id        # Delete institution

GET    /api/campuses                # List campuses
POST   /api/campuses                # Create campus
DELETE /api/campuses/:id            # Delete campus

GET    /api/departments             # List departments
POST   /api/departments             # Create department

GET    /api/programs                # List programs
POST   /api/programs                # Create program
```

### Admission Officer Endpoints

```
GET    /api/applicants              # List applicants
GET    /api/applicants/:id          # Get applicant details
PUT    /api/applicants/:id          # Update applicant

GET    /api/admissions              # List admissions
PUT    /api/admissions/:id/confirm  # Confirm admission
PUT    /api/admissions/:id/seat     # Allocate seat
PUT    /api/admissions/:id/fee      # Update fee status

POST   /api/documents/verify        # Verify documents
GET    /api/documents               # List documents

