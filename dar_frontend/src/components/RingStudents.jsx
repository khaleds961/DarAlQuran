import { Pagination } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import { BsFillPencilFill, BsTrash } from 'react-icons/bs'
import Swal from 'sweetalert2'
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';



export default function RingStudents() {

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);

    const default_center_id = role_id === 3 ? centers[0]['center_id'] : 0
    const [students, setstudents] = useState([])
    const [teacher, setteacher] = useState([])
    const [ring, setring] = useState([])
    const [ring_name, setring_name] = useState('')
    const [ring_id, setring_id] = useState(0)
    const [page, setpage] = useState(1)
    const [total, settotal] = useState(1)
    const [loading, setloading] = useState(false)
    const [centerid, setcenterid] = useState(default_center_id)


    const getfiltercenter = (c_id) => {
        setcenterid(c_id)
        getringsbycenter(c_id)
    }

    const getringsbycenter = (center_id) => {
        setring_id(0)
        Api.get(`getringsbycenter/${center_id}`).then(
            (res) => {
                setring(res.data.data)
            }
        )
    }

    const getstudentbyring = (ring_id, p) => {
        setloading(true)
        Api.get(`getstudentsbyring/${ring_id}?page=${p}`).then((res) => {
            setring_name(res.data.teacher_ring.name)
            setteacher(res.data.teacher_ring.teacher)
            setstudents(res.data.data.data)
            settotal(Math.ceil(res.data.data.total / 10))
            setloading(false)
        }).catch(function (err) { console.log(err) })
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
                Api.delete(`deletestudent/${student_id}/${centerid}`).then(
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

    useEffect(() => {
        if (ring_id !== 0) {
            getstudentbyring(ring_id, 1)
            setpage(1)
        }
    }, [ring_id])

    useEffect(() => {
        if (centerid) {
            getringsbycenter(centerid)
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

                                    <td className='bg-primary'>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length > 0 ?
                                    students.map((student) => <tr key={student.id}>
                                        <td>{student.first_name} {student.middle_name} {student.last_name}</td>
                                        <td>
                                            <span className='cursor_pointer'><BsFillPencilFill /></span>
                                            <span className='mx-2 cursor_pointer' onClick={() => deleteStudent(student.id)}><BsTrash /></span>
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
