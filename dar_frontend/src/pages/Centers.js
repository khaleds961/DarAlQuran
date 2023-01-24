import React from 'react'
import CenterTable from '../components/CenterTable'
import SideBar from '../components/SideBar'

function Centers() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5'>المراكز</h3>
        <CenterTable/>
        </div>
      </div>
    </div>
  )
}

export default Centers