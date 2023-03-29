import React, { useEffect, useState, useContext, useRef } from 'react'
import Swal from 'sweetalert2';
import Api from '../Api'
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsTrash, BsEyeFill } from 'react-icons/bs';
import { Pagination } from '@mui/material'
import Spinner from 'react-bootstrap/Spinner'
import SessionContext from '../session/SessionContext';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import TeacherSelect from './TeacherSelect';
import CenterSelect from './CenterSelect';
import AddSessionModal from './AddSessionModal';


function QuranSessionTable() {

    const navigate = useNavigate()
    const { session_id } = useParams()

    const { session: { user: { centers } } } = useContext(SessionContext);
    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { id } } } = useContext(SessionContext);

    const days = [
        { 'id': 1, 'value': 'الاثنين' },
        { 'id': 2, 'value': 'الثلاثاء' },
        { 'id': 3, 'value': 'الاربعاء' },
        { 'id': 4, 'value': 'الخميس' },
        { 'id': 5, 'value': 'الجمعة' },
        { 'id': 6, 'value': 'السبت' },
        { 'id': 7, 'value': 'الاحد' },
    ]
    const times = [
        { 'id': 1, 'value': '04:30' },
        { 'id': 2, 'value': '05:00' },
        { 'id': 3, 'value': '05:30' },
        { 'id': 4, 'value': '06:00' },
        { 'id': 5, 'value': '06:30' },
        { 'id': 6, 'value': '07:00' },
        { 'id': 7, 'value': '07:30' },
        { 'id': 8, 'value': '08:00' },
        { 'id': 9, 'value': '08:30' },
        { 'id': 10, 'value': '09:00' },
        { 'id': 11, 'value': '10:00' },
        { 'id': 12, 'value': '10:30' },
        { 'id': 13, 'value': '11:00' },
        { 'id': 14, 'value': '11:30' },
        { 'id': 15, 'value': '12:00' },
        { 'id': 16, 'value': '12:30' },
        { 'id': 17, 'value': '13:00' },
        { 'id': 18, 'value': '13:30' },
        { 'id': 19, 'value': '14:00' },
        { 'id': 20, 'value': '14:30' },
        { 'id': 21, 'value': '15:00' },
        { 'id': 22, 'value': '15:30' },
        { 'id': 23, 'value': '16:00' },
        { 'id': 24, 'value': '16:30' },
        { 'id': 25, 'value': '17:00' },
        { 'id': 26, 'value': '17:30' },
        { 'id': 27, 'value': '18:00' },
        { 'id': 28, 'value': '18:30' },
        { 'id': 29, 'value': '19:00' },
        { 'id': 30, 'value': '19:30' },
        { 'id': 31, 'value': '20:00' },
        { 'id': 32, 'value': '20:30' },
        { 'id': 33, 'value': '21:00' },
        { 'id': 34, 'value': '21:30' },
        { 'id': 35, 'value': '22:00' },
    ]

    const defaultValue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;
    const defaultValueTeacher = role_id === 4 ? id : 0;
    const [id_center, setid_center] = useState(defaultValue)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(1)
    const [isOpen, setIsOpen] = useState(false);
    const [teachers, setTeachers] = useState([])
    const [teacher_id, setTeacher_id] = useState(defaultValueTeacher)
    const [filterteacher_id, setfilterteacher_id] = useState(0)
    const [students, setStudents] = useState([])
    const [student_id, setStudent_id] = useState('')
    const [time, setTime] = useState(0)
    const [day, setDay] = useState(0)
    const [day_id, setDay_id] = useState(0)
    const [selected, setSelected] = useState(0)
    const [sessions, setSessions] = useState([])
    const [day_time, setDay_time] = useState([])
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [loading, setloading] = useState(true)
    const [loadingdays, setdaysloading] = useState(true)
    const ref = useRef(null);

    const dayandid = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setDay_id(e.target.value)
        setDay(e.nativeEvent.target[index].text)
    }

    const getTeachersByCenter = (center_id = 0) => {
        setTeachers([])
        Api.get(`getAllTeachersByCenter/${center_id}`).then(
            (res) => {
                setTeachers(res.data.data)
            }
        )
    }

    const callStudents = (e) => {
        setStudents([])
        setSelected(0)
        const teacher_id = e.target.value;
        Api.get(`getStudentsByTeacher/${id_center}/${teacher_id}`).then(
            (res) => {
                setStudents(res.data.data)
                setTeacher_id(teacher_id)
            }
        ).catch(function (err) { console.log(err) })
    }

    const addSession = () => {
        console.log('id_center', id_center);
        console.log('teacher_id', teacher_id);
        console.log('student_id', student_id);
        console.log('time', time);
        console.log('day', day);
        console.log('day_id', day_id);
        Api.post('addsession', {
            center_id: id_center,
            user_id: teacher_id,
            student_id: student_id,
            time: time,
            day: day,
            day_id: day_id
        }).then((res) => {
            if (res.data.success) {
                Swal.fire(res.data.message, '', 'success')
                if (role_id === 3) {
                    setTeacher_id(0)
                }
                setStudent_id('')
                setTime(0)
                setDay(0)
                setDay_id(0)
                setSelected(0)
                getSessions(1)
                setPage(1)
                setfilterteacher_id(0)
            } else {
                Swal.fire(res.data.message, '', 'warning')
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        if (role_id === 3) {
            setTeacher_id(0)
        }
        setStudent_id('')
        setTime(0)
        setDay(0)
        setDay_id(0)
        setSelected(0)
    };

    const handleClick = (event, st_ct_te_id) => {
        setShow(!show);
        setdaysloading(true)
        setTarget(event.target);
        getTimes(st_ct_te_id)
    };

    const getSessions = (p) => {
        setloading(true)
        if (role_id === 4) {
            getsessionsbyteacher(id, 1)
        } else {
            Api.get(`getsessions/${id_center}?page=${p}`).then(
                (res) => {
                    setSessions(res.data.data.data)
                    setTotal(Math.ceil(res.data.data.total / 10))
                    setloading(false)
                }
            ).catch(function (err) { console.log(err) })
        }
    }

    const changePage = (e, value) => {
        setPage(value)
        if (filterteacher_id != 0) {
            getsessionsbyteacher(filterteacher_id, value)
        } else {
            getSessions(value)
        }
    }

    const deleteSession = (sess_id, st_ce_te) => {
        Swal.fire({
            title: 'هل انت متأكد من حذف الحصة؟',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'حذف',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Api.get(`deletesession/${sess_id}/${st_ce_te}`).then(
                    res => {

                        if (res.data.success) {
                            Swal.fire(res.data.message, '', 'success')
                        }

                        const newList = day_time.filter((dt) => dt.id !== sess_id);
                        setDay_time(newList);

                        // if (res.data.check === 0) {
                        //     const list = sessions.filter(session => session.session_id !== st_ce_te)
                        //     setSessions(list)
                        // }
                    }
                )
            }
        })
    }

    // const deletetasmie = (sess_id) => {
    //     console.log(sess_id, 'id');
    // }

    const getTimes = (st_ct_te_id) => {
        setDay_time([])
        Api.get(`getsessionsbyid/${st_ct_te_id}`).then(
            (res) => {
                setDay_time(res.data.data)
                setdaysloading(false)
            })
            .catch(function (err) { console.log(err); })
    }

    const popup = (sess_id) => {
        setShow(false)
        Swal.fire({
            title: 'هل تقوم باضافة مراجعة او تسميع؟',
            showCancelButton: true,
            showDenyButton: true,
            cancelButtonText: 'مراجعة',
            confirmButtonText: 'تسميع',
            denyButtonText: 'غياب',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                navigate(`/addrecite/${sess_id}/recite`)
            } else if (result.isDenied) {
                navigate(`/addrecite/${sess_id}/absence`)
            } else {
                navigate(`/addrecite/${sess_id}/revision`)
            }
        })
    }

    const getteacherid = (teacher_id) => {
        setfilterteacher_id(teacher_id)
    }

    const getfiltercenterid = (center_id) => {
        setid_center(center_id)
    }

    const getsessionsbyteacher = (teacher_id, p) => {
        setloading(true)
        Api.get(`getsessionsbyteacher/${id_center}/${teacher_id}?page=${p}`).then(
            (res) => {
                setSessions(res.data.data.data)
                setTotal(Math.ceil(res.data.data.total / 10))
                setloading(false)
            }
        ).catch(function (err) { console.log(err) })
    }

    const callStudentsTeacher = (id) => {
        console.log(id, 'teacher_id');
        console.log(id_center, 'center_id');
        Api.get(`getStudentsByTeacher/${id_center}/${id}`).then(
            (res) => {
                setStudents(res.data.data)
                setTeacher_id(id)
            }
        ).catch(function (err) { console.log(err) })
    }

    const is_session_added = (bo) => {
        if (bo) {
            getSessions(page)
        }
    }

    useEffect(() => {
        getTeachersByCenter(id_center)
        getSessions(page)
        if (role_id === 4) {
            callStudentsTeacher(id)
        }
    }, [])

    useEffect(() => {
        if (filterteacher_id !== 0) {
            getsessionsbyteacher(filterteacher_id, 1)
            setPage(1)
        }
    }, [filterteacher_id])

    useEffect(() => {
        if (id_center) {
            getTeachersByCenter(id_center)
            getSessions(1)
            setPage(1)
            setfilterteacher_id(0)
        }
    }, [id_center])

    return (
        <div>
            <AddSessionModal addSession={is_session_added} />

            {role_id === 3 || role_id === 4 ?
                <div>
                    {/* <button type="button" className="btn btn-dark my-2 d-flex align-items-center" onClick={showModal}>
                        <BsPlusCircle className='text-white' />
                        <span className='px-2'>
                            اضافة حصة جديدة
                        </span>
                    </button> */}
                    {
                        loading ? '' :
                            <div className='d-flex flex-row-reverse'>
                                <TeacherSelect teachers={teachers} teacher_id={getteacherid} tid={filterteacher_id} fromquransession={true} />
                            </div>
                    }
                </div>
                :
                <div>
                    <div className='d-flex flex-row-reverse'>
                        {id_center !== 0 ?
                            <select className="btn bg-white text-dark my-2 px-2 mx-3"
                                value={filterteacher_id}
                                onChange={(e) => setfilterteacher_id(e.target.value)}>
                                <option value={0} disabled> اختر احد الاساتذة</option>
                                {teachers ? teachers.map((teacher) =>
                                    <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.middle_name} {teacher.last_name}</option>) :
                                    <option disabled> ...تحميل</option>}
                            </select>
                            : ''}
                        <CenterSelect c_id={id_center} data={getfiltercenterid} fromstudent={true} />
                    </div>

                </div>
            }

            {/* modal */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Body className='rtl'>
                    <div>
                        {role_id !== 3 ? '' :
                            <>
                                <label >الاستاذ</label>
                                <select className='form-control mb-3' value={teacher_id} onChange={callStudents}>
                                    <option disabled value='0'>اختر احد الاساتذة</option>
                                    {teachers ? teachers.map((teacher) =>
                                        <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.middle_name} {teacher.last_name}</option>
                                    ) : <option>تحميل...</option>}
                                </select>
                            </>
                        }

                        {students.length !== 0 ?
                            <>
                                <label>الطالب</label>
                                <select className='form-control mb-3' value={selected} onChange={(e) => {
                                    setStudent_id(e.target.value)
                                    setSelected(e.target.value)
                                }}>
                                    <option disabled value='0'>اختر احد الطلاب</option>
                                    {students.map((student) =>
                                        <option key={student.id} value={student.id}>{student.first_name} {student.middle_name} {student.last_name}</option>
                                    )}
                                </select>
                            </>
                            :
                            <>
                                <label>الطالب</label>
                                <select className='form-control mb-3' defaultValue={0}>
                                    <option value='0' disabled>تحميل ...</option>
                                </select>
                            </>}

                        <label htmlFor="">اليوم</label>
                        <select className='form-control mb-3' value={day_id}
                            onChange={(e) => dayandid(e)}>
                            <option disabled="disabled" value='0'>اختر احد ايام الاسبوع</option>
                            {days ?
                                days.map((day) =>
                                    <option key={day.id} value={day.id}>{day.value}</option>
                                )
                                :
                                <option>تحميل...</option>
                            }
                        </select>

                        <label htmlFor="">الوقت</label>
                        <select className='form-control mb-3' value={time}
                            onChange={(e) => setTime(e.target.value)}>
                            <option disabled value='0'>اختر احد الاوقات المتاحة</option>
                            {times ?
                                times.map((time) =>
                                    <option key={time.id} value={time.value}>{time.value}</option>
                                )
                                :
                                <option>تحميل...</option>
                            }
                        </select>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <button type='button' className='btn btn-dark' onClick={hideModal}>الغاء</button>
                    <button type='button' className='btn btn-dark' onClick={addSession} >اضافة</button>
                </Modal.Footer>
            </Modal>
            {loading ? <div className='mt-5 text-center'>
                <Spinner />
            </div> :
                <>
                    {sessions.length > 0 ?
                        <>
                            <div className='table-responsive'>
                                <table className="table table-dark table-hover">
                                    <thead>
                                        <tr className='text-center'>
                                            <th scope="col">التسميع والمراجعة</th>
                                            <th scope="col">الطالب</th>
                                            <th scope="col">الاستاذ</th>
                                            <th scope="col">عرض التسميعات</th>
                                            {/* <th></th> */}
                                        </tr>

                                    </thead>

                                    <tbody>
                                        {sessions?.map(session =>
                                            <tr key={session.session_id} className='text-center'>
                                                <td>
                                                    <div ref={ref}>

                                                        <Button variant="success" onClick={(e) => handleClick(e, session.session_id)}>جلسة</Button>

                                                        <Overlay
                                                            show={show}
                                                            target={target}
                                                            placement="bottom"
                                                            container={ref}
                                                            containerPadding={20}
                                                        >
                                                            <Popover id="popover-contained">
                                                                <Popover.Body>
                                                                    <table className='table table-responsive'>
                                                                        <tbody>
                                                                            {loadingdays ? <tr><td>تحميل ...</td></tr> :
                                                                                <>
                                                                                    {day_time.length > 0 ? day_time.map((dt) =>
                                                                                        <tr key={dt.id}>
                                                                                            <td>{dt.weekday}</td>
                                                                                            <td>{dt.session_time}</td>
                                                                                            <td>
                                                                                                <span className='cursor_pointer mx-2' onClick={() => deleteSession(dt.id, dt.center_student_teacher_id)}>
                                                                                                    <BsTrash />
                                                                                                </span>

                                                                                                <Link onClick={() => popup(dt.id)}>
                                                                                                    <span className='cursor_pointer mx-2'>
                                                                                                        <BsPlusCircle />
                                                                                                    </span>
                                                                                                </Link>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ) : <tr><td>لا يوجد اي موعد</td></tr>}
                                                                                </>
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </Popover.Body>
                                                            </Popover>
                                                        </Overlay>
                                                    </div>
                                                </td>
                                                <td>{session.student_fn} {session.student_mn} {session.student_ln}</td>
                                                <td>{session.teacher_fn} {session.teacher_mn} {session.teacher_ln}</td>
                                                <td>
                                                    <NavLink to={`/showsessions/${session.session_id}`} className='text-white'>
                                                        <span className=''>
                                                            <BsEyeFill />
                                                        </span>
                                                    </NavLink>
                                                </td>
                                                {/* <td>
                                                    <span className='cursor_pointer' onClick={() => deletetasmie(session.session_id)}>
                                                        <BsTrash />
                                                    </span>
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                shape="rounded"
                                count={total}
                                page={page}
                                size="small"
                                onChange={changePage}
                                variant="outlined"
                            />
                        </>
                        : <p><b>لا يوجد اي حصة بعد</b></p>
                    }
                </>
            }
        </div>
    )
}

export default QuranSessionTable