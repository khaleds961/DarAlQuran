
import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import TeacherSelect from './TeacherSelect';


function TeacherSchedule() {

  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const defaultValue = role_id === 3 ? centers[0]['center_id'] : 0;


  const [id_center, setid_center] = useState(defaultValue)
  const [filterteacher_id, setfilterteacher_id] = useState(0)
  const [teachers, setTeachers] = useState([])
  const [schedule, setschedule] = useState([])
  const [loading, setloading] = useState(false)

  const getSchedule = (teacher_id) => {
    Api.get(`teacherschedule/${id_center}/${teacher_id}}`).then(
      (res) => {
        setschedule(res.data.data)
        setloading(false)
      }
    )
  }

  const getTeachersByCenter = (center_id = 0) => {
    setTeachers([])
    Api.get(`getAllTeachersByCenter/${center_id}`).then(
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

  useEffect(() => {
    if (id_center !== 0) {
      getTeachersByCenter(id_center)
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
      <div className='d-flex flex-row-reverse' style={{gap:10}}>
      <TeacherSelect teachers={teachers} teacher_id={getteacherid} tid={filterteacher_id} fromquransession={true} />
      <CenterSelect c_id={id_center} data={getfiltercenterid} fromstudent={true} />
      </div>
      {loading ? <div className='mt-5 text-center'><Spinner /></div> :
        <table className='table table-bordered '>
          <thead>
            <tr>
              <th>??????????????</th>
              <th>????????????????</th>
              <th>????????????????</th>
              <th>????????????</th>
              <th>???????????? </th>
              <th>??????????</th>
              <th>??????????</th>
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
      }
    </div>
  )
}

export default TeacherSchedule