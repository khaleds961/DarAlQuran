import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Api from '../Api'
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import { NavLink,Link } from 'react-router-dom';




function StudentsTable() {

  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState(null);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [skills, setSkills] = useState('');



  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const deleteStudent = () => {

  }

  return (
    <div>
      {/* {students ? */}
        <div>
          <Link className='text-decoration-none text-white' to='/addstudent'>
            <button type="button" className="btn btn-dark mb-3 d-flex align-items-center">
              <BsPlusCircle className='text-white' />
              <span className='px-2'>
                اضافة طالب جديد
              </span>
            </button>
          </Link>

          <table className="table table-dark table-responsive table-hover">
            <thead>
              <tr>
                <th scope="col">الاسم</th>
                <th scope="col">الجنسية</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">الهوايات</th>
              </tr>
            </thead>
            <tbody>
              {students?.map(student =>
                <tr key={student.id}>
                  <th scope="row">{student.name}</th>
                  <td>{student.location}</td>
                  <td>
                    <span className='delete_student' onClick={() => deleteStudent(student.id)}>
                      <BsTrash />
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* : <p><b>تحميل ...</b></p>} */}

    </div>
  )
}

export default StudentsTable