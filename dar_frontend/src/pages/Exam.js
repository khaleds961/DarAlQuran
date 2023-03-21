import React from 'react'
import SideBar from '../components/SideBar'
import Exam from '../components/Exam'
export default function ExamPage() {
    return (
        <div className="container-fluid rtl">
            <div className="row flex-nowrap">
                <SideBar />
                <div className="col py-3" style={{ background: '#EEEEEE' }}>
                    <h3 className='mb-5 text-center'>محضر جلسة اختبار لمنح الاجازة</h3>
                    <Exam />
                </div>
            </div>
        </div>
    )
}
