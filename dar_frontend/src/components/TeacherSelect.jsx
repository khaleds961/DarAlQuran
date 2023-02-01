import React, { useContext, useEffect } from 'react'
import SessionContext from '../session/SessionContext';

export default function ({ teachers, teacher_id }) {

    const { session: { user: { role_id } } } = useContext(SessionContext);

    return (
        <div>
            <div>

                {role_id === 1 || role_id === 2 || role_id === 3 ?
                    <>
                        <label htmlFor="">الاساتذة</label>
                        <div className='form-group col-md-6 my-2'>
                            {teachers.length !== 0 ?
                                <>
                                    <select className="form-control col-md-6 my-2" 
                                        onChange={(e) => teacher_id(e.target.value)}>
                                        <option value={'DEFAULT'} selected disabled> اختر احد الاساتذة</option>
                                        {teachers.map((teacher) =>
                                            <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.middle_name} {teacher.last_name}</option>)}
                                    </select>
                                </>
                                :
                                <select className="form-control col-md-6 my-2" defaultValue={0}>
                                    <option value="0">تحميل...</option>
                                </select>}
                        </div>
                    </>
                    : ''}
            </div>
        </div>
    )
}
