import React, { useState, useContext, useEffect } from 'react'
import Api from '../Api'
import SessionContext from '../session/SessionContext';

function CenterSelect({ center_id, fromstudent = false, data, c_id, monthlyreport = false }) {

    const { session: { user: { role_id } } } = useContext(SessionContext);
    const { session:{token} }  = useContext(SessionContext)
    const [allcenters, setAllCenters] = useState([]);

    useEffect(() => {
        getCenters()
    }, [])

    const getCenters = () => {
        Api.get('getcenters',{
            headers: { Authorization: `Bearer ${token}` }
          }).then(
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
                            {!monthlyreport ?
                                <label htmlFor="">المراكز المتاحة</label> : ''
                            }
                            <div>
                                <select className="form-control col my-2 responsive_width" value={c_id} onChange={(e) => center_id(e.target.value)}>
                                    <option disabled="disabled" value={0}>اختر احد المراكز</option>
                                    {allcenters ? allcenters.map((center) =>
                                        <option key={center.id} value={center.id}>{center.name}</option>) :
                                        'تحميل ...'}
                                </select>
                            </div>
                        </>
                        :
                        <div>
                            <select className="btn bg-white text-dark my-2 px-2 responsive_width" value={c_id} onChange={(e) => data(e.target.value)}>
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