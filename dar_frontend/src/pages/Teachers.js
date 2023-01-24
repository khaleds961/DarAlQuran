import React from 'react'
import TeachersTable from '../components/TeachersTable'
import SideBar from '../components/SideBar'


function Teachers() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar/>
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5'>الاساتذة</h3>
        <TeachersTable/>
        </div>
      </div>
    </div>
  )
}

export default Teachers