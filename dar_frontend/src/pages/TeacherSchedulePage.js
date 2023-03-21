import React from 'react'
import SideBar from '../components/SideBar'
import TeacherSchedule from '../components/TeacherSchedule'

function TeacherSchedulePage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar/>
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>اوقات الطلاب</h3>
        <TeacherSchedule/>
        </div>
      </div>
    </div>
  )
}

export default TeacherSchedulePage