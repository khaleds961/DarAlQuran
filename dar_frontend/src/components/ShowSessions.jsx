import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../Api'
import Moment from 'react-moment';
import { Spinner } from 'react-bootstrap';

function ShowSessions() {

    const { session_id } = useParams()

    const [sessions, setsesions] = useState([])
    const [loading, setloading] = useState(true)


    const getsessions = () => {
        Api.get(`getsessionsbystcente/${session_id}`).then(
            (res) => {
                console.log(res.data.data.data);
                setsesions(res.data.data.data)
                setloading(false)
            }
        ).catch(function (err) { console.log(err) })
    }
    useEffect(() => {
        getsessions()
    }, [])

    return (
        <div className='table-responsive m-3'>
            {loading ? <div className='mt-5 text-center'>
                <Spinner/>
            </div> :
                <table className='table text-md-center'>
                    <thead>
                        <tr>
                            <th>اليوم</th>
                            <th>التاريخ</th>
                            <th>النوع</th>
                            <th>من سورة</th>
                            <th>الى سورة</th>
                            <th>من ايه</th>
                            <th>الى ايه</th>
                            <th>القراءة</th>
                            <th>ملاحظات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.length > 0 ?
                            sessions.map((session) =>
                                <tr key={session.revision_id}>
                                    <td>{session.weekday}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">
                                            {session.rivison_date}
                                        </Moment>
                                    </td>
                                    <td>{session.type === 'recite' ? 'تسميع' : 'مراجعة'}</td>
                                    <td>{session.surah_from}</td>
                                    <td>{session.surah_to}</td>
                                    <td>{session.ayyah_from}</td>
                                    <td>{session.ayyah_to}</td>
                                    <td>{session.riwayahname}</td>
                                    <td>{session.notes}</td>
                                </tr>
                            ) : 'لا يوجد اي حصة بعد'}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default ShowSessions