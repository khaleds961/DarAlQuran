import React, { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2';
import Api from '../Api'
import Form from 'react-bootstrap/Form';
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import { TbPencil } from 'react-icons/tb'
import { NavLink, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import Spinner from 'react-bootstrap/Spinner'
import TeacherSelect from './TeacherSelect';


function StudentsTable() {

  const navigate = useNavigate()


  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const { session: { user: { id } } } = useContext(SessionContext);

  const defualt_center_id = role_id === 1 || role_id === 2 ? 0 : centers[0]?.center_id;

  const [students, setStudents] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [center_id, setCenter_id] = useState(defualt_center_id);
  const [loading, setLoading] = useState(false)
  const [teachers, setteachers] = useState([])
  const [filterteacher, setfilterteacher] = useState(0)

  const deleteStudent = (student_id, center_id) => {
    Swal.fire({
      title: 'هل انت متأكد من حذف الطالب؟',
      showCancelButton: true,
      cancelButtonText: 'الغاء',
      confirmButtonText: 'حذف',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Api.delete(`deletestudent/${student_id}/${center_id}`).then(
          res => {
            Swal.fire(res.data.message, '', 'success')
            const newList = students.filter((student) => student.id !== student_id);
            setStudents(newList);
          }
        )
      }
    })
  }

  const getStudentsByCenter = (c, p) => {
    setLoading(true)
    Api.get(`getStudentsByCenter/${c}?page=${p}`).then((res) => {
      setStudents(res.data.data.data);
      setTotal(Math.ceil(res.data.data.total / 10))
      setLoading(false)
    }).
      catch(function (err) {
        setLoading(false)
        console.log(err);
      })
  }

  const changePage = (e, value) => {
    setPage(value);
    if (filterteacher !== 0) {
      getstudentbyteacher(filterteacher, value)
    } else {
      getStudentsByCenter(center_id, value)
    }
  };

  const popup = () => {
    Swal.fire({
      title: 'هل يتبع هذا الطالب لاحد الحلقات؟',
      showCancelButton: true,
      cancelButtonText: 'لا',
      confirmButtonText: 'نعم',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate('/addstudent/1')
      } else {
        navigate('/addstudent/0')
      }
    })
  }

  const getfilterteacherid = (id) => {
    setfilterteacher(id)
    setPage(1)
    getstudentbyteacher(id, 1)
  }

  const getstudentbyteacher = (teacher_id, p) => {
    setLoading(true)
    Api.get(`getStudentsByTeacherPagination/${center_id}/${teacher_id}?page=${p}`).then(
      (res) => {
        console.log(res.data);
        setStudents(res.data.data.data);
        setTotal(Math.ceil(res.data.data.total / 10))
        setLoading(false)
      }
    )
  }

  const getTeachersByCenter = (center_id) => {
    setteachers([])
    Api.get(`getAllTeachersByCenter/${center_id}`).then((res) => {
      setteachers(res.data.data);
    })
  }

  useEffect(() => {
    getStudentsByCenter(center_id, page)
    getTeachersByCenter(center_id)
  }, [])

  const data = (center_id) => {
    setPage(1)
    setCenter_id(center_id)
    setfilterteacher(0)
    getTeachersByCenter(center_id)
    getStudentsByCenter(center_id, 1)
  }

  return (
    <div>

      <div>
        <div className='d-flex justify-content-between'>
          <button type="button" onClick={popup} className="btn btn-success mb-3 d-flex align-items-center">
            <BsPlusCircle className='text-white' />
            <span className='px-2 text-center'>
              اضافة طالب جديد
            </span>
          </button>

          <div className='d-flex'>
            <div className='mx-2'>
              <CenterSelect fromstudent={true} data={data} c_id={center_id} />
            </div>
            {center_id !== 0 ?
              <TeacherSelect teachers={teachers} teacher_id={getfilterteacherid} tid={filterteacher} fromquransession={true} />
              : ''}
          </div>

        </div>
        <>
          <table className="table table-dark table-hover text-center text-center">
            <thead>
              <tr>
                <th scope="col">الاسم</th>
                <th scope="col">الجنسية</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">الاستاذ</th>
                <th scope="col">المركز</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {loading ?
              <tbody>
                <tr>
                  <td colSpan={2}></td>
                  <td>
                    <Spinner animation="border" variant="primary" />
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tbody> :
              <tbody>
                {students?.map(student =>
                  <tr key={student.id}>
                    <th scope="row">{student.first_name} {student.last_name}</th>
                    <td>{student.nationality}</td>
                    <td>{student.phone_number}</td>
                    <td>{student.teacher_fn} {student.teacher_mn} {student.teacher_ln}</td>
                    <td>{student.center_name}</td>
                    <td >
                      <span className='mx-2 cursor_pointer' onClick={() => deleteStudent(student.id, student.center_id)}>
                        <BsTrash />
                      </span>
                      <NavLink className='text-white'  to={`/editstudent/${student.id}`}>
                      <span>
                        <TbPencil />
                      </span>
                      </NavLink>
                    </td>
                  </tr>
                )}
              </tbody>
            }
          </table>
          <Pagination
            shape="rounded"
            count={total}
            page={page}
            size="small"
            onChange={changePage}
            variant="outlined" />
        </>
        {/* : <p><b>لا يوجد اي طالب بعد</b></p>} */}
      </div>
    </div >
  )
}

export default StudentsTable