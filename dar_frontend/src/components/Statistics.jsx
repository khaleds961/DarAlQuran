import React, { useEffect, useState } from 'react'
import Api from '../Api'
import { FaUserGraduate } from 'react-icons/fa'
import { Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {BiBuildingHouse} from 'react-icons/bi'
import {GiTeacher} from 'react-icons/gi'

function Statistics() {

    const [statistics, setstatistics] = useState([])
    const [loading, setLoading] = useState(true)

    const counting = () => {
        Api.get('counting').then((res) => {
            setstatistics(res.data.data)
            setLoading(false)
        }).catch(function (err) { console.log(err) })
    }
    useEffect(() => {
        counting()
    }, [])

    return (
        <div className='container mt-4' style={{ width: '80%' }} >
            {loading ? <div className='text-center mt-5'><Spinner /></div> :

                <div className='row'>
                    <div className='col-md'>
                        <Card
                            bg='primary'
                            text='white'
                            className="col-md"
                        >
                            <Card.Header className='text-center'>
                                <div>
                                    <span className='mx-2'>
                                        <FaUserGraduate size={20}/>
                                    </span>
                                    <span className=''>
                                        عدد الطلاب
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {/* <Card.Title>Card Title </Card.Title> */}
                                <Card.Text className='text-center' style={{ fontSize: '1.4em' }}>
                                    {statistics['students']}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='col-md'>
                        <Card
                            bg='success'
                            text='white'
                            className="col-md"
                        >
                            <Card.Header className='text-center'>
                                <div>
                                    <span className='mx-2'>
                                        <BiBuildingHouse size={20} />
                                    </span>
                                    <span className=''>
                                        عدد المراكز
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {/* <Card.Title>Card Title </Card.Title> */}
                                <Card.Text className='text-center' style={{ fontSize: '1.4em' }}>
                                    {statistics['centers']}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='col-md'>
                        <Card
                            bg='danger'
                            text='white'
                            className="col-md"
                        >
                            <Card.Header className='text-center'>
                                <div>
                                    <span className='mx-2'>
                                        <GiTeacher size={20} />
                                    </span>
                                    <span className=''>
                                        عدد الاساتذة
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {/* <Card.Title>Card Title </Card.Title> */}
                                <Card.Text className='text-center' style={{ fontSize: '1.4em' }}>
                                    {statistics['students']}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

            }
        </div>
    )
}

export default Statistics