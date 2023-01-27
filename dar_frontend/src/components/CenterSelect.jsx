import React, { useState, useContext, useEffect } from 'react'
import Api from '../Api'
import SessionContext from '../session/SessionContext';
import { Form } from 'react-bootstrap';

function CenterSelect({ center_id }) {

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session: { user: { centers } } } = useContext(SessionContext);

    const [allcenters, setAllCenters] = useState([]);


    useEffect(() => {
        getCenters()
    }, [])
    
    const getCenters = () => {
        Api.get('getcenters').then(
            (res) => {
                setAllCenters(res.data.data)
            }
        ).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <div>

            {role_id === 1 || role_id === 2 ?
                <>
                    <label htmlFor="">المراكز المتاحة</label>
                    <div className='form-group col-md-6 my-2'>
                        <select className="form-control col-md-6 my-2" defaultValue={0} onChange={(e) => center_id(e.target.value)}>
                            <option disabled="disabled" value='0'>اختر احد المراكز</option>
                            {allcenters ? allcenters.map((center) =>
                                <option key={center.id} value={center.id}>{center.name}</option>) :
                                'تحميل ...'}
                        </select>
                    </div>
                </>
                : ''}
        </div>
    )
}

export default CenterSelect