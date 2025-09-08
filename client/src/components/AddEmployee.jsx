import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee, addEmployee, updateEmployee } from '../api';
import { FaAngleLeft } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";


const AddEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    designation: '',
    project: '',
    type: 'Full-Time',
    status: 'Active',
    profileImage: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      loadEmployee();
    }
  }, [id, isEditMode]);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      const response = await getEmployee(id);
      setFormData(response?.data);
    } catch (err) {
      setError(err.error?.message || 'Failed to load employee');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
  const errors = {};
  if (!formData.employeeName.trim()) {
    errors.employeeName = 'Employee name is required';
  } else if (!/^[A-Za-z\s]{2,}$/.test(formData.employeeName)) {
    errors.employeeName = 'Only letters & spaces, min 2 characters';
  }
  if (!formData.employeeId.trim()) {
    errors.employeeId = 'Employee ID is required';
  } else if (!/^[A-Za-z0-9]{3,}$/.test(formData.employeeId)) {
    errors.employeeId = 'ID must be at least 3 characters (letters/numbers only)';
  }

  if (!formData.department.trim()) {
    errors.department = 'Department is required';
  } else if (!/^[A-Za-z\s]+$/.test(formData.department)) {
    errors.department = 'Department can only contain letters & spaces';
  }

  if (!formData.designation.trim()) {
    errors.designation = 'Designation is required';
  } else if (!/^[A-Za-z\s]+$/.test(formData.designation)) {
    errors.designation = 'Designation can only contain letters & spaces';
  }

  if (!formData.project.trim()) {
    errors.project = 'Project is required';
  } else if (!/^[A-Za-z0-9\s-_]+$/.test(formData.project)) {
    errors.project = 'Project can only contain letters, numbers, spaces, - and _';
  }

  if (!formData.type) {
    errors.type = 'Type is required';
  } else if (!['Full-Time', 'Part-Time', 'Contract'].includes(formData.type)) {
    errors.type = 'Invalid type selected';
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  } else if (!['Active', 'Inactive'].includes(formData.status)) {
    errors.status = 'Invalid status selected';
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profileImage') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditMode) {
        await updateEmployee(id, formData);
      } else {
        await addEmployee(formData);
      }

      navigate('/');
    } catch (err) {
      setError(err.error?.message || `Failed to ${isEditMode ? 'update' : 'create'} employee`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading && isEditMode) {
    return (
      <div className="loading">Loading employee data...</div>
    );
  }

  return (
    <>
      <div className="page-header">
        <FaAngleLeft onClick={handleCancel} style={{height:'30px',width:'30px'}} />
        <h2>{isEditMode ? 'Edit Employee Details' : 'Add New Employee'}</h2>
      </div>
      <h3 style={{color:'#3b82f6',borderBottom:'2px #3b82f6 solid',maxWidth:'250px',marginLeft:'10px',display:'flex',gap:'10px'}}>
        <CgProfile style={{color:'#3b82f6',height:'20px',width:'20px',marginTop:'5px'}}/><span>Personal Information</span>
      </h3>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <div className="profile-image-upload">
              <div className="image-container">
                {formData.profileImage ? (
                  typeof formData.profileImage === 'string' ? (
                    <img
                      src={`http://localhost:5000${formData.profileImage}`}
                      alt="Current"
                      className="profile-image"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Preview"
                      className="profile-image"
                    />
                  )
                ) : (
                  <div className="empty-image">
                    <span className="camera-icon">📷</span>
                  </div>
                )}

                <label htmlFor="profileImage" className="edit-icon">
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="file-input-hidden"
                  />
                  <span role="button">✎</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name *</label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              className={validationErrors.employeeName ? 'error' : ''}
            />
            {validationErrors.employeeName && (
              <span className="error-text">{validationErrors.employeeName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="employeeId">Employee ID *</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className={validationErrors.employeeId ? 'error' : ''}
            />
            {validationErrors.employeeId && (
              <span className="error-text">{validationErrors.employeeId}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={validationErrors.department ? 'error' : ''}
            />
            {validationErrors.department && (
              <span className="error-text">{validationErrors.department}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation *</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className={validationErrors.designation ? 'error' : ''}
            />
            {validationErrors.designation && (
              <span className="error-text">{validationErrors.designation}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="project">Project *</label>
            <input
              type="text"
              id="project"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              className={validationErrors.project ? 'error' : ''}
            />
            {validationErrors.project && (
              <span className="error-text">{validationErrors.project}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={validationErrors.type ? 'error' : ''}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
            {validationErrors.type && (
              <span className="error-text">{validationErrors.type}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={validationErrors.status ? 'error' : ''}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {validationErrors.status && (
              <span className="error-text">{validationErrors.status}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            style={{background:'white',color:'black'}}
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Confirm')}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEmployee;
