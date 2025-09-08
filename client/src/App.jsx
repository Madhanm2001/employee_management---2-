import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import EmployeeList from './components/EmployeeList'
import AddEmployee from './components/AddEmployee'
import ViewEmployee from './components/ViewEmployee'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'

function App() {

  return (
    <>
    <Router>
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <SideBar />
          <div className="content-area">
            <Routes>
              <Route path='/' element={<EmployeeList/>}/>
              <Route path='/employees/add' element={<AddEmployee/>}/>
              <Route path='/employees/:id/edit' element={<AddEmployee/>}/>
              <Route path='/employees/:id' element={<ViewEmployee/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
