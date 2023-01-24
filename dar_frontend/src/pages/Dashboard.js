import React from 'react'
import Navbar from '../components/SideBar'

export default function Dashboard() {

  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
          اهلا وسهلا 
        </div>
      </div>
    </div>
  )
}
