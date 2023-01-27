import React, { useEffect, useState, useContext } from 'react'
import Api from '../Api';
import { BsPlusCircle } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import SessionContext from '../session/SessionContext';
import { Pagination, makeStyles, createStyles } from '@mui/material'



function TeachersTable() {

  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const { session: { user: { id } } } = useContext(SessionContext);
  const { session } = useContext(SessionContext);


  const [teachers, setTeachers] = useState();
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showdiv, setShowdiv] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
  const [allcenters, setAllCenters] = useState(null);
  const [center_id, setCenter_id] = useState(0);
  const [user_role, setUser_role] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [filterclick, setFilterClick] = useState(false)
  const [fname_error, setFname_error] = useState('');
  const [mname_error, setMname_error] = useState('');
  const [lname_error, setLname_error] = useState('');
  const [phone_error, setPhone_error] = useState('');


  const changePage = (e, value) => {
    console.log(value)
    setPage(value);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setShowdiv(false)
    setFname_error('')
    setMname_error('')
    setLname_error('')
    setPhone_error('')
  };

  const addTeacher = () => {

    Api.post("/addteacher", {
      username: username,
      password: password,
      first_name: fname,
      middle_name: mname,
      last_name: lname,
      role_id: role_id === 3 ? 4 : user_role,
      phone_number: phone_number,
      center_id: role_id === 3 ? centers[0]['center_id'] : center_id
    })
      .then((response) => {
        hideModal()
        Swal.fire(response.data.message, '', 'success')
        getTeachers()
        setCenter_id(0)
      })
      .catch(function (error) {
        console.log(error.response);
        const errors_array = error.response.data.errors;
        console.log(errors_array?.first_name);
        errors_array?.first_name ? setFname_error(errors_array.first_name) : setFname_error('')
        errors_array?.middle_name ? setMname_error(errors_array.middle_name) : setMname_error('')
        errors_array?.last_name ? setLname_error(errors_array.last_name) : setLname_error('')
        errors_array?.phone_number ? setPhone_error(errors_array.phone_number) : setPhone_error('')
      });
  }

  const getTeachers = () => {
    const user_id = id;
    if (role_id === 1 || role_id === 2) {
      Api.get(`getteachers/${user_id}?page=${page}`).then(
        (res) => {
          setTeachers(res.data.data.data)
          setTotal(Math.ceil(res.data.data.total / 10))
        }
      )
    } else {
      const supervisor_center_id = centers[0].center_id;
      Api.get(`getTeacherbySupervisor/${supervisor_center_id}/${user_id}`).then(
        (res) => setTeachers(res.data.data)

      )
    }
  }

  const getTeachersByCenter = (e) => {
    setFilterClick(true)
    const user_id = id;
    const id_center = e.target.value;
    setCenter_id(id_center)
    Api.get(`getTeacherbySupervisor/${id_center}/${user_id}`).then(
      (res) => setTeachers(res.data.data)
    )
  }

  const getCenters = () => {
    Api.get('getcenters').then((response) => {
      setAllCenters(response.data.data);
    })
  }

  useEffect(() => {
    getTeachers()
    getCenters()
  }, [page])

  return (
    <div>
      {teachers ?
        <div>
          <div className='d-flex justify-content-between'>
            <button type="button" className="btn btn-dark mb-3 d-flex align-items-center" onClick={showModal}>
              <BsPlusCircle className='text-white' />
              <span className='px-2'>
                اضافة استاذ جديد
              </span>
            </button>

            <select className='mb-3 bg-dark text-white rounded' value={center_id} onChange={getTeachersByCenter}>
              <option disabled="disabled" value='0'>اختر احد المراكز</option>
              {allcenters ? allcenters.map((center) =>
                <option key={center.id} value={center.id}>{center.name}</option>) :
                'تحميل ...'}
              {/* <option value="last" onClick={tryme}>عرض الكل</option> */}
            </select>
          </div>

          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Body className='rtl'>
              <div className='d-flex'>
                <p>هل تريد اضافة حساب لهذا المستخدم؟</p>
                <div className='mx-2'>
                  <input type="radio" id='showdiv' name='showdiv_radio' onClick={() => setShowdiv(true)} />
                  <label htmlFor="showdiv" className='mx-2'>نعم</label>
                </div>
                <div className='mx-2'>
                  <input type="radio" id='hidediv' name='showdiv_radio' onClick={() => setShowdiv(false)} />
                  <label htmlFor="hidediv" className='mx-2'>لا</label>
                </div>
              </div>

              {showdiv ?
                <div >
                  <label htmlFor="username">اسم المستخدم</label>
                  <input type='text' id="username" className='form-control rtl my-2'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                  <label htmlFor="password">كلمة المرور</label>
                  <input type='text' id="password" className='form-control rtl my-2'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div> : null}

              <label htmlFor="first_name">اسم الاول</label>
              <input type='text' id="first_name" className='form-control rtl my-2'
                name='first_name'
                onChange={(e) => setFname(e.target.value)}
              ></input>
              {fname_error ? <p><b className='text-danger'>{fname_error}</b></p> : ''}

              <label htmlFor="middle_name">اسم الاب</label>
              <input type='text' id="middle_name" className='form-control rtl my-2'
                name='middle_name'
                onChange={(e) => setMname(e.target.value)}
              ></input>
              {mname_error ? <p><b className='text-danger'>{mname_error}</b></p> : ''}

              <label htmlFor="last_name">الاسم الاخير</label>
              <input type='text' id="last_name" className='form-control rtl my-2'
                name='last_name'
                onChange={(e) => setLname(e.target.value)}
              ></input>
              {lname_error ? <p><b className='text-danger'>{lname_error}</b></p> : ''}

              <label htmlFor="phone_number">رقم الهاتف</label>
              <input type='text' id="phone_number" className='form-control rtl my-2'
                name='phone_number'
                onChange={(e) => setPhone_number(e.target.value)}
              ></input>
              {phone_error ? <p><b className='text-danger'>{phone_error}</b></p> : ''}

              {role_id === 1 || role_id === 2 ?
                <>
                  <label htmlFor="">المراكز المتاحة</label>
                  <div className='my-2'>
                    <Form.Select defaultValue={center_id} onChange={(e) => setCenter_id(e.currentTarget.value)}>
                      <option disabled="disabled" value='0'>اختر احد المراكز</option>
                      {allcenters ? allcenters.map((center) =>
                        <option key={center.id} value={center.id}>{center.name}</option>) :
                        'تحميل ...'}
                    </Form.Select>
                  </div>
                </>
                : ''}

              {role_id === 1 || role_id === 2 ?
                <>
                  <label htmlFor="">نوع المستخدم</label>
                  <div className='my-2'>
                    <Form.Select name='user_role' defaultValue={user_role} onChange={(e) => setUser_role(e.currentTarget.value)}>
                      <option disabled="disabled" value={0}>اختر احد المستخدمين</option>
                      <option value="2">مسؤول عام</option>
                      <option value="3">مشرف</option>
                      <option value="4">استاذ</option>
                    </Form.Select>
                  </div>
                </> : ''}

            </Modal.Body>
            <Modal.Footer>
              <button type='button' className='btn btn-dark' onClick={hideModal}>الغاء</button>
              <button type='button' className='btn btn-dark' onClick={addTeacher} >اضافة</button>
            </Modal.Footer>
          </Modal>

          <table className="table table-dark table-responsive table-hover">
            <thead>
              <tr>
                <th scope="col">الاسم</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">اجراءات</th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map(teacher =>
                <tr key={teacher.id}>
                  <th scope="row">{teacher.first_name} {teacher.middle_name} {teacher.last_name}</th>
                  <td>{teacher.phone_number}</td>
                  <td>
                    {/* <span className='delete_center' onClick={() => deleteCenter(center.id)}>
                                            <BsTrash />
                                        </span> */}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filterclick ? '' :
            <Pagination
              shape="rounded"
              count={total}
              size="small"
              onChange={changePage}
              variant="outlined" />
          }
        </div>
        : <b>تحميل ...</b>}
    </div>
  )
}

export default TeachersTable