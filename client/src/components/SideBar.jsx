import { useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaCalendarDays } from "react-icons/fa6";
import { LuMessageSquareText } from "react-icons/lu";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <MdDashboard style={{marginTop:'5px'}} /> },  
    { path: '/', label: 'Employee', icon: <CgProfile style={{color:'white',height:'25px',width:'25px',marginTop:'5px'}}/> },
    { path: '/', label: 'calender', icon: <FaCalendarDays style={{marginTop:'5px'}} />},
    { path: '/', label: 'Message', icon: <LuMessageSquareText style={{marginTop:'5px'}} />},
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item" style={{background:item.label==='Employee'?'#3b82f6':''}}>
              <button
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.path)}
              >
                <span className="nav-icon" >{item.icon}</span>
                <span className="nav-label" style={{color:item.label==='Employee'?'white':''}}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
