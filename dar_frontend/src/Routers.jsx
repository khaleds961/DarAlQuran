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
import QuranSession from './pages/QuranSession';
import EditTeacher from './components/EditTeacher';
import RingPage from './pages/RingPage'
import AddReciteRevisionPage from './pages/AddReciteRevisionPage';
import ShowSessionsPage from './pages/ShowSessionsPage';
import TeacherSchedulePage from './pages/TeacherSchedulePage';
import EditStudentPage from './pages/EditStudentPage';
import RingStudentsPage from './pages/RingStudentsPage';
import MonthlyTeacherReportPage from './pages/MonthlyTeacherReportPage';
import EditRingStudentPage from './pages/EditRingStudentPage';
import MonthlyRingReportPage from './pages/MonthlyRingReportPage';
import { Spinner } from 'react-bootstrap';
import Exam from './pages/Exam';




export default function () {
  const { loading, session } = useContext(SessionContext);
  const ROLES = {
    'superadmin': 1,
    'manager': 2,
    'supervisor': 3,
    'teacher': 4,
    'student': 5
  }
  if (loading) return <div className='text-center mt-5'><Spinner variant='success' /></div>
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.student, ROLES.teacher, ROLES.superadmin, ROLES.manager, ROLES.supervisor]} />}>
          <Route path="/" exact element={<Dashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.supervisor, ROLES.teacher, ROLES.superadmin, ROLES.manager]} />}>
          <Route path="students" element={<Students />} />
          <Route path="addstudent/:id" element={<AddStudent />} />
          <Route path="editstudent/:id" element={<EditStudentPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.superadmin, ROLES.manager]} />}>
          <Route path="studentprofile" element={<StudentProfile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.superadmin, ROLES.manager]} />}>
          <Route path="centers" element={<Centers />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.supervisor, ROLES.teacher, ROLES.superadmin]} />}>
          <Route path="sessions" element={<QuranSession />} />
          <Route path="showsessions/:session_id" element={<ShowSessionsPage />} />
          <Route path="addrecite/:id/:rev_rec" element={<AddReciteRevisionPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.supervisor, ROLES.teacher, ROLES.superadmin]} />}>
          <Route path="rings" element={<RingPage />} />
          <Route path="ringstudents" element={<RingStudentsPage />} />
          <Route path="editringstudent/:student_id" element={<EditRingStudentPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.supervisor, ROLES.teacher, ROLES.superadmin]} />}>
          <Route path="teacherschedule" element={<TeacherSchedulePage />} />
          <Route path="monthlyteachereport" element={<MonthlyTeacherReportPage />} />
          <Route path="monthlyringreport" element={<MonthlyRingReportPage />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.superadmin, ROLES.manager, ROLES.supervisor]} />}>
          <Route path="teachers" element={<Teachers />} />
          <Route path="editteacher/:teacher_id" element={<EditTeacher />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.superadmin, ROLES.manager, ROLES.supervisor]} />}>
          <Route path="exam" element={<Exam />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}


