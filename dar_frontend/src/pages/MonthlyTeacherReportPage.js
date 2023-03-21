import React from 'react'
import MonthlyTeacherReport from '../components/MonthlyTeacherReport'
import SideBar from '../components/SideBar'


export default function MonthlyTeacherReportPage() {
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col py-3" style={{background:'#EEEEEE'}}>
        <h3 className='mb-5 text-center'>البيان الشهري للحفظ والمراجعة والتسميع</h3>
        <MonthlyTeacherReport/>
        </div>
      </div>
    </div>
  )
}
