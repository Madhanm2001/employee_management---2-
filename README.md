# Employee Management System

A full-stack employee management application built with React and Node.js.

## Features

- Employee list with search functionality
- Add new employees
- Edit existing employees
- View employee details
- Delete employees with confirmation
- Responsive design matching Figma specifications

## Tech Stack

### Frontend
- React 19
- React Router v6
- Axios for API calls
- CSS3 with modern design system

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_management
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/search?name=John` - Search employees by name

## Employee Fields

- employeeName (required)
- employeeId (required, unique)
- department (required)
- designation (required)
- project (required)
- type (required): Full-Time, Part-Time, Contract
- status (required): Active, Inactive

## Routes

- `/` - Employee List
- `/employees/add` - Add Employee
- `/employees/:id/edit` - Edit Employee
- `/employees/:id` - View Employee Details
