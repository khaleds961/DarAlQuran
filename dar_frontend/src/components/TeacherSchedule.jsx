
import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import TeacherSelect from './TeacherSelect';
import AddSessionModal from './AddSessionModal'


function TeacherSchedule() {

  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const { session: { token } } = useContext(SessionContext)
  const {session:{user:{id:user_id}}} = useContext(SessionContext)

  const defaultValue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;

  const [id_center, setid_center] = useState(defaultValue)
  const [filterteacher_id, setfilterteacher_id] = useState(0)
  const [teacher_id,setTeacher_id] = useState()
  const [teachers, setTeachers] = useState([])
  const [schedule, setschedule] = useState([])
  const [loading, setloading] = useState(false)

  const getSchedule = (teacher_id) => {
    setloading(true)
    Api.get(`teacherschedule/${id_center}/${teacher_id}}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (res) => {
        setschedule(res.data.data)
        setloading(false)
      }
    )
  }

  const getTeachersByCenter = (center_id = 0) => {
    setTeachers([])
    Api.get(`getAllTeachersByCenter/${center_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (res) => {
        setTeachers(res.data.data)
      }
    )
  }

  const getteacherid = (teacher_id) => {
    setloading(true)
    setfilterteacher_id(teacher_id)
    getSchedule(teacher_id)
  }

  const getfiltercenterid = (center_id) => {
    setid_center(center_id)
  }
  const is_session_added = (bo) => {
    if (bo) {
      if (id_center !== 0 && filterteacher_id !== 0) {
        getSchedule(filterteacher_id)
      }
    }
  }

  useEffect(() => {
    if (id_center !== 0) {
      getTeachersByCenter(id_center)
    }
    if(role_id === 4){
      getSchedule(user_id)
    }
  }, [])

  useEffect(() => {
    if (id_center) {
      getTeachersByCenter(id_center)
      setfilterteacher_id(0)
    }
  }, [id_center])

  return (
    <div>
      <div className='d-flex justify-content-between'>

        <div>
          <AddSessionModal addsession={is_session_added} />
        </div>

        <div className='d-flex flex-row-reverse' style={{ gap: 10 }}>
          <TeacherSelect teachers={teachers} teacher_id={getteacherid} tid={filterteacher_id} fromquransession={true} />
          <CenterSelect c_id={id_center} data={getfiltercenterid} fromstudent={true} />
        </div>
      </div>

      {loading ? <div className='mt-5 text-center'><Spinner /></div> :
        <div className='table-responsive'>
        <table className='table table-bordered '>
          <thead>
            <tr>
              <th>الاثنين</th>
              <th>الثلاثاء</th>
              <th>الاربعاء</th>
              <th>الخميس</th>
              <th>الجمعة </th>
              <th>السبت</th>
              <th>الاحد</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {Object.keys(schedule).length > 0 ? schedule[1]?.sort((a, b) => a.session_time > b.session_time ? 1 : -1)
                  .map((sc) => <div style={{ gap: 5 }} className='border-bottom' key={sc.id}>
                    <b>{sc.session_time}</b>
                    <p>{sc.student_fn} {sc.student_mn} {sc.student_ln}</p>
                  </div>) : ''}
              </td>
              <td>
                {Object.keys(schedule).length > 0 ? schedule[2]?.sort((a, b) => a.session_time > b.session_time ? 1 : -1)
                  .map((sc) => <div style={{ gap: 5 }} className='border-bottom' key={sc.id}>
                    <b>{sc.session_time}</b>
                    <p>{sc.student_fn} {sc.student_mn} {sc.student_ln}</p>
                  </div>) : ''}
              </td>
              <td>
                {Object.keys(schedule).length > 0 ? schedule[3]?.sort((a, b) => a.session_time > b.session_time ? 1 : -1)
                  .map((sc) => <div style={{ gap: 5 }} className='border-bottom' key={sc.id}>
                    <b>{sc.session_time}</b>
                    <p>{sc.student_fn} {sc.student_mn} {sc.student_ln}</p>
                  </div>) : ''}
              </td>
              <td>
                {Object.keys(schedule).length > 0 ? schedule[4]?.sort((a, b) => a.session_time > b.session_time ? 1 : -1)
                  .map((sc) => <div style={{ gap: 5 }} className='border-bottom' key={sc.id}>
                    <b>{sc.session_time}</b>
                    <p>{sc.student_fn} {sc.student_mn} {sc.student_ln}</p>
                  </div>) : ''}
              </td>
              <td>
                {Object.keys(schedule).length > 0 ? schedule[5]?.sort((a, b) => a.session_time > b.session_time ? 1 : -1)
                  .map((sc) => <div style={{ gap: 5 }} className='border-bottom' key={sc.id}>
                    <b>{sc.session_time}</b>
                    <p>{sc.student_fn} {sc.student_mn} {sc.student_ln}</p>
                  </div>) : ''}
              </td>
              <td>
                {Object.keys(schedule).length > 0 ? schedule[6]?.sort((a, b) => a.session_time > b.session_time ? 1 : -1)
                  .map((sc) => <div style={{ gap: 5 }} className='border-bottom' key={sc.id}>
                    <b>{sc.session_time}</b>
                    <p>{sc.student_fn} {sc.student_mn} {sc.student_ln}</p>
                  </div>) : ''}
              </td>
              <td>
                {Object.keys(schedule).length > 0 ? schedule[7]?.sort((a, b) => a.session_time > b.session_time ? 1 : -1)
                  .map((sc) => <div style={{ gap: 5 }} className='border-bottom' key={sc.id}>
                    <b>{sc.session_time}</b>
                    <p>{sc.student_fn} {sc.student_mn} {sc.student_ln}</p>
                  </div>) : ''}
              </td>

            </tr>
          </tbody>
        </table>
        </div>
      }
    </div>
  )
}

export default TeacherSchedule