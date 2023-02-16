import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsTrash, BsPencil } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Api from '../Api'


function CenterTable() {

    const [isOpen, setIsOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [centers, setCenters] = useState(null);
    const [centerbyid, setCenterbyid] = useState([]);
    const [name, setName] = useState('');
    const [newname, setnewName] = useState('');
    const [location, setLocation] = useState('');
    const [newlocation, setnewLocation] = useState('');

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setEditModal(false)
    };

    const deleteCenter = (id) => {
        Swal.fire({
            title: 'هل انت متأكد من حذف المركز؟',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'حذف',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Api.put(`deleteCenter/${id}`).then(
                    res => {
                        if (res.data.success) {
                            Swal.fire(res.data.message, '', 'success')
                            const newList = centers.filter((center) => center.id !== id);
                            setCenters(newList);
                        } else {
                            Swal.fire(res.data.message, '', 'warning')
                        }
                    }
                )

            }
        })

    }

    const addCenter = (e) => {
        if (name && location) {
            e.preventDefault();
            Api.post(`addcenter`, {
                name: name,
                location: location
            }).then(res => {
                hideModal()
                Swal.fire(res.data.message, '', 'success')
                getCenters()
            }).catch(function (err) { console.log(err) })
        } else {
            Swal.fire('ادخل الاسم مع العنوان', '', 'warning')
        }
    }

    const getCenters = () => {
        Api.get(`getcenters`)
            .then(res => {
                const response = res.data.data;
                setCenters(response);
            })
    }

    const getcenterbyid = (center_id) => {
        setCenterbyid([])
        setEditModal(true)
        Api.get(`getcenterbyid/${center_id}`).
            then((res) => setCenterbyid(res.data.data)).
            catch(function (err) { console.log(err) })
    }

    const updatecenter = (center_id) => {
        if (newname && newlocation) {
            Api.post(`updatecenter/${center_id}`,
                {
                    name: newname,
                    location: newlocation
                }).then((res) => {
                    if (res.data.success) {
                        Swal.fire(res.data.message, '', 'success')
                        getCenters()
                        setEditModal(false)
                    } else {
                        console.log(res)
                    }
                }
                ).
                catch(function (err) { console.log(err) })
        } else {
            Swal.fire('يجب ادخال الاسم والعنوان', '', 'warning')

        }
    }

    useEffect(() => {
        if (centerbyid) {
            setnewName(centerbyid['name'])
            setnewLocation(centerbyid['location'])
        }
    }, [centerbyid['id']])

    useEffect(() => {
        getCenters()
    }, []);

    return (

        <>
            {centers?.length === 0 ? <p><b>لا يوجد اي مركز بعد</b></p> : ''}
            {centers ?
                <div>
                    <button type="button" className="btn btn-success mb-3 d-flex align-items-center" onClick={showModal}>
                        <BsPlusCircle className='text-white' />
                        <span className='px-2'>
                            اضافة مركز جديد
                        </span>
                    </button>
                    <Modal show={isOpen} onHide={hideModal}>
                        <Modal.Body className='rtl'>
                            <label htmlFor="center_name">اسم المركز</label>
                            <input type='text' id="center_name" className='form-control rtl my-2'
                                name='name'
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                            <label htmlFor="center_location">العنوان</label>
                            <input type='text' id="center_location" className='form-control rtl my-2'
                                name='location'
                                onChange={(e) => setLocation(e.target.value)}
                            ></input>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type='button' className='btn btn-dark' onClick={hideModal}>الغاء</button>
                            <button type='button' className='btn btn-success' onClick={addCenter} >اضافة</button>
                        </Modal.Footer>
                    </Modal>
                    <table className="table table-dark table-responsive table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col">المركز</th>
                                <th scope="col">العنوان</th>
                                <th scope="col">اجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {centers?.map(center =>
                                <tr key={center.id}>
                                    <th scope="row">{center.name}</th>
                                    <td>{center.location}</td>
                                    <td>
                                        <span className='cursor_pointer' onClick={() => deleteCenter(center.id)}>
                                            <BsTrash />
                                        </span>

                                        <span className='cursor_pointer mx-2' onClick={() => getcenterbyid(center.id)}>
                                            <BsPencil />
                                        </span>
                                    </td>
                                </tr>
                            )}
                            {/* here */}
                            <Modal show={editModal} onHide={hideModal}>
                                <Modal.Body className='rtl'>
                                    <label htmlFor="new_center_name">اسم المركز</label>
                                    <input type='text' id="new_center_name"
                                        name="newname"
                                        className='form-control rtl my-2'
                                        defaultValue={centerbyid['name']}
                                        onChange={(e) => setnewName(e.target.value)}
                                    ></input>
                                    <label htmlFor="center_location_new">العنوان</label>
                                    <input type='text' id="center_location_new"
                                        defaultValue={centerbyid['location']}
                                        className='form-control rtl my-2'
                                        name='newlocation'
                                        onChange={(e) => setnewLocation(e.target.value)}
                                    ></input>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button type='button' className='btn btn-dark' onClick={hideModal}>الغاء</button>
                                    <button type='button'
                                        className='btn btn-success'
                                        onClick={() => updatecenter(centerbyid['id'])} >حفظ</button>
                                </Modal.Footer>
                            </Modal>
                            {/* here */}
                        </tbody>
                    </table>
                </div>
                : <p><b>تحميل ...</b></p>}
        </>
    )
}

export default CenterTable