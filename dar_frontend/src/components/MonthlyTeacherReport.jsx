import React, { useEffect, useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import Api from '../Api'
import SessionContext from '../session/SessionContext'
import CenterSelect from './CenterSelect'
import TeacherSelect from './TeacherSelect'
import { Pagination } from '@mui/material'
import Swal from 'sweetalert2'



export default function MonthlyTeacherReport() {

    const { session: { token } } = useContext(SessionContext)
    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);
    const { session: { user: { id: user_id } } } = useContext(SessionContext);

    const defaultvalue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;
    const defaultTeacherId = role_id === 4 ? user_id : 0;
    const [sessions, setsesions] = useState([])
    const [teachers, setteachers] = useState([])
    const [teacher_id, setteacher_id] = useState(defaultTeacherId)
    const [centerid, setcenterid] = useState(defaultvalue)
    const [startdate, setstartdate] = useState('')
    const [enddate, setenddate] = useState('')
    const [total, settotal] = useState(1)
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(false)

    const getsessions = (center_id, teacher_id, startdate, enddate, p) => {
        setloading(true)
        Api.post(`monthyteachereport/${center_id}/${teacher_id}?page=${p}`, {
            start: startdate,
            end: enddate,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                const sessions = res.data.data.data
                // const filtered_sessions = sessions.filter((session) =>
                //     session.sessions.length !== 0
                // )
                setsesions(sessions)
                settotal(Math.ceil(res.data.data.total / 5))
                setloading(false)
            }
        )
    }

    const changePage = (e, value) => {
        setpage(value)
        getsessions(centerid, teacher_id, startdate, enddate, value)
    }

    const getfilterteacher = (teacher_id) => {
        setteacher_id(teacher_id)
    }

    const getcenterid = (center_id) => {
        setteacher_id(0)
        setcenterid(center_id)
        getTeachersByCenter(center_id)
    }

    const getTeachersByCenter = (center_id = 0) => {
        setteachers([])
        Api.get(`getAllTeachersByCenter/${center_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                setteachers(res.data.data)
            }
        )
    }
    const search = () => {
        setpage(1)
        if (centerid !== 0 && teacher_id !== 0 && startdate && enddate) {
            getsessions(centerid, teacher_id, startdate, enddate, 1)
        } else {
            Swal.fire('!ادخل كل المعلومات قبل البحث')
        }
    }

    useEffect(() => {
        if (centerid) {
            getTeachersByCenter(centerid)
        }
    }, [])

    return (
        <div>
            <div className='my-3'>

                <div className='row'>
                    {role_id === 1 || role_id === 2 ?
                        <div className='col-md'>
                            <label htmlFor=""></label>
                            <CenterSelect center_id={getcenterid} c_id={centerid} monthlyreport={true} />
                        </div>
                        : ''}
                    {role_id !== 4 ?
                        <div className='col-md'>
                            <label htmlFor=""></label>
                            <TeacherSelect teachers={teachers} teacher_id={getfilterteacher} tid={teacher_id} fromquransession={true} />
                        </div>
                        : ''}

                    <div className='col-md my-2'>
                        <label style={{marginBottom:'3px'}}>من تاريخ</label>
                        <input type="date" className='form-control'
                            value={startdate}
                            onChange={(e) => setstartdate(e.target.value)} />
                    </div>
                    <div className='col-md my-2'>
                        <label style={{marginBottom:'3px'}}>الى تاريخ</label>
                        <input type="date" className='form-control'
                            value={enddate}
                            onChange={(e) => setenddate(e.target.value)} />
                    </div>

                    <div className='col-md my-2'>
                        <label htmlFor=""></label>
                        <button className='btn btn-dark px-4 form-control my-2 my-md-4' onClick={search}>بحث</button>
                    </div>
                </div>
            </div>
            {loading ? <div className='mt-5 text-center'><Spinner /></div> :
                sessions.length > 0 ?
                    <>
                        {sessions.map((session) =>
                            <>
                                <div key={session.st_ct_te_id} className='table-responsive'>
                                    <table className='table table-secondary text-center'>
                                        <thead>
                                            <tr>
                                                <td colSpan={10} className='bg-info text-white' style={{ textAlign: 'right' }}>
                                                    {session.full_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>التاريخ</th>
                                                <th>الجلسة</th>
                                                <th>حضور / غياب</th>
                                                <th>من السورة</th>
                                                <th>من الاية</th>
                                                <th>من صفحة</th>
                                                <th>الى السورة</th>
                                                <th>الى الاية</th>
                                                <th>الى صفحة</th>
                                                <th>ملاحظات</th>
                                            </tr>
                                        </thead>
                                        {session.sessions.map((s) =>
                                            <tbody key={s.revision_id}>
                                                <tr>
                                                    <td>{s.revision_date}</td>
                                                    <td>{s.type === 'recite' ? 'تسميع' : s.type === 'revision' ? 'مراجعة' : 'غياب'}</td>
                                                    <td>{s.absence_type === 'excused' ? 'أ' : s.absence_type === 'unexcused' ? 'غ' : s.absence_type === 'teacher_excused' ? 'ش' : 'ح'}</td>
                                                    <td>{s.surah_from}</td>
                                                    <td>{s.ayyah_from}</td>
                                                    <td>{s.page_from}</td>
                                                    <td>{s.surah_to}</td>
                                                    <td>{s.ayyah_to}</td>
                                                    <td>{s.page_to}</td>
                                                    <td>{s.notes}</td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </>
                        )}
                        <Pagination
                            shape="rounded"
                            count={total}
                            page={page}
                            size="small"
                            onChange={changePage}
                            variant="outlined"
                        />
                    </>
                    : <p className='text-center'><b>لا يوجد اي جلسة بعد</b></p>
            }
        </div>
    )
}
