import { Pagination } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState, useContext } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BsFillPencilFill, BsTrash } from 'react-icons/bs'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import StudentModal from './StudentModal'
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';

export default function RingStudents() {

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);
    const { session: { user: { id: user_id } } } = useContext(SessionContext);
    const { session: { token } } = useContext(SessionContext)

    const navigate = useNavigate()

    const location = useLocation()
    const default_ring_id = location?.state?.ringid ?? 0;
    const default_center_id = role_id === 3 || role_id === 4 ? centers[0]['center_id'] : location?.state?.center_id ?? 0;

    const [students, setstudents] = useState([])
    const [teacher, setteacher] = useState([])
    const [ring, setring] = useState([])
    const [ring_name, setring_name] = useState('')
    const [ring_id, setring_id] = useState(default_ring_id)
    const [page, setpage] = useState(1)
    const [total, settotal] = useState(1)
    const [loading, setloading] = useState(false)
    const [centerid, setcenterid] = useState(default_center_id)
    const [smShow, setSmShow] = useState(false);
    const [notedate, setnotedate] = useState('')
    const [note, setnote] = useState('')

    console.log(ring_id, 'ijijij');
    const handleNavigate = (id) => {
        const encrypted = AES.encrypt(id.toString(), 'secretKey').toString().replace(/\//g, '_');
        navigate(`/editringstudent/${encrypted}`)
    }

    const handleClose = () => {
        setSmShow(false)
        setnote('')
        setnotedate('')
    }

    const getfiltercenter = (c_id) => {
        setcenterid(c_id)
        setring_id(0)
        getringsbycenter(c_id)
    }

    const getringsbycenter = (center_id) => {
        Api.get(`getringsbycenter/${center_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                setring(res.data.data)
            }
        )
    }

    const getstudentbyring = (ring_id, p) => {
        setloading(true)
        Api.get(`getstudentsbyring/${ring_id}?page=${p}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log({ res });
            setring_name(res?.data?.teacher_ring?.name)
            setteacher(res?.data?.teacher_ring?.teacher)
            setstudents(res?.data?.data?.data)
            settotal(Math.ceil(res.data.data.total / 10))
            setloading(false)
        }).catch(function (err) { console.log(err) })
    }

    const addnewnote = () => {
        console.log(note, 'note');
        console.log(notedate, 'notedate');
        console.log(ring_id, 'ring_id');
        if (ring_id !== 0) {
            if (note && notedate) {
                Api.post(`addcommentring`, {
                    ring_id: ring_id,
                    comment: note,
                    date: notedate
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((res) => {
                    if (res.data.success) {
                        Swal.fire(res.data.message, '', 'success')
                        setnote('')
                        setnotedate('')
                    } else {
                        Swal.fire(res.data.message, '', 'alert')

                    }
                })
            } else {
                Swal.fire('ادخل الملاحظة والتاريخ', '', 'warning')
            }
        } else {
            Swal.fire('تأكد من انك اخترت الحلقة')
        }

    }

    const deleteStudent = (student_id) => {
        Swal.fire({
            title: 'هل انت متأكد من حذف الطالب؟',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'حذف',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Api.delete(`deletestudent/${student_id}/${centerid}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(
                    res => {
                        Swal.fire(res.data.message, '', 'success')
                        const newList = students.filter((student) => student.id !== student_id);
                        setstudents(newList);
                    }
                )
            }
        })
    }


    const changePage = (e, value) => {
        setpage(value)
        getstudentbyring(ring_id, value)
    }

    const getringsbyteacher = (user_id) => {
        console.log('hey');
        Api.get(`getallringsbyteacher/${user_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log({res});
            if (res.data.success) {
                setring(res.data.data)
            }
        })
    }

    useEffect(() => {
        if (ring_id !== 0) {
            getstudentbyring(ring_id, 1)
            setpage(1)
        }
    }, [ring_id])

    useEffect(() => {
        if (role_id === 4) {
            getringsbyteacher(user_id)
        } else {
            if (centerid) {
                getringsbycenter(centerid)
            }
        }
    }, [])

    return (
        <div>
            <div className='d-flex flex-row-reverse mb-3'>
                <select className='btn bg-white text-dark m-2 px-2 ' value={ring_id}
                    onChange={(e) => setring_id(e.target.value)}>
                    <option value={0} disabled>اختر احد الحلقات</option>
                    {ring.length > 0 ? ring.map((r) =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ) :
                        <option disabled>لا يوجد اي حلقة</option>
                    }
                </select>

                <CenterSelect data={getfiltercenter} c_id={centerid} fromstudent={true} />
            </div>
            <>
                {loading ? <div className='text-center mt-5'><Spinner /></div> :
                    <>
                        <table className='table table-dark table-hover text-center'>
                            <thead>

                                <tr className='bg-info'>
                                    <td className='bg-info'>
                                        <span>الاستاذ: </span>
                                        <span>
                                            <b>
                                                {teacher.first_name} {teacher.middle_name} {teacher.last_name}
                                            </b>
                                        </span>
                                    </td>

                                    <td className='bg-primary' colSpan={2}>
                                        <span>الحلقة: </span>
                                        <span>
                                            <b>
                                                {ring_name}
                                            </b>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th> اسم الطالب</th>
                                    <th>عمر الطالب</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length > 0 ?
                                    <tr>
                                        <td colSpan={3} className='bg-success'>
                                            <div className='cursor_pointer' onClick={() => setSmShow(true)}>
                                                <span><AiFillPlusCircle /></span>
                                                <span className='mx-2'>
                                                    اضافة ملاحظة للادارة
                                                </span>
                                            </div>
                                            <>
                                                <Modal
                                                    show={smShow}
                                                    onHide={handleClose}
                                                    aria-labelledby="example-modal-sizes-title-sm"
                                                >
                                                    <Modal.Header className='rtl'>
                                                        <Modal.Title id="example-modal-sizes-title-sm">
                                                            اضافة ملاحظة جديدة عن الحلقة
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body >
                                                        <div className='rtl'>
                                                            <div>
                                                                <label htmlFor="" className='my-1'>التاريخ</label>
                                                                <input type="date" className='form-control' value={notedate}
                                                                    onChange={(e) => setnotedate(e.target.value)} />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="" className='my-1'>الملاحظة</label>
                                                                <input type="text" className='form-control' value={note}
                                                                    onChange={(e) => setnote(e.target.value)} />
                                                            </div>
                                                            <div className='my-2'>
                                                                <button className='btn btn-success' onClick={addnewnote}>اضافة</button>
                                                                <button className='btn btn-dark mx-2' onClick={handleClose}>الغاء</button>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </>
                                        </td>
                                    </tr> : ''}
                                {students.length > 0 ?
                                    students.map((student) =>
                                        <tr key={student.id}>
                                            <td>{student.first_name} {student.middle_name} {student.last_name}</td>
                                            <td>{moment().diff(student.birthdate, 'years')}</td>
                                            <td>
                                                <span className='cursor_pointer text-white' onClick={() => handleNavigate(student.id)}>
                                                    <BsFillPencilFill />
                                                </span>
                                                <span className='mx-2 cursor_pointer' onClick={() => deleteStudent(student.id)}><BsTrash /></span>
                                                <StudentModal student={student} />
                                            </td>
                                        </tr>)
                                    : <tr>
                                        <td colSpan={4}>لا يوجد اي تلميذ بعد</td>
                                    </tr>
                                }
                            </tbody>
                        </table>

                        {students.length > 0 ?
                            <Pagination
                                shape="rounded"
                                count={total}
                                page={page}
                                onChange={changePage}
                                size="small"
                                variant="outlined"
                            />
                            : ''}
                    </>
                }
            </>
        </div>
    )
}
