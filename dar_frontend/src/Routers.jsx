import React, { useContext } from 'react'
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import SessionContext from './session/SessionContext';
import Centers from './pages/Centers';
import Unauthorized from './components/Unauthorized';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Missing from './components/Missing';
import Teachers from './pages/Teachers';
import AddStudent from './pages/AddStudent';




export default function () {
  const { loading,session } = useContext(SessionContext);
  const ROLES = {
    'superadmin': 1,
    'manager': 2,
    'supervisor': 3,
    'teacher': 4,
    'student': 5
  }
  
  if (loading) return <p>loading........</p>
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="login" element={<Login />}/>
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.student, ROLES.teacher,ROLES.superadmin,ROLES.manager,ROLES.supervisor]} />}>
          <Route path="/" exact element={<Dashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.teacher,ROLES.superadmin,ROLES.manager]} />}>
          <Route path="students" element={<Students />} />
          <Route path="addstudent" element={<AddStudent />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.superadmin,ROLES.manager]} />}>
          <Route path="studentprofile" element={<StudentProfile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.superadmin, ROLES.teacher,ROLES.manager]} />}>
          <Route path="centers" element={<Centers />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.superadmin,ROLES.manager,ROLES.supervisor]} />}>
          <Route path="teachers" element={<Teachers />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}


