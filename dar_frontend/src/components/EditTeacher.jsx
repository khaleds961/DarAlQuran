import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Api from '../Api'
import SessionContext from '../session/SessionContext'
import SideBar from './SideBar'


export default function EditTeacher() {

    const navigate = useNavigate()
    const { teacher_id } = useParams()
    const { session: { user: { centers } } } = useContext(SessionContext)
    const { session: { user: { role_id } } } = useContext(SessionContext);

    const [teacher, setTeacher] = useState([])
    const [newfirst_name, setnewfirst_name] = useState('')
    const [newmiddle_name, setnewmiddle_name] = useState('')
    const [newlast_name, setnewlast_name] = useState('')
    const [newusername, setnewusername] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [newphone_number, setnewphone_number] = useState('')


    const checkteacher = () => {
        if (role_id === 3) {
            const id_center = centers[0]['center_id']
            Api.get(`checkteacher/${id_center}/${teacher_id}`).then(
                (res) => {
                    if (res.data.success) {
                        setTeacher(res.data.data)
                        setnewfirst_name(res.data.data.first_name)
                        setnewmiddle_name(res.data.data.middle_name)
                        setnewlast_name(res.data.data.last_name)
                        setnewusername(res.data.data.username)
                        setnewpassword(res.data.data.password)
                        setnewphone_number(res.data.data.phone_number)
                    } else {
                        Swal.fire(res.data.message, '', 'warning')
                        navigate('/teachers')
                    }
                }
            ).catch(function (err) { console.log(err) })
        } else {
            Api.get(`getteacherbyid/${teacher_id}`).then(
                (res) => {
                    setTeacher(res.data.data)
                    setnewfirst_name(res.data.data.first_name)
                    setnewmiddle_name(res.data.data.middle_name)
                    setnewlast_name(res.data.data.last_name)
                    setnewusername(res.data.data.username)
                    setnewpassword(res.data.data.password)
                    setnewphone_number(res.data.data.phone_number)
                }
            ).catch(function (err) { console.log(err) })
        }
    }

    const goback = () => {
        navigate('/teachers')
    }
    const editTeacher = (teacher_id) => {
        console.log(newphone_number)
        Api.post(`/editteacherbyid/${teacher_id}`, {
            first_name: newfirst_name,
            middle_name: newmiddle_name,
            last_name: newlast_name,
            username: newusername,
            password: newpassword,
            phone_number: newphone_number
        }).then((res) => {
            console.log(res)
            if(res.data.success){
                console.log(res.data.message)
                Swal.fire(res.data.message, '', 'success')
                checkteacher()
            }
        }
            
        )
    }

    useEffect(() => {
        checkteacher()
    }, [])


    return (
        <div className="container-fluid rtl">
            <div className="row flex-nowrap">
                <SideBar />
                <div className="col py-3" style={{ background: '#EEEEEE' }}>
                    <h3 className='mb-5 text-center'>تعديل الاستاذ</h3>

                    <div className='container' style={{ width: '80%' }}>

                        <div className="form-group row">
                            <div className='col'>
                                <label className='my-2'>الاسم الاول</label>
                                <input type="text" className="form-control item" defaultValue={newfirst_name}
                                    onChange={(e) => setnewfirst_name(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className='col'>
                                <label className='my-2'>الاسم الاوسط</label>
                                <input type="text" className="form-control item" defaultValue={newmiddle_name}
                                    onChange={(e) => setnewmiddle_name(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className='col'>
                                <label className='my-2'>الاسم الاخير</label>
                                <input type="text" className="form-control item" defaultValue={newlast_name}
                                    onChange={(e) => setnewlast_name(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className='col'>
                                <label className='my-2'>رقم الهاتف</label>
                                <input type="text" className="form-control item" defaultValue={newphone_number}
                                onChange={(e)=>setnewphone_number(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className='col'>
                                <label className='my-2'>اسم المستخدم</label>
                                <input type="text" className="form-control item" defaultValue={newusername}
                                    onChange={(e) => setnewusername(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className='col'>
                                <label className='my-2'>كلمة السر</label>
                                <input type="text" className="form-control item" defaultValue={newpassword}
                                    onChange={(e) => setnewpassword(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button className='btn btn-success mt-3 px-3' onClick={() => editTeacher(teacher.id)}>تعديل</button>
                            <button className='btn btn-dark mt-3 px-3 mx-2' onClick={() => goback()}>الغاء</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
