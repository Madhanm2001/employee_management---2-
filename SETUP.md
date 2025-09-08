# Employee Management System

## Setup Instructions

### Backend Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   MONGO_URI=mongodb://localhost:27017/employee_management
   PORT=5000
   ```
4. Start the server: `npm run dev` (or `npm start` for production)

### Frontend Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```
4. Start the development server: `npm run dev`

### Features
- Employee CRUD operations
- Search functionality
- Pagination
- Responsive design
- Delete confirmation modal
- Form validation

### API Endpoints
- GET /api/employees - Get all employees (with pagination)
- GET /api/employees/:id - Get employee by ID
- POST /api/employees - Create new employee
- PUT /api/employees/:id - Update employee
- DELETE /api/employees/:id - Delete employee
- GET /api/employees/search?name= - Search employees by name
