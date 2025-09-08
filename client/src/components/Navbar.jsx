import React from 'react';
import { MdOutlineSettings } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from '../image/IMG_7885.JPG'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>RS - TECH</h1>
      </div>
      <div className="navbar-user">
        <div className="user-info">
          <MdOutlineSettings style={{height:'40px',width:'40px',padding:'5px', background:'#ecececff',color:'black',borderRadius:'20px'}} />
          <IoMdNotificationsOutline style={{height:'40px',width:'40px',padding:'5px', background:'#ecececff',color:'black',borderRadius:'20px'}} />
          <div className="user-avatar">
            <img src={profile} style={{height:'40px',width:'40px',borderRadius:'50px'}} alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
