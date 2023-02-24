import React, { useState, useContext, useEffect } from 'react'
import Api from '../Api'
import SessionContext from '../session/SessionContext';

function CenterSelect({ center_id, fromstudent = false, data, c_id }) {

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const [allcenters, setAllCenters] = useState([]);
    
    console.log(c_id,'la la la la')

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
                    {!fromstudent ?
                        <>
                            <label htmlFor="">المراكز المتاحة</label>
                            <div>
                                <select className="form-control col my-2" value={c_id} onChange={(e) => center_id(e.target.value)}>
                                    <option disabled="disabled" value={0}>اختر احد المراكز</option>
                                    {allcenters ? allcenters.map((center) =>
                                        <option key={center.id} value={center.id}>{center.name}</option>) :
                                        'تحميل ...'}
                                </select>
                            </div>
                        </>
                        :
                        <div>
                            <select className="btn bg-white text-dark my-2 px-2" value={c_id} onChange={(e) => data(e.target.value)}>
                                <option disabled="disabled" value={0}>اختر احد المراكز</option>
                                {allcenters ? allcenters.map((center) =>
                                    <option key={center.id} value={center.id}>{center.name}</option>) :
                                    'تحميل ...'}
                            </select>
                        </div>}
                </>
                : ''}
        </div>
    )
}

export default CenterSelect