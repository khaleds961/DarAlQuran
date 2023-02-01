import React from 'react'
import SideBar from '../components/SideBar'
import QuranSessionTable from '../components/QuranSessionTable'


function QuranSession() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5'>الحصص</h3>
                <QuranSessionTable/>
        </div>
      </div>
    </div>
  )
}

export default QuranSession