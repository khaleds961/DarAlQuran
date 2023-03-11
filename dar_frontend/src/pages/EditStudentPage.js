import React from 'react'
import EditStudent from '../components/EditStudent'
import SideBar from '../components/SideBar'


function EditStudentPage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>تعديل الطالب</h3>
        <EditStudent/>
        </div>
      </div>
    </div>
  )
}

export default EditStudentPage