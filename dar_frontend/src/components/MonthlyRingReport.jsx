import React, { useEffect, useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import Api from '../Api'
import SessionContext from '../session/SessionContext'
import CenterSelect from './CenterSelect'
import TeacherSelect from './TeacherSelect'
import { Pagination } from '@mui/material'
import Swal from 'sweetalert2'

export default function MonthlyRingReport() {

  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const defaultvalue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;

  const [sessions, setsesions] = useState([])
  const [rings, setrings] = useState([])
  const [ring_id, setring_id] = useState(0)
  const [teachers, setteachers] = useState([])
  const [teacher_id, setteacher_id] = useState(0)
  const [centerid, setcenterid] = useState(defaultvalue)
  const [startdate, setstartdate] = useState('')
  const [enddate, setenddate] = useState('')
  const [total, settotal] = useState(1)
  const [page, setpage] = useState(1)
  const [reportComment, setReportComment] = useState('')
  const [loading, setloading] = useState(false)


  const getsessions = (ring_id, startdate, enddate, p) => {
    setloading(true)
    Api.post(`monthlyRingReport?page=${p}`, {
      ring_id: ring_id,
      start: startdate,
      end: enddate,
    }).then(
      (res) => {
        console.log({ res });
        console.log(res.data.report_comment);
        setReportComment(res.data.report_comment)
        const sessions = res.data.data.data
        setsesions(sessions)
        settotal(Math.ceil(res.data.data.total / 5))
        setloading(false)
      }
    )
  }

  const changePage = (e, value) => {
    setpage(value)
    getsessions(ring_id, startdate, enddate, value)
  }

  const getfilterteacher = (teacher_id) => {
    setteacher_id(teacher_id)
  }

  const getcenterid = (center_id) => {
    setteacher_id(0)
    setring_id(0)
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
    if (ring_id !== 0 && startdate && enddate) {
      getsessions(ring_id, startdate, enddate, 1)
    } else {
      Swal.fire('!ادخل كل المعلومات قبل البحث')
    }
  }

  const getringsbyteacher = (teacher_id) => {
    Api.get(`getallringsbyteacher/${teacher_id}`).then((res) => {
      setrings(res.data.data)
    }).catch(function (err) { console.log(err) })
  }

  useEffect(() => {
    if (centerid) {
      getTeachersByCenter(centerid)
    }
  }, [])

  useEffect(() => {
    if (teacher_id !== 0) {
      setring_id(0)
      getringsbyteacher(teacher_id)
    }
  }, [teacher_id])

  return (
    <div>
      <div className='my-3'>

        <div className='row'>
          {role_id === 1 || role_id === 2 ?
            <div className='col-lg'>
              <CenterSelect center_id={getcenterid} c_id={centerid} monthlyreport={true} />
            </div>
            : ''}

          <div className='col-lg'>
            <TeacherSelect teachers={teachers} teacher_id={getfilterteacher} tid={teacher_id} fromquransession={true} />
          </div>

          <div className='col-lg my-2'>
            <select className='form-control' value={ring_id}
              onChange={(e) => setring_id(e.target.value)}>
              <option value={0} disabled>اختر احد الحلقات</option>
              {rings && rings.length > 0 ?
                rings.map((ring) =>
                  <option key={ring.id} value={ring.id}>{ring.name}</option>) :
                <option disabled>...تحميل</option>
              }
            </select>
          </div>

          <div className='col-lg my-2'>
            {/* <label htmlFor="">من</label> */}
            <input type="date" className='form-control'
              value={startdate}
              onChange={(e) => setstartdate(e.target.value)} />
          </div>
          <div className='col-lg my-2'>
            {/* <label htmlFor="">الى</label> */}
            <input type="date" className='form-control'
              value={enddate}
              onChange={(e) => setenddate(e.target.value)} />
          </div>

          <div className='col-md my-2'>
            <button className='btn btn-dark px-4' onClick={search}>بحث</button>
          </div>
        </div>
      </div>

      {loading ? <div className='mt-5 text-center'><Spinner /></div> :
        sessions.length > 0 ?
          <>
            <div className='my-4 px-2 py-3 border rounded' style={{ backgroundColor: 'DodgerBlue' }}>
              <div className='text-center text-white h5'>تعليق الادارة : </div>
              <span className='text-white' key={reportComment.id}>{reportComment?.comment}</span>
            </div>
            {sessions.map((session) =>
              <>
                <div key={session.student_id}>
                  <table className='table table-secondary text-center'>
                    <thead>
                      <tr>
                        <td colSpan={8} className='bg-info text-white'>
                          {session.full_name}
                        </td>
                      </tr>
                      <tr>
                        <th>التاريخ</th>
                        <th>حضور/غياب</th>
                        <th>تسميع/حفظ</th>
                        <th>من السورة</th>
                        <th>من الاية</th>
                        <th>الى السورة</th>
                        <th>الى الاية</th>
                      </tr>
                    </thead>
                    {session.sessions.map((s) =>
                      <tbody key={s.revision_id}>
                        <tr>
                          <td>{s.revision_date}</td>
                          <td>{s.attendance === 0 ? 'غياب' : 'حضور'}</td>
                          <td>{s.type === 'recite' ? 'حفظ' : s.type === 'revision' ? 'مراجعة' : ''}</td>
                          <td>{s.from_surrah}</td>
                          <td>{s.from_ayyah}</td>
                          <td>{s.to_surrah}</td>
                          <td>{s.to_ayyah}</td>
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
