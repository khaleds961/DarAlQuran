import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import Exam from '../components/Exam'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function ExamPage() {

    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (

        <div className="container-fluid rtl min-vh-100" style={{ background: '#EEEEEE' }}>
            <div className='mx-2 mb-2'>
                <span className='cursor_pointer' onClick={handleClick}>
                    <GiHamburgerMenu size={20} />
                </span>
            </div>
            <div className="row flex-nowrap">
                {clicked ? '' :
                    <SideBar />
                }
                <div className="col py-3" style={{ background: '#EEEEEE' }}>
                    <h3 className='mb-5 text-center'>محضر جلسة اختبار لمنح الاجازة</h3>
                    <Exam />
                </div>
            </div>
        </div>
    )
}
