import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Api from '../Api'


function CenterTable() {

    const [isOpen, setIsOpen] = useState(false);
    const [centers, setCenters] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
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
                    res => Swal.fire(res.data.message, '', 'success')
                )
                const newList = centers.filter((center) => center.id !== id);
                setCenters(newList);
            }
        })

    }

    const addCenter = (e) => {
        e.preventDefault();
        Api.post(`addcenter`, {
            name: name,
            location: location
        })
            .then(res => {
                hideModal()
                Swal.fire(res.data.message, '', 'success')
                getCenters()
            })
    }

    const getCenters = () => {
        Api.get(`getcenters`)
            .then(res => {
                const response = res.data.data;
                setCenters(response);
            })
    }
    useEffect(() => {
        getCenters()
    }, []);

    return (

        <>
            {centers ?
                <div>
                    <button type="button" className="btn btn-dark mb-3 d-flex align-items-center" onClick={showModal}>
                        <BsPlusCircle className='text-white' />
                        <span className='px-2'>
                            اضافة مركز جديد
                        </span>
                    </button>
                    <Modal show={isOpen} onHide={hideModal}>
                        {/* <Modal.Header>
                    <Modal.Title>
                        <span>
                            اضافة مركز
                        </span>
                    </Modal.Title>
                </Modal.Header> */}
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
                            <button type='button' className='btn btn-dark' onClick={addCenter} >اضافة</button>
                        </Modal.Footer>
                    </Modal>
                    <table className="table table-dark table-responsive table-hover">
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
                                        <span className='delete_center' onClick={() => deleteCenter(center.id)}>
                                            <BsTrash />
                                        </span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                : 'loading ...'}
        </>
    )
}

export default CenterTable