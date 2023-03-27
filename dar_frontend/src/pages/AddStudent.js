import React, { useState } from 'react'
import AddStudentForm from '../components/AddStudentForm'
import SideBar from '../components/SideBar'
import { GiHamburgerMenu } from 'react-icons/gi'

function AddStudent() {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (

    <div className="container-fluid rtl min-vh-100" style={{ background: '#EEEEEE' }}>
      <div className='mx-2 mb-2'>
        <span className='cursor_pointer' onClick={handleClick}>
          <GiHamburgerMenu size={20} />
        </span>
      </div>
      <div className="row flex-nowrap">
        {clicked ? '' :
          <SideBar />
        }
        <div className="col py-3" style={{ background: '#EEEEEE' }}>
          <h3 className='mb-5 text-center'>اضافة طالب جديد</h3>
          <AddStudentForm />
        </div>
      </div>
    </div>
  )
}

export default AddStudent