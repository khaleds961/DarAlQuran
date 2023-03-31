import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { TbPencil } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import Api from '../Api'
import SessionContext from '../session/SessionContext'


export default function ExamTable() {
    const { session: { token } } = useContext(SessionContext)

    const [students, setstudents] = useState([])
    const [loading, setloading] = useState(true)

    const getStudents = () => {
        Api.get(`moujazstudents`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setstudents(res.data.data.data)
            setloading(false)
        })
    }

    const deleteexam = (exam_id) => {
        Swal.fire({
            title: 'هل انت متأكد من حذف هذه الجلسة',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'حذف',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Api.delete(`deleteexam/${exam_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((res) => {
                    if (res.data.success) {
                        console.log('shu');
                        const newList = students.filter((student) => student.exam_id !== exam_id);
                        setstudents(newList);
                        Swal.fire(res.data.message, '', 'success')
                    }
                })

            }
        })

    }

    useEffect(() => {
        getStudents()
    }, [])

    return (
        <div>
            <div className='d-flex align-items-center mb-3'>
                <NavLink className='btn btn-dark' to='/exam'>
                    <span className='mx-1'><AiFillPlusCircle /></span>
                    <span>اضافة جلسة اختبار</span>
                </NavLink>
            </div>

            <div className='table-responsive'>
                <table className='table table-dark table-hover text-center'>
                    <thead>
                        <tr>
                            <th>الطالب</th>
                            <th>الاستاذ</th>
                            <th>قرار اللجنة</th>
                            <th>استلم اجازته</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ?
                            <tr>
                                <td colSpan={2}>
                                </td>
                                <td>
                                    <Spinner />
                                </td>
                                <td colSpan={2}>
                                </td>
                            </tr>
                            :
                            students && students.length > 0 ?
                                students.map((student) =>
                                    <tr key={student.exam_id}>
                                        <td>{student.student_name}</td>
                                        <td>{student.teacher_name}</td>
                                        <td>{student.exam_decision === 'yes' ? 'منح اجازة' : 'لم يمنح'}</td>
                                        <td>{student.has_receive_ijaza === 1 ? 'استلم' : 'لم يستلم'}</td>
                                        <td>
                                            <span className='mx-2 cursor_pointer' onClick={() => deleteexam(student.exam_id)}>
                                                <BsTrash />
                                            </span>
                                            <span className='text-white cursor_pointer'>
                                                <TbPencil />
                                            </span>
                                        </td>
                                    </tr>) :
                                <tr>
                                    <td colSpan={2}></td>
                                    <td className='text-center'>لا يوجد اي اختبار بعد</td>
                                    <td colSpan={2}></td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
