import React from 'react'
import AddReciteRevision from '../components/AddReciteRevision'
import SideBar from '../components/SideBar'

function AddReciteRevisionPage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        {/* <h3 className='mb-5 text-center'>مراجعة وتسميع</h3> */}
        <AddReciteRevision/>
        </div>
      </div>
    </div>
  )
}

export default AddReciteRevisionPage