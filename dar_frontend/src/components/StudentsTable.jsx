import React, { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2';
import Api from '../Api'
import Form from 'react-bootstrap/Form';
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import { TbPencil } from 'react-icons/tb'
import { NavLink, Link } from 'react-router-dom';
import { Pagination } from '@mui/material'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import Spinner from 'react-bootstrap/Spinner'


function StudentsTable() {

  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const { session: { user: { id } } } = useContext(SessionContext);

  const defualt_center_id = role_id === 1 || role_id === 2 ? 0 : centers[0]?.center_id;

  const [students, setStudents] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [center_id, setCenter_id] = useState(defualt_center_id);
  const [loading, setLoading] = useState(false)

  const deleteStudent = (id) => {
    Swal.fire({
      title: 'هل انت متأكد من حذف الطالب؟',
      showCancelButton: true,
      cancelButtonText: 'الغاء',
      confirmButtonText: 'حذف',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Api.delete(`deletestudent/${id}/${center_id}`).then(
          res => Swal.fire(res.data.message, '', 'success')
        )
        const newList = students.filter((student) => student.id !== id);
        setStudents(newList);
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
    getStudentsByCenter(center_id, value)
  };

  useEffect(() => {
    console.log(centers);
    getStudentsByCenter(center_id, page)
  }, [])

  const data = (center_id) => {
    setPage(1)
    setCenter_id(center_id)
    getStudentsByCenter(center_id, 1)
  }

  return (
    <div>
      {students ?
        <>
          <div>
            <div className='d-flex justify-content-between'>
              <Link className='text-decoration-none text-white' to='/addstudent'>
                <button type="button" className="btn btn-success mb-3 d-flex align-items-center">
                  <BsPlusCircle className='text-white' />
                  <span className='px-2 text-center'>
                    اضافة طالب جديد
                  </span>
                </button>
              </Link>

              <CenterSelect fromstudent={true} data={data} c_id={center_id} />
            </div>
            <table className="table table-dark table-responsive table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">الاسم</th>
                  <th scope="col">الجنسية</th>
                  <th scope="col">رقم الهاتف</th>
                  <th scope="col">الهوايات</th>
                  <th scope="col">اجراءات</th>
                </tr>
              </thead>
              {loading ?
                <tbody>
                  <tr>
                    <td colSpan={2}></td>
                    <td>
                      <Spinner animation="border" variant="primary" />
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody> :
                <tbody>
                  {students?.map(student =>
                    <tr key={student.id}>
                      <th scope="row">{student.first_name} {student.last_name}</th>
                      <td>{student.nationality}</td>
                      <td>{student.phone_number}</td>
                      <td>{student.skills}</td>

                      <td className='d-flex'>
                        <span className='mx-2' onClick={() => deleteStudent(student.id)}>
                          <BsTrash />
                        </span>

                        <span>
                          <TbPencil />
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              }
            </table>
          </div>
          <Pagination
            shape="rounded"
            count={total}
            page={page}
            size="small"
            onChange={changePage}
            variant="outlined" />
        </>
        : <p><b>... تحميل</b></p>}
    </div>
  )
}

export default StudentsTable