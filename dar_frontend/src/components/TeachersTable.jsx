import React, { useEffect, useState, useContext } from 'react'
import Api from '../Api';
import { BsPencil, BsPlusCircle, BsTrash } from 'react-icons/bs'
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import SessionContext from '../session/SessionContext';
import { Pagination } from '@mui/material'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function TeachersTable() {

  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const { session: { user: { id } } } = useContext(SessionContext);

  const default_center_id = role_id === 3 ? centers[0]['center_id'] : 0;

  const [teachers, setTeachers] = useState([]);
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showdiv, setShowdiv] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
  const [allcenters, setAllCenters] = useState(null);
  const [center_id, setCenter_id] = useState(default_center_id);
  const [user_role, setUser_role] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [fname_error, setFname_error] = useState('');
  const [mname_error, setMname_error] = useState('');
  const [lname_error, setLname_error] = useState('');
  const [phone_error, setPhone_error] = useState('');
  const [loading, setLoading] = useState(false);
  const [outloading, setoutloading] = useState(true)
  const [noteacher, setnoteacher] = useState(false)


  const changePage = (e, value) => {
    setPage(value);
    //value here is page number
    getTeachers(value)
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

  const getTeachers = (p) => {
    setLoading(true)
    setnoteacher(false)
    Api.get(`getTeachersByCenter/${center_id}?page=${p}`).then(
      res => {
        setTeachers(res.data.data.data)
        setTotal(Math.ceil(res.data.data.total / 10))
        setLoading(false)
        setoutloading(false)
        if(res.data.data.data.length === 0 ){
          setnoteacher(true)
        }
      }
    ).catch(function (err) { console.log(err) })
  }

  const gets = (e) => {
    setLoading(true)
    setPage(1)
    const id_center = e.target.value;
    setCenter_id(id_center)
    getTeachersByCenter(id_center, 1)
  }
  const getTeachersByCenter = (id_center, p) => {
    setnoteacher(false)
    Api.get(`getTeachersByCenter/${id_center}?page=${p}`).then(
      (res) => {
        setTeachers(res.data.data.data)
        setTotal(Math.ceil(res.data.data.total / 10))
        setLoading(false)
        if (res.data.data.data.length === 0) {
          setnoteacher(true)
        }
      }
    )
  }

  const getCenters = () => {
    Api.get('getcenters').then((response) => {
      setAllCenters(response.data.data);
    })
  }

  const deleteteacher = (teacher_id) => {

    Swal.fire({
      title: '???? ?????? ?????????? ???? ?????? ?????? ????????????????',
      showCancelButton: true,
      cancelButtonText: '??????????',
      confirmButtonText: '??????',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Api.delete(`deleteteacher/${teacher_id}`).then(
          (res) => {
            if (res.data.success) {
              Swal.fire(res.data.message, '', 'success')
              const teachersList = teachers.filter((teacher) => teacher.id !== teacher_id)
              setTeachers(teachersList)
            } else {
              Swal.fire(res.data.message, '', 'error')
            }
          }
        )
      }
    })

  }

  useEffect(() => {
    getTeachers(page)
    getCenters()
  }, [])

  return (
    <div>
      {/*  */}

      {!outloading ?
        <div>
          <div className='d-flex justify-content-between'>
            <button type="button" className="btn btn-success mb-3 d-flex align-items-center" onClick={showModal}>
              <BsPlusCircle className='text-white' />
              <span className='px-2'>
                ?????????? ?????????? ????????
              </span>
            </button>

            {role_id === 3 ? '' :
              <select className='mb-3 text-dark rounded bg-white' value={center_id} onChange={gets}>
                <option disabled="disabled" value='0'>
                  ???????? ?????? ??????????????
                </option>
                {allcenters ? allcenters.map((center) =>
                  <option key={center.id} value={center.id}>{center.name}</option>) :
                  '?????????? ...'}
              </select>
            }
          </div>

          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Body className='rtl'>
              <div className='d-flex'>
                <p>???? ???????? ?????????? ???????? ???????? ??????????????????</p>
                <div className='mx-2'>
                  <input type="radio" id='showdiv' name='showdiv_radio' onClick={() => setShowdiv(true)} />
                  <label htmlFor="showdiv" className='mx-2'>??????</label>
                </div>
                <div className='mx-2'>
                  <input type="radio" id='hidediv' name='showdiv_radio' onClick={() => setShowdiv(false)} />
                  <label htmlFor="hidediv" className='mx-2'>????</label>
                </div>
              </div>

              {showdiv ?
                <div >
                  <label htmlFor="username">?????? ????????????????</label>
                  <input type='text' id="username" className='form-control rtl my-2'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                  <label htmlFor="password">???????? ????????????</label>
                  <input type='text' id="password" className='form-control rtl my-2'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div> : null}

              <label htmlFor="first_name">?????? ??????????</label>
              <input type='text' id="first_name" className='form-control rtl my-2'
                name='first_name'
                onChange={(e) => setFname(e.target.value)}
              ></input>
              {fname_error ? <p><b className='text-danger'>{fname_error}</b></p> : ''}

              <label htmlFor="middle_name">?????? ????????</label>
              <input type='text' id="middle_name" className='form-control rtl my-2'
                name='middle_name'
                onChange={(e) => setMname(e.target.value)}
              ></input>
              {mname_error ? <p><b className='text-danger'>{mname_error}</b></p> : ''}

              <label htmlFor="last_name">?????????? ????????????</label>
              <input type='text' id="last_name" className='form-control rtl my-2'
                name='last_name'
                onChange={(e) => setLname(e.target.value)}
              ></input>
              {lname_error ? <p><b className='text-danger'>{lname_error}</b></p> : ''}

              <label htmlFor="phone_number">?????? ????????????</label>
              <input type='text' id="phone_number" className='form-control rtl my-2'
                name='phone_number'
                onChange={(e) => setPhone_number(e.target.value)}
              ></input>
              {phone_error ? <p><b className='text-danger'>{phone_error}</b></p> : ''}

              {role_id === 1 || role_id === 2 ?
                <>
                  <label htmlFor="">?????????????? ??????????????</label>
                  <div className='my-2'>
                    <Form.Select defaultValue={center_id} onChange={(e) => setCenter_id(e.currentTarget.value)}>
                      <option disabled="disabled" value='0'>???????? ?????? ??????????????</option>
                      {allcenters ? allcenters.map((center) =>
                        <option key={center.id} value={center.id}>{center.name}</option>) :
                        '?????????? ...'}
                    </Form.Select>
                  </div>
                </>
                : ''}

              {role_id === 1 || role_id === 2 ?
                <>
                  <label htmlFor="">?????? ????????????????</label>
                  <div className='my-2'>
                    <Form.Select name='user_role' defaultValue={user_role} onChange={(e) => setUser_role(e.currentTarget.value)}>
                      <option disabled="disabled" value={0}>???????? ?????? ????????????????????</option>
                      <option value="2">?????????? ??????</option>
                      <option value="3">????????</option>
                      <option value="4">??????????</option>
                    </Form.Select>
                  </div>
                </> : ''}

            </Modal.Body>
            <Modal.Footer>
              <button type='button' className='btn btn-dark' onClick={hideModal}>??????????</button>
              <button type='button' className='btn btn-success' onClick={addTeacher} >??????????</button>
            </Modal.Footer>
          </Modal>

          <table className="table table-dark table-responsive table-hover text-center">
            <thead>
              <tr>
                <th scope="col">??????????</th>
                <th scope="col">?????? ????????????</th>
                <th scope="col">????????????</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {loading ?
                <tr>
                  <td colSpan={2}></td>
                  <td>
                    <Spinner animation="border" variant="primary" />
                  </td>
                  <td></td>
                </tr>
                : teachers.length > 0 ? teachers.map(teacher =>
                  <tr key={teacher.id}>
                    <th>{teacher.first_name} {teacher.middle_name} {teacher.last_name}</th>
                    <td>{teacher.phone_number}</td>
                    <td>{teacher.center_name}</td>
                    <td>
                      <span className='cursor_pointer'
                        onClick={() => deleteteacher(teacher.id)}><BsTrash /></span>
                      <NavLink to={`/editteacher/${teacher.id}`}>
                        <span className='mx-2 cursor_pointer text-white'>
                          <BsPencil />
                        </span>
                      </NavLink>

                    </td>
                  </tr>
                ) : <></>
              }
            </tbody>
          </table>

          {noteacher ? <div className='m-3 text-center'><b>???? ???????? ???? ?????????? ???? ?????? ????????????</b></div> : ''}

          <Pagination
            shape="rounded"
            count={total}
            page={page}
            size="small"
            onChange={changePage}
            variant="outlined"
          />

        </div>
        : <div className='mt-5 text-center'><Spinner /></div>
      }
    </div>
  )
}

export default TeachersTable