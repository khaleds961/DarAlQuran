import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { TbPencil } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import Api from '../Api'

export default function ExamTable() {

    const [students, setstudents] = useState([])
    const [loading, setloading] = useState(true)

    const getStudents = () => {
        Api.get(`moujazstudents`).then((res) => {
            setstudents(res.data.data.data)
            setloading(false)
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
                                <td colSpan={2}>
                                    <Spinner />
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
                                            <span className='mx-2 cursor_pointer'>
                                                <BsTrash />
                                            </span>
                                            <span className='text-white cursor_pointer'>
                                                <TbPencil />
                                            </span>
                                        </td>
                                    </tr>) :
                                ''
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
