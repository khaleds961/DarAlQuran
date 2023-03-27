import React, { useState } from 'react'
import EditStudent from '../components/EditStudent'
import SideBar from '../components/SideBar'
import { GiHamburgerMenu } from 'react-icons/gi'

function EditStudentPage() {

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
          <h3 className='mb-5 text-center'>تعديل الطالب</h3>
          <EditStudent />
        </div>
      </div>
    </div>
  )
}

export default EditStudentPage