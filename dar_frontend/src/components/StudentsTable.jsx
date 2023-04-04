import React, { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2';
import Api from '../Api'
import Form from 'react-bootstrap/Form';
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { TbPencil } from 'react-icons/tb'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import Spinner from 'react-bootstrap/Spinner'
import TeacherSelect from './TeacherSelect';
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import Table from 'react-bootstrap/Table';
import { AiOutlineSearch } from 'react-icons/ai';



function StudentsTable() {

  const navigate = useNavigate()

  const { session: { token } } = useContext(SessionContext)
  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const { session: { user: { id } } } = useContext(SessionContext);

  const defualt_center_id = role_id === 1 || role_id === 2 ? 0 : centers[0]?.center_id;

  const location = useLocation()
  const default_teacher_id = location?.state?.teacher_id ?? 0

  const [students, setStudents] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [center_id, setCenter_id] = useState(defualt_center_id);
  const [loading, setLoading] = useState(false)
  const [teachers, setteachers] = useState([])
  const [filterteacher, setfilterteacher] = useState(default_teacher_id)
  const [studentfilter, setstudentfilter] = useState('')
  const [hidepagination, setHidePagination] = useState(false)
  const [hideTeacher, setHideTeacher] = useState(true)
  const [teacherid, setteacherid] = useState(default_teacher_id)

  const deleteStudent = (student_id, center_id) => {
    Swal.fire({
      title: 'هل انت متأكد من حذف الطالب؟',
      showCancelButton: true,
      cancelButtonText: 'الغاء',
      confirmButtonText: 'حذف',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Api.delete(`deletestudent/${student_id}/${center_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(
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
    Api.get(`getStudentsByCenter/${c}?page=${p}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
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
    if (role_id === 4) {
      getstudentbyteacher(id, value)
    } else {

      if (filterteacher !== 0) {
        getstudentbyteacher(filterteacher, value)
      } else {
        console.log(center_id, 'alo2');
        getStudentsByCenter(center_id, value)
      }
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
    Api.get(`getStudentsByTeacherPagination/${center_id}/${teacher_id}?page=${p}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
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
    Api.get(`getAllTeachersByCenter/${center_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setteachers(res.data.data);
    })
  }

  const searchforstudent = () => {
    if (studentfilter) {
      setLoading(true)
      Api.post('searchforstudent', {
        student_name: studentfilter,
        center_id: center_id,
        role_id: role_id,
        teacher_id: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        setStudents(res.data.data)
        setHidePagination(true)
        setLoading(false)
      }
      ).catch(function (err) { console.log(err) })
    } else {
      Swal.fire('ادخل الاسم قبل البحث', '', 'warning')
    }
  }

  const handleNavigate = (id) => {
    const encrypted = AES.encrypt(id.toString(), 'secretKey').toString().replace(/\//g, '_');
    navigate(`/editstudent/${encrypted}`)
  }

  const handlehideTeacher = () => {
    setHideTeacher(!hideTeacher)
  }

  useEffect(() => {
    if (role_id === 4) {
      getstudentbyteacher(id, 1)
    } else {
      if (filterteacher !== 0) {
        getstudentbyteacher(teacherid, 1)
        getTeachersByCenter(center_id)
      } else {
        getStudentsByCenter(center_id, page)
        getTeachersByCenter(center_id)
      }
    }
  }, [])

  const data = (center_id) => {
    setPage(1)
    setCenter_id(center_id)
    setfilterteacher(0)
    setteacherid(null)
    getTeachersByCenter(center_id)
    getStudentsByCenter(center_id, 1)
  }

  return (
    <div>

      <div>
        <div className='d-md-flex justify-content-between'>

          <button type="button" onClick={popup} className="btn btn-success mb-3 d-flex align-items-center responsive_width ">
            <BsPlusCircle className='text-white' />
            <span className='px-2 col-md-auto mx-auto mb-md-0'>
              اضافة طالب جديد
            </span>
          </button>

          <div className='d-md-flex'>
            <div className='mx-md-2'>
              <CenterSelect fromstudent={true} data={data} c_id={center_id} />
            </div>

            {center_id !== 0 ?
              <div>
                <TeacherSelect teachers={teachers} teacher_id={getfilterteacherid} tid={filterteacher} fromquransession={true} />
              </div>
              : ''}
          </div>

        </div>

        <div>
          <div className='d-flex my-3 flex-md-row-reverse'>

            {/* medium screen and more */}
            <button className='d-none d-md-block btn btn-dark text-white mx-md-2' onClick={searchforstudent}
            >بحث عن طالب
            </button>

            <input type="text" className='rounded border border-dark responsive_width'
              value={studentfilter}
              onChange={(e) => setstudentfilter(e.target.value)} />

            {/* small screen*/}
            <span className='d-md-none bg-dark text-center text-white p-2 rounded' style={{marginRight:'1rem'}} onClick={searchforstudent}>
              <AiOutlineSearch />
            </span>
          </div>
        </div>
        <>
          <div className='table-responsive'>
            <table className="table table-dark table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">الاسم</th>
                  <th scope="col" className="d-none d-md-table-cell">الجنسية</th>
                  <th scope="col">رقم الهاتف</th>
                  <th scope="col" className={`d-${hideTeacher ? 'none' : 'table-cell'} d-md-table-cell`}>الاستاذ</th>
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
                      <th scope="row">{student.first_name} {student.middle_name} {student.last_name}</th>
                      <td className="d-none d-md-table-cell">{student.nationality}</td>
                      <td>{student.phone_number}</td>
                      <td className={`d-${hideTeacher ? 'none' : 'table-cell'} d-md-table-cell`}>{student.teacher_fn} {student.teacher_mn} {student.teacher_ln}</td>
                      <td>{student.center_name}</td>
                      <td>
                        <span className='mx-2 cursor_pointer' onClick={() => deleteStudent(student.id, student.center_id)}>
                          <BsTrash />
                        </span>
                        <span className='text-white cursor_pointer' onClick={() => handleNavigate(student.id)}>
                          <TbPencil />
                        </span>

                        <div className='text-white cursor_pointer d-sm-block d-md-none' onClick={() => handlehideTeacher()}>
                          <FiMoreHorizontal />
                        </div>
                      </td>

                    </tr>
                  )}
                </tbody>
              }
            </table>
          </div>
          {hidepagination ? '' :
            <Pagination
              shape="rounded"
              count={total}
              page={page}
              size="small"
              onChange={changePage}
              variant="outlined" />
          }
        </>
        {/* : <p><b>لا يوجد اي طالب بعد</b></p>} */}
      </div>
    </div >
  )
}

export default StudentsTable