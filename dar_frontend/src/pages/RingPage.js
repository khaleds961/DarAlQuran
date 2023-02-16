import React from 'react'
import RingsTable from '../components/RingsTable'
import SideBar from '../components/SideBar'

function RingPage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>الحلقات</h3>
        <RingsTable/>
        </div>
      </div>
    </div>
  )
}

export default RingPage