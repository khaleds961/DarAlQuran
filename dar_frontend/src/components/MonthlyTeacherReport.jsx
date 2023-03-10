import React, { useEffect, useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import Api from '../Api'
import SessionContext from '../session/SessionContext'
import CenterSelect from './CenterSelect'
import TeacherSelect from './TeacherSelect'
import { Pagination } from '@mui/material'



export default function MonthlyTeacherReport() {
    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);
    const defaultvalue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;

    const [sessions, setsesions] = useState([])
    const [teachers, setteachers] = useState([])
    const [teacher_id, setteacher_id] = useState(0)
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
        Api.get(`getAllTeachersByCenter/${center_id}`).then(
            (res) => {
                setteachers(res.data.data)
            }
        )
    }
    const search = () => {
        setpage(1)
        if (centerid !== 0 && teacher_id !== 0 && startdate && enddate) {
            getsessions(centerid, teacher_id, startdate, enddate, 1)
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
                            <CenterSelect center_id={getcenterid} c_id={centerid} monthlyreport={true} />
                        </div>
                        : ''}

                    <div className='col-md'>
                        <TeacherSelect teachers={teachers} teacher_id={getfilterteacher} tid={teacher_id} fromquransession={true} />
                    </div>

                    <div className='col-md my-2'>
                        {/* <label htmlFor="">????</label> */}
                        <input type="date" className='form-control'
                            value={startdate}
                            onChange={(e) => setstartdate(e.target.value)} />
                    </div>
                    <div className='col-md my-2'>
                        {/* <label htmlFor="">??????</label> */}
                        <input type="date" className='form-control'
                            value={enddate}
                            onChange={(e) => setenddate(e.target.value)} />
                    </div>

                    <div className='col-md my-2'>
                        <button className='btn btn-dark px-4' onClick={search}>??????</button>
                    </div>
                </div>
            </div>
            {loading ? <div className='mt-5 text-center'><Spinner /></div> :
                sessions.length > 0 ?
                    <>
                        {sessions.map((session) =>
                            <>
                                <div key={session.st_ct_te_id}>
                                    <table className='table table-secondary text-center'>
                                        <thead>
                                            <tr>
                                                <td colSpan={8} className='bg-info text-white'>
                                                    {session.full_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>??????????????</th>
                                                <th>????????????</th>
                                                <th>???????? / ????????</th>
                                                <th>???? ????????????</th>
                                                <th>?????? ????????????</th>
                                                <th>???? ??????????</th>
                                                <th>?????? ??????????</th>
                                                <th>??????????????</th>
                                            </tr>
                                        </thead>
                                        {session.sessions.map((s) =>
                                            <tbody key={s.revision_id}>
                                                <tr>
                                                    <td>{s.revision_date}</td>
                                                    <td>{s.type === 'recite' ? '??????????' : s.type === 'revision' ? '????????????' : '????????'}</td>
                                                    <td>{s.absence_type === 'excused' ? '??' : s.absence_type === 'unexcused' ? '??' : s.absence_type === 'teacher_excused' ? '??' : '??'}</td>
                                                    <td>{s.surah_from}</td>
                                                    <td>{s.surah_to}</td>
                                                    <td>{s.ayyah_from}</td>
                                                    <td>{s.ayyah_to}</td>
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
                    : <p className='text-center'><b>???? ???????? ???? ???????? ??????</b></p>
            }
        </div>
    )
}
