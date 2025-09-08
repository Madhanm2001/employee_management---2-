import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import { getAllEmployees, deleteEmployee, searchEmployee } from '../api';
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";


const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, employee: null });

  const loadEmployees = async (search = '') => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (search.trim()) {
        response = await searchEmployee(search);
        setEmployees(response.data || []);
      } else {
        response = await getAllEmployees();
        setEmployees(response.data || []);
      }
    } catch (err) {
      setError(err.error?.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees(searchTerm);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadEmployees(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEmployee = () => {
    navigate('/employees/add');
  };

  const handleViewEmployee = (id) => {
    navigate(`/employees/${id}`);
  };

  const handleEditEmployee = (id) => {
    navigate(`/employees/${id}/edit`);
  };

  const handleDeleteClick = (employee) => {
    setDeleteModal({ isOpen: true, employee });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployee(deleteModal.employee._id);
      setDeleteModal({ isOpen: false, employee: null });
      loadEmployees(searchTerm);
    } catch (err) {
      setError(err.error?.message || 'Failed to delete employee');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, employee: null });
  };

  return (
    <>

      <div className="page-header" style={{justifyContent:'space-between'}}>
        <h2>Employee</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap:'wrap' }}>
          <input
            type="text"
            placeholder="Search"
            style={{ maxWidth: '200px' }}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="btn btn-primary" style={{ maxWidth: '200px' }} onClick={handleAddEmployee}>
            + Add New Employee
          </button>
        </div>


      </div>



      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading employees...</div>
      ) : (
        <>
          <div className="table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data" style={{fontSize:'1.5rem'}}>No record found</td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee._id}>
                      <td>
                        <div className="employee-name-cell">
                          <div className="employee-avatar-small">
                            {employee.profileImage ? (
                              <img
                                src={`http://localhost:5000${employee.profileImage}`}
                                alt={employee.employeeName}
                                className="profile-image-small"
                              />
                            ) : (
                              <div className="default-avatar-small">
                                {employee.employeeName.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <span>{employee.employeeName}</span>
                        </div>
                      </td>
                      <td>{employee.employeeId}</td>
                      <td>{employee.department}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.project}</td>
                      <td>
                        <span className={`badge badge-${employee.type.toLowerCase().replace('-', '')}`}>
                          {employee.type}
                        </span>
                      </td>
                      <td>
                        <span className={`status status-${employee.status.toLowerCase()}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleViewEmployee(employee._id)}
                            style={{border:"none"}}
                          >
                            <FaRegEye style={{width:'20px',height:'20px',cursor:'pointer'}} />

                          </button>
                          <button
                            onClick={() => handleEditEmployee(employee._id)}
                            style={{border:"none"}}
                          >
                            <CiEdit style={{width:'20px',height:'20px',cursor:'pointer'}}/>

                          </button>
                          <button
                            onClick={() => handleDeleteClick(employee)}
                            style={{border:"none"}}
                          >
                            <FaRegTrashAlt style={{width:'20px',height:'20px',cursor:'pointer'}} />

                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </>
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        employeeName={deleteModal.employee?.employeeName}
      />
    </>
  );
};

export default EmployeeList;
