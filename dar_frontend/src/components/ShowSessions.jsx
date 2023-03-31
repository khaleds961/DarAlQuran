import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../Api'
import Moment from 'react-moment';
import { Spinner } from 'react-bootstrap';
import { Pagination } from '@mui/material'
import SessionContext from '../session/SessionContext';
import { BsPlusCircle, BsTrash, BsPencil } from 'react-icons/bs';
import Swal from 'sweetalert2';

function ShowSessions() {

    const { session_id } = useParams()
    const { session: { token } } = useContext(SessionContext)
    const [sessions, setsesions] = useState([])
    const [student_teacher, setstudent_teacher] = useState([])
    const [students, setstudents] = useState([])
    const [student_id, setstudent_id] = useState(0)
    const [loading, setloading] = useState(true)
    const [start_date, setstart_date] = useState('')
    const [end_date, setend_date] = useState('')
    const [page, setpage] = useState(1)
    const [total, settotal] = useState(1)


    const getsessions = (p) => {
        Api.get(`getsessionsbystcente/${session_id}?page=${p}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                setsesions(res.data.data.data)
                setstudent_teacher(res.data.student_teacher)
                settotal(Math.ceil(res.data.data.total / 20))
                setloading(false)
            }
        ).catch(function (err) { console.log(err) })
    }

    const getstudents = () => {
        Api.get(`getstudentsbystcete/${session_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                setstudents(res.data.data)
            }
        ).catch(function (err) { console.log(err) })
    }

    const getsessionbyids = (teacher_id, student_id, start_date, end_date, p) => {
        setloading(true)
        Api.post(`getsessionsbyids/${teacher_id}/${student_id}?page=${p}`, {
            start_date: start_date,
            end_date: end_date
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                setsesions(res.data.data.data)
                setstudent_teacher(res.data.student_teacher)
                settotal(Math.ceil(res.data.data.total / 20))
                setloading(false)
            }
        )
    }

    const changePage = (e, value) => {
        setloading(true)
        setpage(value)
        if (student_id !== 0) {
            getsessionbyids(student_teacher['teacher_id'], student_id, value)
        } else {
            getsessions(value)
        }
    }

    const search = () => {
        if (student_id !== 0 && start_date && end_date) {
            setpage(1)
            getsessionbyids(student_teacher['teacher_id'], student_id, start_date, end_date, 1)
        }
    }

    const deleterevision = (revision_id) => {
        Swal.fire({
            title: 'هل انت متأكد من حذف الحصة؟',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'حذف',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Api.delete(`deleterevision/${revision_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(
                    res => {
                        if (res.data.success) {
                            const newList = sessions.filter((session) => session.revision_id !== revision_id);
                            setsesions(newList);
                            Swal.fire(res.data.message, '', 'success')
                        } else {
                            Swal.fire(res.data.message, '', 'warning')
                        }
                    }
                )

            }
        })

    }

    useEffect(() => {
        getsessions(1)
        getstudents()
    }, [])

    // useEffect(() => {
    //     if (student_id !== 0) {
    //         setpage(1)
    //         getsessionbyids(student_teacher['teacher_id'], student_id, 1)
    //     }
    // }, [student_id])

    return (
        <div className=' m-3'>
            {loading ? <div className='mt-5 text-center'>
                <Spinner />
            </div> :
                <>
                    <div className='mb-3 border-bottom border-secondary px-3 d-flex justify-content-between'>

                        <div className=''>
                            <div>
                                الاستاذ:
                                <b className='mx-1'>
                                    {student_teacher.teacher_fn} {student_teacher.teacher_mn} {student_teacher.teacher_ln}
                                </b>
                            </div>

                            <div className='my-2'>
                                الطالب:
                                <b className='mx-1'>
                                    {student_teacher.student_fn} {student_teacher.student_mn} {student_teacher.student_ln}
                                </b>
                            </div>
                        </div>
                    </div>

                    <div className='row '>
                        <div className='col-md my-2'>
                            <span>
                                <select name="" id="" className='form-control' value={student_id}
                                    onChange={(e) => setstudent_id(e.target.value)}>
                                    <option value={0}>اختر احد التلاميذ </option>
                                    {students.map((st) => <option value={st.id}>{st.first_name} {st.middle_name} {st.last_name}</option>)}
                                </select>
                            </span>
                        </div>

                        <div className='col-md my-2'>

                            <input type="date" className='form-control'
                                value={start_date}
                                onChange={(e) => setstart_date(e.target.value)} />
                        </div>

                        <div className='col-md my-2 '>
                            <input type="date" className='form-control'
                                value={end_date}
                                onChange={(e) => setend_date(e.target.value)} />
                        </div>

                        <div className='col-md my-2'>
                            <button className='btn btn-dark px-4' onClick={search}>بحث</button>
                        </div>

                    </div>

                    <div className='table-responsive'>
                        <table className='table text-md-center'>
                            <thead>

                                <tr>
                                    <th>اليوم</th>
                                    <th>التاريخ</th>
                                    <th>النوع</th>
                                    <th>نوع الغياب</th>
                                    <th>من سورة</th>
                                    <th>من ايه</th>
                                    <th>من صفحة</th>
                                    <th>الى سورة</th>
                                    <th>الى ايه</th>
                                    <th>الى صفحة</th>
                                    <th>القراءة</th>
                                    <th>ملاحظات</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.length > 0 ?
                                    sessions.map((session) =>
                                        <tr key={session.revision_id}>
                                            <td>{session.weekday}</td>
                                            <td>
                                                <Moment format="YYYY/MM/DD">
                                                    {session.rivison_date}
                                                </Moment>
                                            </td>
                                            <td>{session.type === 'recite' ? 'تسميع' : session.type === 'revision' ? 'مراجعة' : 'غياب'}</td>
                                            <td>{session.absence_type === 'excused' ? 'أ' :
                                                session.absence_type === 'unexcused' ? 'غ' :
                                                    session.absence_type === 'teacher_excused' ? 'ش' : ''}</td>
                                            <td>{session.surah_from}</td>
                                            <td>{session.ayyah_from}</td>
                                            <td>{session.page_from}</td>
                                            <td>{session.surah_to}</td>
                                            <td>{session.ayyah_to}</td>
                                            <td>{session.page_to}</td>
                                            <td>{session.riwayahname === '0' ? '' : session.riwayahname}</td>
                                            <td>{session.notes}</td>
                                            <td>
                                                <span className='cursor_pointer' onClick={() => deleterevision(session.revision_id)}>
                                                    <BsTrash />
                                                </span>
                                            </td>
                                        </tr>
                                    ) : 'لا يوجد اي حصة بعد'}
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
            }
        </div>
    )
}

export default ShowSessions