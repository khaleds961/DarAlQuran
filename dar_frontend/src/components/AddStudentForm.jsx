import React, { useState, useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import CenterSelect from './CenterSelect';
import TeacherSelect from './TeacherSelect';


export default function AddStudentForm() {

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);
    const ok = role_id === 3 ? centers[0]['center_id'] : 0;

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [center_id, setCenter_id] = useState(ok)
    const [teachers, setTeachers] = useState([])
    const [teacher_id, setTeacher_id] = useState(0)


    useEffect(() => {
        if (center_id !== 0) {
            getTeachersByCenter()
        }
    }, [center_id])

    const getTeachersByCenter = () => {
        setTeachers([])
        setTeacher_id(0)
        Api.get(`getAllTeachersByCenter/${center_id}`).then((res) => {
            setTeachers(res.data.data);
        })
    }

    const addstudent = (e) => {
        e.preventDefault();
        console.log(center_id);
        console.log(teacher_id);
        Api.post('addstudent', {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            center_id: role_id === 3 || role_id === 4 ? centers[0]['center_id'] : center_id !== 0 ? center_id : null,
            teacher_id: teacher_id !== 0 ? teacher_id : null
        }).then(
            (res) => {
                Swal.fire(res.data.message, '', 'success')
                setUsername('')
                setPassword('')
                setFirst_name('')
                setLast_name('')
                setPhone_number('')
            }
        ).catch(function (error) {
            console.log(error)
        })
    }
    return (
        <div>

            <>
                <div className="form-row">

                    <div className="form-group col-md-6 my-2">
                        <label htmlFor="f_name my-2">الاسم الاول</label>
                        <input type="text" name='first_name' className="form-control my-2"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            id="f_name" />
                    </div>

                    <div className="form-group col-md-6 my-2">
                        <label htmlFor="l_name">الاسم الاخير</label>
                        <input type="text" name='last_name' className="form-control my-2"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            id="l_name" />
                    </div>

                    <div className="form-group col-md-6 my-2">
                        <label htmlFor="phone_number">رقم الهاتف</label>
                        <input type="text" name='phone_number' className="form-control my-2"
                            value={phone_number}
                            onChange={(e) => setPhone_number(e.target.value)}
                            id="phone_number" />
                    </div>

                    <CenterSelect center_id={setCenter_id} />

                    <TeacherSelect teachers={teachers} teacher_id={setTeacher_id} />

                </div>
                <button className="btn btn-primary mt-3" onClick={addstudent}> اضافة</button>
            </>
        </div>
    )
}
