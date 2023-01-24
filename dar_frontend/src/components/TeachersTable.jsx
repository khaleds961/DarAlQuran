import React, { useEffect, useState, useContext } from 'react'
import Api from '../Api';
import { BsPlusCircle } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import SessionContext from '../session/SessionContext';


function TeachersTable() {

  const { session: { roles } } = useContext(SessionContext)
  const { session } = useContext(SessionContext)

  const [teachers, setTeachers] = useState();
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showdiv, setShowdiv] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
  const [centers, setCenters] = useState(null);
  const [center_id, setCenter_id] = useState(0);
  const [user_role, setUser_role] = useState(0);
  const [fname_error, setFname_error] = useState('');
  const [mname_error, setMname_error] = useState('');
  const [lname_error, setLname_error] = useState('');
  const [phone_error, setPhone_error] = useState('');

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
      role_id:roles[0] === 3 ? 4 : user_role,
      phone_number: phone_number,
      center_id: center_id
    })
      .then((response) => {
        hideModal()
        Swal.fire(response.data.message, '', 'success')
        getTeachers()
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
    
    Api.get('getteachers').then(
      (res) => {
        setTeachers(res.data.data)
      }
    )
  }

  const userpass = () => {
    setUsername(null);
    setPassword(null);
  }

  const getCenters = () => {
    Api.get('getcenters').then((response) => {
      setCenters(response.data.data);
    })
  }

  // const userRole = () => {
    // if (roles[0] === 3) {
    //   setUser_role(4)
    // }
  // }

  useEffect(() => {
    getTeachers()
    getCenters()
    // userRole()
    console.log(session);
  }, [])

  return (
    <div>
      {teachers ?
        <div>
          <button type="button" className="btn btn-dark mb-3 d-flex align-items-center" onClick={showModal}>
            <BsPlusCircle className='text-white' />
            <span className='px-2'>
              اضافة استاذ جديد
            </span>
          </button>

          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Body className='rtl'>
            -  <div className='d-flex'>
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

              <label htmlFor="">المراكز المتاحة</label>
              <div className='my-2'>
                <Form.Select defaultValue={0} value={center_id} onChange={(e) => setCenter_id(e.currentTarget.value)}>
                  <option selected={true} disabled="disabled" value={0}>اختر احد المراكز</option>
                  {centers ? centers.map((center) =>
                    <option key={center.id} value={center.id}>{center.name}</option>) :
                    'تحميل ...'}
                </Form.Select>
              </div>

              {roles[0] === 1 || roles[0] === 2 ?
                <>
                  <label htmlFor="">نوع المستخدم</label>
                  <div className='my-2'>
                    <Form.Select name='user_role' defaultValue={0} value={user_role} onChange={(e) => setUser_role(e.currentTarget.value)}>
                      <option selected={true} disabled="disabled" value={0}>اختر احد المستخدمين</option>
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
        </div>
        : <b>تحميل ...</b>}
    </div>
  )
}

export default TeachersTable