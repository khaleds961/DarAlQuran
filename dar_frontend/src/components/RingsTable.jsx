import { Pagination } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react'
import { Spinner } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { AiOutlineEye } from 'react-icons/ai';
import { BsPlusCircle, BsPencil, BsTrash } from 'react-icons/bs';
import Moment from 'react-moment';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import TeacherSelect from './TeacherSelect';



export default function RingsTable() {

  const { session: { token } } = useContext(SessionContext)
  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const { session: { user: { id: user_id } } } = useContext(SessionContext);

  const defaultvalue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;
  const defaultTeacherId = role_id === 4 ? user_id : null;
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ringname, setringname] = useState('')
  const [editringname, seteditringname] = useState('')
  const [rings, setrings] = useState([])
  const [ringbyid, setringbyid] = useState([])
  const [centerid, setcenterid] = useState(defaultvalue)
  const [editcenterid, seteditcenterid] = useState(null)
  const [selectcenterid, setselectcenterid] = useState(defaultvalue)
  const [filtercenterid, setfiltercenterid] = useState(0)
  const [teacherid, setteacherid] = useState(defaultTeacherId)
  const [filterteacherid, setfilterteacherid] = useState(0)
  const [editteacherid, seteditteacherid] = useState(null)
  const [teachers, setteachers] = useState([])
  const [teachers_filter, setteachers_filter] = useState([])
  const [loading, setLoading] = useState(false)
  const [insideloading, setinsideLoading] = useState(false)
  const [isactive, setisactive] = useState(null)
  const [page, setpage] = useState(1)
  const [total, settotal] = useState(1)
  const [filter_ring, setFilter_ring] = useState('choose')

  const showModal = () => {
    setIsOpen(true);
    if (centerid !== 0) {
      getTeachersByCenter(centerid)
    }
  };

  const hideModal = () => {
    setIsOpen(false);
    setEditModal(false)
  };

  const getfiltercenter = (center_id) => {
    setfiltercenterid(center_id)
    setfilterteacherid(0)
    getTeachersFilterByCenter(center_id)
    getringsbycenterpagination(center_id, 1)
    setFilter_ring('choose')
  }

  const getfilterteacherid = (teacher_id) => {
    setfilterteacherid(teacher_id)
    setFilter_ring('choose')
  }

  const getcenterid = (center_id) => {
    setselectcenterid(center_id)
    setteacherid(0)
    getTeachersByCenter(center_id)
  }

  const getcenteridforedit = (center_id) => {
    seteditcenterid(center_id)
  }

  const geteditteacherid = (teacher_id) => {
    seteditteacherid(teacher_id)
  }

  const getteacherid = (teacher_id) => {
    setteacherid(teacher_id)
  }

  const getTeachersByCenter = (center_id) => {
    setteachers([])
    Api.get(`getAllTeachersByCenter/${center_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setteachers(res.data.data);
    })
  }

  const getTeachersFilterByCenter = (center_id) => {
    setteachers([])
    Api.get(`getAllTeachersByCenter/${center_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setteachers_filter(res.data.data);
    })
  }

  const getringsbycenterpagination = (center_id, p) => {
    setLoading(true)
    Api.get(`getringsbycenterpagination/${center_id}?page=${p}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.data.success) {
        setrings(res.data.data.data)
        settotal(Math.ceil(res.data.data.total / 10))
        setLoading(false)
      }
    }).catch(function (err) { console.log(err) })
  }

  const addRing = () => {
    Api.post(`addring`, {
      name: ringname,
      teacher_id: teacherid,
      center_id: selectcenterid
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.data.success) {
        Swal.fire(res.data.message, '', 'success')
        setringname('')

        if (role_id !== 4) {
          setteacherid(0)
        }

        if (role_id === 1 || role_id === 2) {
          setselectcenterid(0)
        }

        if (role_id === 4) {
          getringsbyteacher(user_id, page)
        } else {
          getRings(page)
        }
      }
    }).catch(function (err) { console.log(err) })
  }

  const getRings = (p) => {
    setLoading(true)
    Api.get(`getrings/${centerid}?page=${p}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setrings(res.data.data.data)
      settotal(Math.ceil(res.data.data.total / 10))
      setLoading(false)
    })
  }

  const getringbyid = (ring_id) => {
    setringbyid([])
    setEditModal(true)
    setinsideLoading(true)
    Api.get(`getringbyid/${ring_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setringbyid(res.data.data)
      setisactive(res.data.data.isactive)
      seteditringname(res.data.data.name)
      seteditteacherid(res.data.data.teacher_id)
      setinsideLoading(false)
    })
  }

  const editring = (ring_id) => {

    Api.post(`editring/${ring_id}`, {
      name: editringname,
      is_active: isactive,
      teacher_id: editteacherid
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.data.success) {
        Swal.fire(res.data.message, '', 'success')
        getRings(1)
        setpage(1)
        setEditModal(false)
      }
    })
  }

  const deletering = (ring_id) => {
    Swal.fire({
      title: 'هل انت متأكد من حذف الطالب؟',
      showCancelButton: true,
      cancelButtonText: 'الغاء',
      confirmButtonText: 'حذف',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Api.delete(`deletering/${ring_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(
          (res) => {
            if (res.data.success) {
              Swal.fire(res.data.message, '', 'success')
              const newList = rings.filter((ring) => ring.id !== ring_id)
              setrings(newList)
            } else {
              Swal.fire(res.data.message, '', 'error')
            }
          }
        )
      }
    })
  }

  const changePage = (e, value) => {
    setpage(value)
    if (filter_ring !== 'choose') {
      filterRings(filter_ring, value)
    } else {
      if (filtercenterid !== 0) {
        getringsbycenterpagination(filtercenterid, value)
      } else {
        if (filterteacherid !== 0) {
          getringsbyteacher(filterteacherid, value)
        } else {
          if (role_id === 4) {
            getringsbyteacher(user_id, value)
          } else {
            getRings(value)
          }
        }
      }
    }
  }

  const getringsbyteacher = (teacher_id, p) => {
    setLoading(true)
    Api.get(`getringsbyteacher/${teacher_id}?page=${p}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setrings(res.data.data.data)
      settotal(Math.ceil(res.data.data.total / 10))
      setLoading(false)
    }).catch(function (err) { console.log(err) })
  }

  const handleNavigate = (ring_id, center_id) => {
    navigate('/ringstudents', { state: { ringid: ring_id, center_id: center_id } })
  }

  const filterRings = (filter_ring, p) => {
    setLoading(true)
    let teacher_id = filterteacherid === null ? 0 : filterteacherid
    Api.get(`filterRings/${filtercenterid}/${teacher_id}/${filter_ring}?page=${p}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.data.success) {
          setrings(res.data.data.data)
          settotal(Math.ceil(res.data.data.total / 10))
          setLoading(false)
        }
      }).catch(function (err) { console.log(err); })
  }

  const changeRingFilter = (value) => {
    setpage(1)
    setFilter_ring(value)
    filterRings(value, 1)
  }

  useEffect(() => {
    if (role_id === 3) {
      getTeachersByCenter(centerid)
      getRings(1)
    }
    if (role_id === 1 || role_id === 2) {
      getRings(1)
    }
    if (role_id === 4) {
      getringsbyteacher(user_id, 1)
    }
  }, [])

  useEffect(() => {
    if (ringbyid['center_id']) {
      getTeachersByCenter(ringbyid['center_id'])
    }
  }, [ringbyid['center_id']])

  useEffect(() => {
    if (filterteacherid) {
      getringsbyteacher(filterteacherid, 1)
      setpage(1)
    }
  }, [filterteacherid])

  return (
    <div>
      <div>
        <div className='d-md-flex'>
        
          <button type="button" className="btn btn-success mb-3 d-flex align-items-center responsive_width" onClick={showModal}>
            <BsPlusCircle className='text-white' />
            <span className='px-2 col-md-auto mx-auto mb-md-0'>
              اضافة حلقة جديدة
            </span>
          </button>

          <NavLink to='/ringstudents'>
            <button type="button" className="btn btn-primary mb-3 d-flex align-items-center mx-md-2 responsive_width">
              <AiOutlineEye className='text-white' />
              <span className='px-2 col-md-auto mx-auto mb-md-0'>
                طلاب الحلقات
              </span>
            </button>
          </NavLink>
        </div>

        <div className='d-md-flex justify-content-end'>
          <CenterSelect c_id={filtercenterid} data={getfiltercenter} fromstudent={true} />

          <div className='mx-md-2 mb-3 responsive_width'>
            {role_id === 3 ?
              <TeacherSelect teachers={teachers} teacher_id={getfilterteacherid} tid={filterteacherid} fromquransession={true} />
              :
              <TeacherSelect teachers={teachers_filter} teacher_id={getfilterteacherid} tid={filterteacherid} fromquransession={true} />
            }
          </div>

          <div className='responsive-width mb-3'>
            <select className='form-control my-2' value={filter_ring}
              onChange={(e) => changeRingFilter(e.target.value)}>
              <option value='choose' disabled>-- اختر الحالة --</option>
              <option value="all">الكل</option>
              <option value={1}>نشط</option>
              <option value={0}>غير نشط</option>
            </select>
          </div>
        </div>
      </div>

      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Body className='rtl'>
          <label htmlFor="center_name">اسم الحلقة</label>
          <input type='text' className='form-control rtl my-2'
            value={ringname}
            onChange={(e) => setringname(e.target.value)}
          ></input>
          <CenterSelect center_id={getcenterid} c_id={selectcenterid} />
          <TeacherSelect teachers={teachers} teacher_id={getteacherid} tid={teacherid} />
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-dark' onClick={hideModal}>الغاء</button>
          <button type='button' className='btn btn-success' onClick={addRing} >اضافة</button>
        </Modal.Footer>
      </Modal>

      <div className='table-responsive'>
        <table className="table table-dark table-responsive table-hover text-center">
          <thead>
            <tr>
              <th scope="col">اسم الحلقة</th>
              <th scope="col" className='d-none d-md-table-cell'>المركز</th>
              <th scope="col" className='d-none d-md-table-cell'>الاستاذ</th>
              <th scope="col" className='d-none d-md-table-cell'>الحالة</th>
              <th scope="col">التاريخ</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {loading ?
              <tr>
                <td colSpan={2} className='d-none d-md-table-cell'></td>
                <td>
                  <Spinner animation="border" variant="primary" colSpan={2} />
                </td>
                <td colSpan={3}></td>
              </tr>
              :
              rings.length > 0 ? rings.map(ring =>
                <tr key={ring.id}>
                  <th>
                    <>
                      {ring.is_active ?
                        <span className='cursor_pointer' onClick={() => handleNavigate(ring.id, ring.center_id)}>
                          {ring.name}
                        </span> :
                        <span >
                          {ring.name}
                        </span>}
                    </>
                  </th>
                  <td className='d-none d-md-table-cell'>{ring.center_name}</td>
                  <td className='d-none d-md-table-cell'>{ring.teacher_fn} {ring.teacher_mn} {ring.teacher_ln}</td>
                  <td className='d-none d-md-table-cell'>{ring.is_active ? 'نشط' : 'غير نشط'}</td>
                  <td>
                    <Moment format="YYYY/MM/DD">
                      {ring.created_at}
                    </Moment>
                  </td>
                  <td>
                    <span className='mx-2 text-white cursor_pointer'
                      onClick={() => getringbyid(ring.id)}>
                      <BsPencil />
                    </span>
                    <span className='mx-2 text-white cursor_pointer'
                      onClick={() => deletering(ring.id)}>
                      <BsTrash />
                    </span>
                  </td>
                </tr>
              ) : <></>
            }
          </tbody>
        </table>
      </div>

      {rings && rings.length > 0 ?
        <>
          <Pagination
            shape="rounded"
            count={total}
            page={page}
            size="small"
            onChange={changePage}
            variant="outlined" />
        </>
        : ''}
      {/* Edit Modal  */}

      <Modal show={editModal} onHide={hideModal}>
        {insideloading ?
          <Modal.Body className='text-center'><Spinner /></Modal.Body>
          :
          <>
            <Modal.Body className='rtl'>

              <label htmlFor="center_name">اسم الحلقة</label>
              <input type='text' className='form-control rtl my-2'
                defaultValue={ringbyid['name']}
                onChange={(e) => seteditringname(e.target.value)}
              ></input>
              <CenterSelect center_id={getcenteridforedit} c_id={ringbyid['center_id']} />
              <TeacherSelect teachers={teachers} teacher_id={geteditteacherid} tid={editteacherid} />

              <label>هل ما تزال الحلقة قائمة؟</label>
              <select className="form-control col my-2" defaultValue={ringbyid['is_active']} onChange={(e) => setisactive(e.target.value)}>
                <option value={0}>لا</option>
                <option value={1}>نعم</option>
              </select>
            </Modal.Body>
            <Modal.Footer>
              <button type='button' className='btn btn-dark' onClick={hideModal}>الغاء</button>
              <button type='button' className='btn btn-success'
                onClick={() => editring(ringbyid['id'])}
              >حفظ</button>
            </Modal.Footer>
          </>}
      </Modal>

    </div>
  )
}

