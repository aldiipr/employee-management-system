import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetail from './pages/EmployeeDetail';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import Departments from "./pages/Departments";
import Attendance from './pages/Attendance';
import LeaveRequests from './pages/LeaveRequests';
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddDepartment from "./pages/AddDepartment";
import EditDepartment from "./pages/EditDepartment";
import AddAttendance from "./pages/AddAttendance";
import EditAttendance from './pages/EditAttendance';
import AddLeaveRequest from "./pages/AddLeaveRequest";
import EditLeaveRequest from "./pages/EditLeaveRequest"



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route element={
          <ProtectedRoute>
            <DashboardLayout/>
          </ProtectedRoute>} >
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/employees/:id' element={<EmployeeDetail/>}/>
          <Route path='/employees/add' element={<AddEmployee/>}/>
          <Route path='/employees/edit/:id' element={<EditEmployee/>}/>
          <Route path='/departments' element={<Departments/>}/>
          <Route path='/departments/add' element={<AddDepartment/>} />
          <Route path='/departments/edit/:id' element={<EditDepartment/>} />
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/attendance/add' element={<AddAttendance/>}/>
          <Route path='/attendance/edit/:id' element={<EditAttendance/>}/>
          <Route path='/leave_requests' element={<LeaveRequests/>}/>
          <Route path='/leave_requests/add' element={<AddLeaveRequest/>}/>
          <Route path='/leave_requests/edit/:id' element={<EditLeaveRequest/>}/>
        </Route>
      </Routes>
      
    </Router>
  );
};

export default App;
