import React, { useState, useEffect, useContext } from 'react'
import { Spinner } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsTrash, BsPencil } from 'react-icons/bs';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import TeacherSelect from './TeacherSelect';


export default function RingsTable() {


  const { session: { user: { role_id } } } = useContext(SessionContext);
  const { session: { user: { centers } } } = useContext(SessionContext);
  const defaultvalue = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : 0;

  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ringname, setringname] = useState('')
  const [editringname, seteditringname] = useState('')
  const [rings, setrings] = useState([])
  const [ringbyid, setringbyid] = useState([])
  const [centerid, setcenterid] = useState(defaultvalue)
  const [editcenterid, seteditcenterid] = useState(null)
  const [selectcenterid, setselectcenterid] = useState(defaultvalue)
  const [teacherid, setteacherid] = useState(null)
  const [editteacherid, seteditteacherid] = useState(null)
  const [teachers, setteachers] = useState([])
  const [loading, setLoading] = useState(false)
  const [insideloading, setinsideLoading] = useState(false)
  const [isactive, setisactive] = useState(null)

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
    Api.get(`getAllTeachersByCenter/${center_id}`).then((res) => {
      setteachers(res.data.data);
    })
  }

  const addRing = () => {
    Api.post(`addring`, {
      name: ringname,
      teacher_id: teacherid,
      center_id: selectcenterid
    }).then((res) => {
      if (res.data.success) {
        Swal.fire(res.data.message, '', 'success')
        setringname('')
        setteacherid(0)
        setselectcenterid(0)
        getRings()
      }
    }).catch(function (err) { console.log(err) })
  }

  const getRings = () => {
    setLoading(true)
    Api.get(`getrings/${centerid}`).then((res) => {
      setrings(res.data.data.data)
      setLoading(false)
    })
  }

  const getringbyid = (ring_id) => {
    setringbyid([])
    setEditModal(true)
    setinsideLoading(true)
    Api.get(`getringbyid/${ring_id}`).then((res) => {
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
      teacher_id:editteacherid
    }).then((res) => {
      if (res.data.success) {
        Swal.fire(res.data.message, '', 'success')
        getRings()
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
        Api.delete(`deletering/${ring_id}`).then(
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

  useEffect(() => {
    getRings()
  }, [])

  useEffect(() => {
    if (ringbyid['center_id']) {
      getTeachersByCenter(ringbyid['center_id'])
    }
  }, [ringbyid['center_id']])

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <button type="button" className="btn btn-success mb-3 d-flex align-items-center" onClick={showModal}>
          <BsPlusCircle className='text-white' />
          <span className='px-2'>
            اضافة حلقة جديد
          </span>
        </button>

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
      </div>

      <table className="table table-dark table-responsive table-hover text-center">
        <thead>
          <tr>
            <th scope="col">اسم الحلقة</th>
            <th scope="col">المركز</th>
            <th scope="col">الاستاذ</th>
            <th scope="col">الحالة</th>
            <th scope="col">التاريخ</th>
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
              <td colSpan={3}></td>
            </tr>
            :
            rings.length > 0 ? rings.map(ring =>
              <tr key={ring.id}>
                <th>{ring.name}</th>
                <td>{ring.center_name}</td>
                <td>{ring.teacher_fn} {ring.teacher_mn} {ring.teacher_ln}</td>
                <td>{ring.is_active ? 'نشط' : 'غير نشط'}</td>
                <td>
                  <Moment format="YYYY/MM/DD">
                    {ring.created_at}
                  </Moment>
                </td>
                <td>
                  {/* <span className='cursor_pointer'
                    onClick={() => deletering(ring.id)}><BsTrash /></span> */}
                  <span className='mx-2 cursor_pointer text-white'
                    onClick={() => getringbyid(ring.id)}>
                    <BsPencil />
                  </span>
                </td>
              </tr>
            ) : <></>
          }
        </tbody>
      </table>
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

