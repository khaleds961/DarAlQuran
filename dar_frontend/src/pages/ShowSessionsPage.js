import React from 'react'
import SideBar from '../components/SideBar'
import ShowSessions from '../components/ShowSessions'
function ShowSessionsPage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>جدول الجلسات</h3>
        <ShowSessions/>
        </div>
      </div>
    </div>
  )
}

export default ShowSessionsPage