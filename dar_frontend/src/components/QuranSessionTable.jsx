import React, { useEffect, useState, useContext, useRef } from 'react'
import Swal from 'sweetalert2';
import Api from '../Api'
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import { TbPencil } from 'react-icons/tb';
import { Pagination } from '@mui/material'
import Spinner from 'react-bootstrap/Spinner'
import SessionContext from '../session/SessionContext';
import TeacherSelect from './TeacherSelect';
import { AiOutlineEye } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';


function QuranSessionTable() {

    const { session: { user: { centers } } } = useContext(SessionContext);
    const { session: { user: { role_id } } } = useContext(SessionContext);

    const days = [
        { 'id': 1, 'value': 'الاثنين' },
        { 'id': 2, 'value': 'الثلاثاء' },
        { 'id': 3, 'value': 'الاربعاء' },
        { 'id': 4, 'value': 'الخميس' },
        { 'id': 5, 'value': 'الجمعة' },
        { 'id': 6, 'value': 'السبت' },
    ]
    const times = [
        { 'id': 1, 'value': '4:30' },
        { 'id': 2, 'value': '5:00' },
        { 'id': 3, 'value': '5:30' },
        { 'id': 4, 'value': '6:00' },
        { 'id': 5, 'value': '6:30' },
        { 'id': 6, 'value': '7:00' },
        { 'id': 7, 'value': '7:30' },
        { 'id': 8, 'value': '8:00' },
        { 'id': 9, 'value': '8:30' },
        { 'id': 10, 'value': '9:00' },
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

    const defaultValue = role_id === 3 ? centers[0]['center_id'] : 0;
    const [id_center, setid_center] = useState(defaultValue)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(1)
    const [isOpen, setIsOpen] = useState(false);
    const [teachers, setTeachers] = useState([])
    const [teacher_id, setTeacher_id] = useState(0)
    const [students, setStudents] = useState([])
    const [student_id, setStudent_id] = useState('')
    const [time, setTime] = useState(0)
    const [day, setDay] = useState(0)
    const [selected, setSelected] = useState(0)
    const [sessions, setSessions] = useState([])
    const [day_time, setDay_time] = useState([])
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);


    const getTeachersByCenter = () => {
        Api.get(`getAllTeachersByCenter/${id_center}`).then(
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
        Api.post('addsession', {
            center_id: id_center,
            user_id: teacher_id,
            student_id: student_id,
            time: time,
            day: day
        }).then((res) => {
            if (res.data.success) {
                Swal.fire(res.data.message, '', 'success')
                setTeacher_id(0)
                setStudent_id('')
                setTime(0)
                setDay(0)
                setSelected(0)
                getSessions(1)
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
        setTeacher_id(0)
        setStudent_id('')
        setTime(0)
        setDay(0)
        setSelected(0)
    };

    const handleClick = (event, st_ct_te_id) => {
        setShow(!show);
        setTarget(event.target);
        getTimes(st_ct_te_id)
    };

    const getSessions = (p) => {

        Api.get(`getsessions/${id_center}?page=${p}`).then(
            (res) => {
                setSessions(res.data.data.data)
                setTotal(Math.ceil(res.data.data.total / 10))
            }
        ).catch(function (err) { console.log(err) })
    }

    const changePage = (e, value) => {
        setPage(value)
        getSessions(value)
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
                Api.delete(`deletesession/${sess_id}/${st_ce_te}`).then(
                    res => {

                        if (res.data.success) {
                            Swal.fire(res.data.message, '', 'success')
                        }

                        const newList = day_time.filter((dt) => dt.id !== sess_id);
                        setDay_time(newList);

                        if (res.data.check === 0) {
                            const list = sessions.filter(session => session.session_id !== st_ce_te)
                            setSessions(list)
                        }
                    }
                )
            }
        })
    }

    const getTimes = (st_ct_te_id) => {
        setDay_time([])
        Api.get(`getsessionsbyid/${st_ct_te_id}`).then(
            (res) => setDay_time(res.data.data))
            .catch(function (err) { console.log(err); })
    }

    useEffect(() => {
        getTeachersByCenter()
        getSessions(page)
    }, [])


    return (
        <div>
            {role_id === 3 || role_id === 4 ?
                <div className='d-flex justify-content-between'>
                    <button type="button" className="btn btn-dark mb-3 d-flex align-items-center" onClick={showModal}>
                        <BsPlusCircle className='text-white' />
                        <span className='px-2'>
                            اضافة حصة جديدة
                        </span>
                    </button>
                </div>
                : ''}

            {/* modal */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Body className='rtl'>

                    <div >
                        <label >الاستاذ</label>
                        <select className='form-control mb-3' value={teacher_id} onChange={callStudents}>
                            <option disabled value='0'>اختر احد الاساتذة</option>
                            {teachers ? teachers.map((teacher) =>
                                <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.middle_name} {teacher.last_name}</option>
                            ) : <option>تحميل...</option>}
                        </select>

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
                        <select className='form-control mb-3' value={day}
                            onChange={(e) => setDay(e.target.value)}>
                            <option disabled="disabled" value='0'>اختر احد ايام الاسبوع</option>
                            {days ?
                                days.map((day) =>
                                    <option key={day.id} value={day.value}>{day.value}</option>
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
            {sessions.length === 0 ? <p><b>لا يوجد اي حصة بعد</b></p> : ''}
            {sessions.length > 0 ?
                <>
                    <table className="table table-dark table-responsive table-hover">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">الطالب</th>
                                <th scope="col">الاستاذ</th>
                                <th scope="col">التاريخ</th>
                            </tr>

                        </thead>

                        <tbody>
                            {sessions?.map(session =>
                                <tr key={session.session_id} className='text-center'>
                                    <td>{session.student_fn} {session.student_mn} {session.student_ln}</td>
                                    <td>{session.teacher_fn} {session.teacher_mn} {session.teacher_ln}</td>

                                    <td>
                                        <div ref={ref}>
                                            <Button variant="success" onClick={(e) => handleClick(e, session.session_id)}>اضغط هنا</Button>

                                            <Overlay
                                                show={show}
                                                target={target}
                                                placement="bottom"
                                                container={ref}
                                                containerPadding={20}
                                            >
                                                <Popover id="popover-contained">
                                                    <Popover.Body>
                                                        <table className='table'>
                                                            <tbody>
                                                                {day_time.length > 0 ? day_time.map((dt) =>
                                                                    <tr key={dt.id}>
                                                                        <td><Link to={`/addrecite/${dt.id}`}>{dt.weekday}</Link></td>
                                                                        <td>{dt.session_time}</td>
                                                                        <td>
                                                                            <span className='cursor_pointer mx-2' onClick={() => deleteSession(dt.id, dt.center_student_teacher_id)}>
                                                                                <BsTrash />
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ) : <tr><td>تحميل...</td></tr>}
                                                            </tbody>
                                                        </table>
                                                    </Popover.Body>
                                                </Popover>
                                            </Overlay>
                                        </div>
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Pagination
                        shape="rounded"
                        count={total}
                        page={page}
                        size="small"
                        onChange={changePage}
                        variant="outlined"
                    />
                </>
                : <p><b>تحميل ...</b></p>
            }
        </div>
    )
}

export default QuranSessionTable