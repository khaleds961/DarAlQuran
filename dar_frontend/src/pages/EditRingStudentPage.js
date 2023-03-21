import React from 'react'
import EditRingStudent from '../components/EditRingStudent'
import SideBar from '../components/SideBar'


export default function EditRingStudentPage() {
  return (
    <div className="container-fluid rtl">
    <div className="row flex-nowrap">
      <SideBar />
      <div className="col py-3" style={{background:'#EEEEEE'}}>
      <h3 className='mb-5 text-center'>تعديل طالب الحلقة</h3>
      <EditRingStudent/>
      </div>
    </div>
  </div>
  )
}
