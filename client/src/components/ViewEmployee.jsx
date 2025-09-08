import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee } from '../api';
import { FaAngleLeft } from "react-icons/fa6";

const ViewEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEmployee(id);
      setEmployee(response.data);
    } catch (err) {
      setError(err.error?.message || 'Failed to load employee');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/employees/${id}/edit`);
  };

  if (loading) {
    return (
      <div className="loading">Loading employee details...</div>
    );
  }

  if (error) {
    return (
      <>
        <div className="error-message">
          {error}
        </div>
        <button className="btn btn-primary" onClick={handleBack}>
          Back to List
        </button>
      </>
    );
  }

  if (!employee) {
    return (
      <>
        <div className="no-data" style={{fontSize:'1.5rem'}}>no record found</div>
        <button className="btn btn-primary" onClick={handleBack}>
          Back to List
        </button>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <FaAngleLeft onClick={handleBack} style={{height:'30px',width:'30px'}} />
        <h2>View Employee Details</h2>
      </div>
<h3 style={{color:'blue',borderBottom:'2px blue solid',maxWidth:'200px',marginLeft:'10px'}}>personal information</h3>
      <div className="employee-details">
        <div className="details-card">
          <div className="details-header">
            <div className="employee-info">
              <div className="employee-avatar">
                {employee.profileImage ? (
                  <img 
                    src={`http://localhost:5000${employee.profileImage}`} 
                    alt={employee.employeeName}
                    className="profile-image"
                  />
                ) : (
                  <div className="default-avatar">
                    {employee.employeeName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="details-content">
            <div className="detail-row">
              <div className="detail-item">
                <label>Name</label>
                <span>{employee.employeeName}</span>
              </div>
              <div className="detail-item">
                <label>Employee ID</label>
                <span>{employee.employeeId}</span>
              </div>
              
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <label>Department</label>
                <span>{employee.department}</span>
              </div>
              <div className="detail-item">
                <label>Designation</label>
                <span>{employee.designation}</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <label>Project</label>
                <span>{employee.project}</span>
              </div>
              <div className="detail-item">
                <label>Type</label>
                <span className={`badge badge-${employee.type.toLowerCase().replace('-', '')}`}>
                  {employee.type}
                </span>
              </div>
              
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <label>Status</label>
                <span className={`status status-${employee.status.toLowerCase()}`}>
                  {employee.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEmployee;
