import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaSchool, FaUserGraduate, FaRing, FaBuromobelexperte } from 'react-icons/fa';
import { BiLogOutCircle } from "react-icons/bi";
import { ImUserTie } from "react-icons/im";
import { MdCalendarToday, MdClass } from 'react-icons/md'
import { AiFillSchedule, AiOutlineAreaChart } from 'react-icons/ai'
import SessionContext from '../session/SessionContext';



function Navbar({clicked,clicked_md}) {

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
    const { session: { user: { role_id } } } = useContext(SessionContext);

    return (

        <>
            <div className={`d-${clicked ? 'none' : 'block'} d-md-${clicked_md ? 'none' : 'block'} text-dark col-auto col-md-3 col-xl-2 bg-white min-vh-100`}>
                {/* <button className='btn' onClick={() => sethidemenu(true)}>hide</button> */}
                <h4 className='d-none d-md-block text-center mt-3'>دار القرآن الكريم</h4>
                {/* <h6 className='d-none d-md-block text-center mt-3'>{ center_location}</h6> */}

                <div className='mt-3'>

                    {/* case 1: small screen Dashboard */}
                    <div className='text-center d-flex justify-content-center'>
                        <NavLink to='/' className='text-decoration-none'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <FaHome className='d-xs-block d-md-none text-dark' />
                        </NavLink>
                    </div>

                    {/* case 2:md page and more Dashboard */}
                    <div className='my-2'>
                        <div>
                            <NavLink
                                to="/"
                                className='d-none d-md-flex align-items-center text-decoration-none text-dark hover py-2 px-2'
                                style={({ isActive }) =>
                                    isActive ?
                                        { backgroundColor: '#EEEEEE' }
                                        :
                                        { backgroundColor: 'white' }
                                }
                            >
                                <FaHome className='text-dark' />
                                <span className='px-2 d-none d-md-block'>الصفحة الرئيسية</span>
                            </NavLink>
                        </div>
                    </div>

                    {role_id === 1 || role_id === 2 ?
                        <>
                            {/* case 1: small screen Centers */}
                            <div className='text-center d-flex justify-content-center'>
                                <NavLink to='/centers' className='text-decoration-none p-1 p-md-0'
                                    style={({ isActive }) =>
                                        isActive ?
                                            { backgroundColor: '#EEEEEE' }
                                            :
                                            { backgroundColor: 'white' }
                                    }>
                                    <FaSchool className='d-xs-block d-md-none text-dark' />
                                </NavLink>
                            </div>

                            {/* case 2:md page and more Centers */}
                            <div className='my-2'>
                                <NavLink to='/centers' className='d-none d-md-flex align-items-center text-decoration-none text-dark hover py-2 px-2'
                                    style={({ isActive }) =>
                                        isActive ?
                                            { backgroundColor: '#EEEEEE' }
                                            :
                                            { backgroundColor: 'white' }
                                    }>
                                    <FaSchool className='text-dark' />
                                    <span className='px-2 d-none d-md-block'>المراكز</span>
                                </NavLink>
                            </div>
                        </> : ''
                    }

                    {role_id !== 4 ?

                        <>
                            {/* case 1: small screen TEACHERS */}
                            < div className='text-center d-flex justify-content-center'>
                                <NavLink to='/teachers' className='text-decoration-none p-1 p-md-0'
                                    style={({ isActive }) =>
                                        isActive ?
                                            { backgroundColor: '#EEEEEE' }
                                            :
                                            { backgroundColor: 'white' }
                                    }>
                                    <ImUserTie className='d-xs-block d-md-none text-dark' />
                                </NavLink>
                            </div>

                            {/* case 2:md page and more TEACHERS */}
                            <div className='my-2'>
                                <NavLink to='/teachers' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'
                                    style={({ isActive }) =>
                                        isActive ?
                                            { backgroundColor: '#EEEEEE' }
                                            :
                                            { backgroundColor: 'white' }
                                    }>
                                    <ImUserTie className='text-dark' />
                                    <span className='px-2 d-none d-md-block'>الاساتذة</span>
                                </NavLink>
                            </div>
                        </>
                        : ''
                    }

                    {/* case 1: small screen Students */}
                    <div className='text-center d-flex justify-content-center'>
                        <NavLink to='/students' className='text-decoration-none p-1 p-md-0'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }
                        >
                            <FaUserGraduate className='d-xs-block d-md-none text-dark' />
                        </NavLink>
                    </div>

                    {/* case 2:md page and more Students */}
                    <div className='my-2'>
                        <NavLink to='/students' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <FaUserGraduate className='text-dark' />
                            <span className='px-2 d-none d-md-block'>الاستبانات الشخصية</span>
                        </NavLink>
                    </div>

                    {/* case 1: small screen Class */}
                    <div className='text-center d-flex justify-content-center'>
                        <NavLink to='/sessions' className='text-decoration-none p-1 p-md-0'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <MdClass className='d-xs-block d-md-none text-dark' />
                        </NavLink>
                    </div>

                    {/* case 2:md page and more */}
                    <div className='my-2'>
                        <NavLink to='/sessions' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <MdClass className='text-dark' />
                            <span className='px-2 d-none d-md-block'>جداول تسميع الطالب</span>
                        </NavLink>
                    </div>

                    {/* case 1: small screen Class */}
                    <div className='text-center d-flex justify-content-center'>
                        <NavLink to='/teacherschedule' className='text-decoration-none p-1 p-md-0'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <AiFillSchedule className='d-xs-block d-md-none text-dark' />
                        </NavLink>
                    </div>

                    {/* case 2:md page and more */}
                    <div className='my-2'>
                        <NavLink to='/teacherschedule' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <AiFillSchedule className='text-dark' />
                            <span className='px-2 d-none d-md-block'>برامج المدرسين</span>
                        </NavLink>
                    </div>

                    {/* case 1: small screen Class */}
                    <div className='text-center d-flex justify-content-center'>
                        <NavLink to='/monthlyteachereport' className='text-decoration-none p-1 p-md-0'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <MdCalendarToday className='d-xs-block d-md-none text-dark' />
                        </NavLink>
                    </div>

                    {/* case 2:md page and more */}
                    <div className='my-2'>
                        <NavLink to='/monthlyteachereport' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <MdCalendarToday className='text-dark' />
                            <span className='px-2 d-none d-md-block'>
                                البيانات الشهرية
                            </span>
                        </NavLink>
                    </div>

                    {/* case 1: small screen Class */}
                    <div className='text-center d-flex justify-content-center'>
                        <NavLink to='/rings' className='text-decoration-none p-1 p-md-0'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <FaRing className='d-xs-block d-md-none text-dark' />
                        </NavLink>
                    </div>

                    {/* case 2:md page and more */}
                    <div className='my-2'>
                        <NavLink to='/rings' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'
                            style={({ isActive }) =>
                                isActive ?
                                    { backgroundColor: '#EEEEEE' }
                                    :
                                    { backgroundColor: 'white' }
                            }>
                            <FaRing className='text-dark' />
                            <span className='px-2 d-none d-md-block'>حلقات جيل القراّن</span>
                        </NavLink>
                    </div>

                    {/* case 1: small screen Class */}
                    <div className='text-center d-flex justify-content-center'>
                        <div
                        >
                            <NavLink to='/monthlyringreport' className='text-decoration-none p-1 p-md-0'
                                style={({ isActive }) =>
                                    isActive ?
                                        { backgroundColor: '#EEEEEE' }
                                        :
                                        { backgroundColor: 'white' }
                                }
                            >
                                <AiOutlineAreaChart className='d-xs-block d-md-none text-dark' />
                            </NavLink>
                        </div>
                    </div>

                    {/* case 2:md page and more */}
                    <div className='my-2' >
                        <div >
                            <NavLink to='/monthlyringreport' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'

                                style={({ isActive }) =>
                                    isActive ?
                                        { backgroundColor: '#EEEEEE' }
                                        :
                                        { backgroundColor: 'white' }
                                }
                            >
                                <AiOutlineAreaChart className='text-dark' />
                                <span className='px-2 d-none d-md-block'>
                                    البيان الشهري للحلقات
                                </span>
                            </NavLink>
                        </div>
                    </div>

                    {role_id === 4 || role_id === 5 ? ''
                        :
                        <>
                            {/* case 1: small screen Class */}
                            <div className='text-center d-flex justify-content-center'>
                                <NavLink to='/examtable' className='text-decoration-none p-1 p-md-0'
                                    style={({ isActive }) =>
                                        isActive ?
                                            { backgroundColor: '#EEEEEE' }
                                            :
                                            { backgroundColor: 'white' }
                                    }>
                                    <FaBuromobelexperte className='d-xs-block d-md-none text-dark' />
                                </NavLink>
                            </div>

                            {/* case 2:md page and more */}
                            <div className='my-2'>
                                <NavLink to='/examtable' className='d-none d-md-flex align-items-center text-decoration-none text-dark py-2 px-2 hover'
                                    style={({ isActive }) =>
                                        isActive ?
                                            { backgroundColor: '#EEEEEE' }
                                            :
                                            { backgroundColor: 'white' }
                                    }>
                                    <FaBuromobelexperte className='text-dark' />
                                    <span className='px-2 d-none d-md-block'>
                                        محاضر جلسة الاختبار
                                    </span>
                                </NavLink>
                            </div>
                        </>
                    }

                    {/*case1: md and more logout button */}
                    <div className='d-xs-block d-md-none mt-5 py-2 text-center d-flex justify-content-center' onClick={logout}>
                        <NavLink className='text-decoration-none'>
                            <BiLogOutCircle size={20} className='text-dark' />
                        </NavLink>
                    </div>

                    {/*case2: md and more logout button */}
                    <div className='d-none d-md-block my-5 py-2 px-4 bg-dark text-white' onClick={logout}>
                        <NavLink className='d-flex align-items-center text-decoration-none '>
                            <BiLogOutCircle size={18} className='text-white' />
                            <span className='px-2 text-white' style={{ fontSize: '14px' }}>تسجيل الخروج</span>
                        </NavLink>
                    </div>

                </div>
            </div >
        </>

    )
}

export default Navbar