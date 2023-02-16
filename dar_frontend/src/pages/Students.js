import React, { useEffect, useState } from 'react'
import Api from '../Api'
import SideBar from '../components/SideBar'
import StudentsTable from '../components/StudentsTable'


function Students() {

  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{ background: '#EEEEEE' }}>
          <h3 className='mb-5 text-center'>الطلاب</h3>
          <StudentsTable />
        </div>
      </div>
    </div>
  )
}

export default Students