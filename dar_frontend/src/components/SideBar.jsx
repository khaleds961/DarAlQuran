import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaSchool, FaUserGraduate, FaRing } from 'react-icons/fa';
import { BiLogOutCircle } from "react-icons/bi";
import { ImUserTie } from "react-icons/im";
import { MdClass } from 'react-icons/md'
import { AiFillSchedule } from 'react-icons/ai'
import SessionContext from '../session/SessionContext';




function Navbar() {

    // const [center_location, setCenterLocation] = useState(null);

    // const getCenterById = () =>{
    //     const location = centers;
    //     Api.get(`/getcenterbyid/${location[0]['center_id']}`).then(
    //         (res) => {
    //             setCenterLocation(res.data.data.location);
    //         }
    //     )
    // } 
    // useEffect(() => {
    //     getCenterById()
    // },[])

    const { actions: { logout } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);

    return (
        <div className='text-dark col-auto col-md-3 col-xl-2 bg-white min-vh-100'>
            <h4 className='d-none d-md-block text-center mt-3'>دار القرآن الكريم</h4>
            {/* <h6 className='d-none d-md-block text-center mt-3'>{ center_location}</h6> */}

            <div className='mt-3'>

                {/* case 1: small screen Dashboard */}
                <div className='text-center'>
                    <NavLink to='/' className='text-decoration-none'>
                        <FaHome className='d-xs-block d-md-none text-dark' />
                    </NavLink>
                </div>

                {/* case 2:md page and more Dashboard */}
                <div className='my-2'>
                    <NavLink to='/' className='d-none d-md-flex align-items-center text-decoration-none text-dark hover py-2 px-2'>
                        <FaHome className='text-dark' />
                        <span className='px-2 d-none d-md-block'>الصفحة الرئيسية</span>
                    </NavLink>
                </div>

                {/* case 1: small screen Centers */}
                <div className='text-center'>
                    <NavLink to='/centers' className='text-decoration-none'>
                        <FaSchool className='d-xs-block d-md-none text-dark' />
                    </NavLink>
                </div>

                {/* case 2:md page and more Centers */}
                <div className='my-2'>
                    <NavLink to='/centers' className='d-none d-md-flex align-items-center text-decoration-none text-dark hover py-2 px-2'>
                        <FaSchool className='text-dark' />
                        <span className='px-2 d-none d-md-block'>المراكز</span>
                    </NavLink>
                </div>

                {/* case 1: small screen TEACHERS */}
                <div className='text-center'>
                    <NavLink to='/teachers' className='text-decoration-none'>
                        <ImUserTie className='d-xs-block d-md-none text-dark' />
                    </NavLink>
                </div>

                {/* case 2:md page and more TEACHERS */}
                <div className='my-2'>
                    <NavLink to='/teachers' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'>
                        <ImUserTie className='text-dark' />
                        <span className='px-2 d-none d-md-block'>الاساتذة</span>
                    </NavLink>
                </div>

                {/* case 1: small screen Students */}
                <div className='text-center'>
                    <NavLink to='/students' className='text-decoration-none'>
                        <FaUserGraduate className='d-xs-block d-md-none text-dark' />
                    </NavLink>
                </div>

                {/* case 2:md page and more Students */}
                <div className='my-2'>
                    <NavLink to='/students' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'>
                        <FaUserGraduate className='text-dark' />
                        <span className='px-2 d-none d-md-block'>الطلاب</span>
                    </NavLink>
                </div>

                {/* case 1: small screen Class */}
                <div className='text-center'>
                    <NavLink to='/sessions' className='text-decoration-none'>
                        <MdClass className='d-xs-block d-md-none text-dark' />
                    </NavLink>
                </div>

                {/* case 2:md page and more */}
                <div className='my-2'>
                    <NavLink to='/sessions' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'>
                        <MdClass className='text-dark' />
                        <span className='px-2 d-none d-md-block'>الحصص والجلسات</span>
                    </NavLink>
                </div>

                {/* case 1: small screen Class */}
                <div className='text-center'>
                    <NavLink to='/teacherschedule' className='text-decoration-none'>
                        <AiFillSchedule className='d-xs-block d-md-none text-dark' />
                    </NavLink>
                </div>

                {/* case 2:md page and more */}
                <div className='my-2'>
                    <NavLink to='/teacherschedule' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'>
                        <AiFillSchedule className='text-dark' />
                        <span className='px-2 d-none d-md-block'>جدول الاستاذ</span>
                    </NavLink>
                </div>

                {/* case 1: small screen Class */}
                <div className='text-center'>
                    <NavLink to='/rings' className='text-decoration-none'>
                        <FaRing className='d-xs-block d-md-none text-dark' />
                    </NavLink>
                </div>

                {/* case 2:md page and more */}
                <div className='my-2'>
                    <NavLink to='/rings' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'>
                        <FaRing className='text-dark' />
                        <span className='px-2 d-none d-md-block'>الحلقات</span>
                    </NavLink>
                </div>

                {/*case1: md and more logout button */}
                <div className='d-xs-block d-md-none mt-5 py-2 px-2 text-center' onClick={logout}>
                    <NavLink className='text-decoration-none'>
                        <BiLogOutCircle size={20} className='text-dark' />
                    </NavLink>
                </div>

                {/*case2: md and more logout button */}
                <div className='d-none d-md-block mt-5 py-2 px-4 bg-dark text-white' onClick={logout}>
                    <NavLink className='d-flex align-items-center text-decoration-none '>
                        <BiLogOutCircle size={18} className='text-white' />
                        <span className='px-2 text-white' style={{ fontSize: '14px' }}>تسجيل الخروج</span>
                    </NavLink>
                </div>

            </div>
        </div >

    )
}

export default Navbar