import React, { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2';
import Api from '../Api'
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';
import { Pagination } from '@mui/material'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import Spinner from 'react-bootstrap/Spinner'
import TeacherSelect from './TeacherSelect';
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

    const id_center = role_id === 3 ? centers[0]['center_id'] : 0;
    const [isOpen, setIsOpen] = useState(false);
    const [showdiv, setShowdiv] = useState(false);

    const [teachers, setTeachers] = useState([])
    const [teacher_id, setTeacher_id] = useState()
    const [students, setStudents] = useState([])
    const [student_id, setStudent_id] = useState()
    const [time, setTime] = useState('')
    const [day, setDay] = useState('')

    const getTeachersByCenter = () => {
        Api.get(`getAllTeachersByCenter/${id_center}`).then(
            (res) => {
                setTeachers(res.data.data)
                console.log(res.data)
            }
        )
    }

    const callStudents = (e) => {
        setStudents([])
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
            console.log(res.data);
        })
    }

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setShowdiv(false)
    };

    useEffect(() => {
        getTeachersByCenter()
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <button type="button" className="btn btn-dark mb-3 d-flex align-items-center" onClick={showModal}>
                    <BsPlusCircle className='text-white' />
                    <span className='px-2'>
                        اضافة حصة جديدة
                    </span>
                </button>
            </div>

            {/* modal */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Body className='rtl'>

                    <div >
                        <select className='form-control mb-3' defaultValue={0} onChange={callStudents}>
                            <option disabled value='0'>اختر احد الاساتذة</option>
                            {teachers ? teachers.map((teacher) =>
                                <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.middle_name} {teacher.last_name}</option>
                            ) : <option>تحميل...</option>}
                        </select>

                        {students.length !== 0 ?
                            <>
                                <select className='form-control mb-3' defaultValue={0} onChange={(e) => setStudent_id(e.target.value)}>
                                    <option value='0' disabled>اختر احد الطلاب</option>
                                    {students.map((student) =>
                                        <option key={student.id} value={student.id}>{student.first_name} {student.middle_name} {student.last_name}</option>
                                    )}
                                </select>
                            </>
                            :
                            <select className='form-control mb-3' defaultValue={0}>
                                <option value='0' disabled>اختر احد الطلاب</option>
                            </select>}

                        <select className='form-control mb-3' defaultValue={0}
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

                        <select className='form-control mb-3' defaultValue={0}
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
        </div>
    )
}

export default QuranSessionTable