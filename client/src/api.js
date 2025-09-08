import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllEmployees = async () => {
  try {
    const response = await api.get('/employees');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: { message: 'Failed to fetch employees' } };
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: { message: 'Failed to fetch employee' } };
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const formData = new FormData();
    
    Object.keys(employeeData).forEach(key => {
      if (employeeData[key] !== null && employeeData[key] !== undefined) {
        formData.append(key, employeeData[key]);
      }
    });

    const response = await api.post('/employees', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: { message: 'Failed to create employee' } };
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const formData = new FormData();
    
    Object.keys(employeeData).forEach(key => {
      if (employeeData[key] !== null && employeeData[key] !== undefined) {
        formData.append(key, employeeData[key]);
      }
    });

    const response = await api.put(`/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: { message: 'Failed to update employee' } };
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: { message: 'Failed to delete employee' } };
  }
};

export const searchEmployee = async (name) => {
  try {
    const response = await api.get(`/employees/search?name=${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: { message: 'Failed to search employees' } };
  }
};