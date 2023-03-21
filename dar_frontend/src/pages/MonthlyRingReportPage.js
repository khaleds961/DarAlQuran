import React from 'react'
import MonthlyRingReport from '../components/MonthlyRingReport'
import SideBar from '../components/SideBar'


export default function MonthlyRingReportPage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar/>
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>البيان الشهري للحلقات</h3>
        <MonthlyRingReport/>
        </div>
      </div>
    </div>
  )
}
