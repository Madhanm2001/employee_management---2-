import express from 'express';
import {
  getAllEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee
} from '../controller/employeeController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/search', searchEmployee);
router.get('/:id', getEmployee);
router.post('/', upload.single('profileImage'), addEmployee);
router.put('/:id', upload.single('profileImage'), updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
