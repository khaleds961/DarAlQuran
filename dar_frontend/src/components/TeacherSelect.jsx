import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import Api from '../Api';
import SessionContext from '../session/SessionContext';



export default function ({teacher_id},center_id) {

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const [teachers, setTeachers] = useState([]);

    const getTeachers = () => {
        Api.get(`getTeachersByCenter/${center_id}`).then(
            (res) => {
                setTeachers(res.data.data)
            }
        ).catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        getTeachers()
        console.log(center_id);
    },[])

    return (
        <div>
            <div>

                {role_id === 1 || role_id === 2 ?
                    <>
                        <label htmlFor="">الاساتذة</label>
                        <div className='form-group col-md-6 my-2'>
                            <select className="form-control col-md-6 my-2" defaultValue={0} onChange={(e)=>teacher_id(e.target.value)}>
                                <option disabled="disabled" value='0'>اختر احد الاساتذة</option>
                                {teachers ? teachers.map((teacher) =>
                                    <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.middle_name} {teacher.last_name}</option>) :
                                    'تحميل ...'}
                            </select>
                        </div>
                    </>
                    : ''}
            </div>
        </div>
    )
}
