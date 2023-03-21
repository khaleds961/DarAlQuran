import moment from 'moment';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BsPlusCircle } from 'react-icons/bs';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import Api from '../Api';


export default function StudentModal({ student }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setdate] = useState(moment().format('YYYY-MM-DD'))
    const [fromsurrah, setfromsurrah] = useState('')
    const [tosurrah, settosurrah] = useState('')
    const [fromayyah, setfromayyah] = useState('')
    const [toayyah, settoayyah] = useState('')
    const [attendance, setAttendance] = useState('attendance')
    const [type, settype] = useState('')

    const addsessionring = () => {
        if (attendance && date) {
            if (attendance === 'absence') {
                setfromsurrah(null)
                settosurrah(null)
                setfromayyah(null)
                settoayyah(null)
                settype(null)
            }
            console.log('hehe', attendance);
            Api.post(`addsessionring`, {
                attendance: attendance === 'attendance' ? 1 : 0,
                ring_id: student.ring_id,
                student_id: student.id,
                date: date,
                from_surrah: fromsurrah,
                from_ayyah: fromayyah,
                to_surrah: tosurrah,
                to_ayyah: toayyah,
                type: type
            }).then((res) => {
                if (res.data.success) {
                    Swal.fire(res.data.message, '', 'success')
                    handleClose()
                } else {
                    Swal.fire(res.data.message, '', 'warning')
                }
            }).catch(function (err) { console.log(err); })
        }
    }
    return (
        <>
            <span onClick={handleShow} className='cursor_pointer'>
                <BsPlusCircle />
            </span>
            <Modal show={show} onHide={handleClose} className='rtl'>
                <Modal.Header closeButton>
                    <Modal.Title>{student.first_name} {student.middle_name} {student.last_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="" className='my-1'>التاريخ</label>
                        <input type="date" className='form-control'
                            value={date}
                            onChange={(e) => setdate(e.target.value)} />
                    </div>
                    <div>
                        <div className='my-3'>تسجيل حضور ام غياب؟</div>
                        <span>
                            <label className='mx-1'>
                                حضور
                            </label>
                            <input type="radio"
                                name='att'
                                value='attendance'
                                checked={attendance === 'attendance'}
                                onChange={(e) => setAttendance(e.target.value)}
                            />
                        </span>

                        <span className='mx-2'>
                            <label className='mx-1'>
                                غياب
                            </label>
                            <input type="radio"
                                name='att'
                                value='absence'
                                checked={attendance === 'absence'}
                                onChange={(e) => setAttendance(e.target.value)}
                            />
                        </span>
                        {attendance === 'attendance' ?
                            <div>
                                <div className='my-3'>تسجيل تسميع ام حفظ</div>
                                <span>
                                    <label className='mx-1'>
                                        تسميع
                                    </label>
                                    <input type="radio"
                                        name='type'
                                        value='revision'
                                        checked={type === 'revision'}
                                        onChange={(e) => settype(e.target.value)}
                                    />
                                </span>

                                <span className='mx-2'>
                                    <label className='mx-1'>
                                        حفظ
                                    </label>
                                    <input type="radio"
                                        name='type'
                                        value='recite'
                                        checked={type === 'recite'}
                                        onChange={(e) => settype(e.target.value)}
                                    />
                                </span>
                                {type ?
                                    <div>
                                        <span>
                                            <label htmlFor="" className='my-2'>من السورة</label>
                                            <input type="text" className='form-control'
                                                onChange={(e) => setfromsurrah(e.target.value)} />
                                        </span>
                                        <span>
                                            <label htmlFor="" className='my-2'>من الايه</label>
                                            <input type="text" className='form-control'
                                                onChange={(e) => setfromayyah(e.target.value)} />
                                        </span> <span>
                                            <label htmlFor="" className='my-2'>الى السورة</label>
                                            <input type="text" className='form-control'
                                                onChange={(e) => settosurrah(e.target.value)} />
                                        </span> <span>
                                            <label htmlFor="" className='my-2'>الى الايه</label>
                                            <input type="text" className='form-control'
                                                onChange={(e) => settoayyah(e.target.value)} />
                                        </span>
                                    </div>
                                    : ''}
                            </div>
                            :
                            <div>
                            </div>}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        اغلاق
                    </Button>
                    <Button variant="success" onClick={addsessionring}>
                        اضافة
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
