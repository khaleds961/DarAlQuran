import React from 'react'
import AddStudentForm from '../components/AddStudentForm'
import SideBar from '../components/SideBar'



function AddStudent() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>اضافة طالب جديد</h3>
        <AddStudentForm/>
        </div>
      </div>
    </div>
  )
}

export default AddStudent