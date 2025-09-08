import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";


const DeleteModal = ({ isOpen, onClose, onConfirm, employeeName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          
          <div style={{display:'flex',justifyContent:'center'}}>
            <FaRegTrashAlt style={{width:'30px',height:'30px',color:'blue'}}/>
          </div>
          <p style={{display:'flex',justifyContent:'center'}}>Are you sure you want to delete?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger cursor-pointer"
            onClick={onConfirm}
          >
            yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;