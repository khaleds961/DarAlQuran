import React from 'react'
import RingStudents from '../components/RingStudents'
import SideBar from '../components/SideBar'

export default function RingStudentsPage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>طلاب الحلقات</h3>
        <RingStudents/>
        </div>
      </div>
    </div>
  )
}
