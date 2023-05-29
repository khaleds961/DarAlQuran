import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Api from '../Api'
import SessionContext from '../session/SessionContext'
import CenterSelect from './CenterSelect'
import SideBar from './SideBar'
import { Spinner } from 'react-bootstrap'


export default function EditTeacher() {

    const navigate = useNavigate()
    const { teacher_id } = useParams()
    const { session: { user: { centers } } } = useContext(SessionContext)
    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { token } } = useContext(SessionContext)

    const [teacher, setTeacher] = useState([])
    const [newfirst_name, setnewfirst_name] = useState('')
    const [newmiddle_name, setnewmiddle_name] = useState('')
    const [newlast_name, setnewlast_name] = useState('')
    const [newusername, setnewusername] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [newphone_number, setnewphone_number] = useState('')
    const [newcenterid, setnewcenterid] = useState(0)
    const [userrole, setUserRole] = useState(0)
    const [loading, setLoading] = useState(true)


    const checkteacher = () => {
        if (role_id === 3) {
            const id_center = centers[0]['center_id']
            Api.get(`checkteacher/${id_center}/${teacher_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(
                (res) => {
                    if (res.data.success) {
                        setTeacher(res.data.data)
                        setnewfirst_name(res.data.data.first_name)
                        setnewmiddle_name(res.data.data.middle_name)
                        setnewlast_name(res.data.data.last_name)
                        setnewusername(res.data.data.username)
                        setnewpassword(res.data.data.password)
                        setnewphone_number(res.data.data.phone_number)
                        setnewcenterid(res.data.data.center_id)
                        setUserRole(res.data.data.role_id)
                        setLoading(false)
                    } else {
                        Swal.fire(res.data.message, '', 'warning')
                        navigate('/teachers')
                    }
                }
            ).catch(function (err) { console.log(err) })
        } else {
            Api.get(`getteacherbyid/${teacher_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(
                (res) => {
                    setTeacher(res.data.data)
                    setnewfirst_name(res.data.data.first_name)
                    setnewmiddle_name(res.data.data.middle_name)
                    setnewlast_name(res.data.data.last_name)
                    setnewusername(res.data.data.username)
                    setnewpassword(res.data.data.password)
                    setnewphone_number(res.data.data.phone_number)
                    setnewcenterid(res.data.data.center_id)
                    setUserRole(res.data.data.role_id)
                    setLoading(false)
                }
            ).catch(function (err) { console.log(err) })
        }
    }

    const goback = () => {
        navigate('/teachers')
    }

    const editTeacher = (teacher_id) => {
        Api.post(`/editteacherbyid/${teacher_id}`, {
            first_name: newfirst_name,
            middle_name: newmiddle_name,
            last_name: newlast_name,
            username: newusername,
            password: newpassword,
            phone_number: newphone_number,
            role_id: userrole
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.data.success) {
                Swal.fire(res.data.message, '', 'success')
                checkteacher()
                navigate('/teachers')
            }
        }

        )
    }

    const getnewcenterid = (center_id) => {
        setnewcenterid(center_id)
    }

    useEffect(() => {
        checkteacher()
    }, [])


    return (
        <div className="container-fluid rtl">
            <div className="row flex-nowrap">
                <SideBar />
                {loading ?
                    <div className="col py-3" style={{ background: '#EEEEEE' }}>
                        <div className='text-center mt-5'>
                            <Spinner />
                        </div>
                    </div> :
                    <div className="col py-3" style={{ background: '#EEEEEE' }}>
                        <h3 className='mb-5 text-center'>تعديل الاستاذ</h3>

                        <div className='container' style={{ width: '80%' }}>

                            <div className="form-group row">
                                <div className='col'>
                                    <label className='my-2'>الاسم</label>
                                    <input type="text" className="form-control item" defaultValue={newfirst_name}
                                        onChange={(e) => setnewfirst_name(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className='col'>
                                    <label className='my-2'>اسم الاب</label>
                                    <input type="text" className="form-control item" defaultValue={newmiddle_name}
                                        onChange={(e) => setnewmiddle_name(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className='col'>
                                    <label className='my-2'>العائلة</label>
                                    <input type="text" className="form-control item" defaultValue={newlast_name}
                                        onChange={(e) => setnewlast_name(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className='col'>
                                    <label className='my-2'>رقم الهاتف</label>
                                    <input type="text" className="form-control item" defaultValue={newphone_number}
                                        onChange={(e) => setnewphone_number(e.target.value)} />
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

                            <CenterSelect c_id={newcenterid} center_id={getnewcenterid} />

                            {role_id === 1 || role_id === 2 ?
                                <div className='form-group-row'>
                                    <div className='col'>
                                        <label className='my-2'>نوع المستخدم</label>
                                        <select className="form-control col my-2 responsive_width" value={userrole} onChange={(e) => setUserRole(e.target.value)}>
                                            <option disabled="disabled" value={0}>اختر نوع المستخدم</option>
                                            <option value={4}>استاذ</option>
                                            <option value={3}>مشرف</option>
                                        </select>
                                    </div>
                                </div> : ''}



                            <div>
                                <button className='btn btn-success mt-3 px-3' onClick={() => editTeacher(teacher.id)}>تعديل</button>
                                <button className='btn btn-dark mt-3 px-3 mx-2' onClick={() => goback()}>الغاء</button>
                            </div>
                        </div>

                    </div>
                }

            </div>
        </div>
    )
}
