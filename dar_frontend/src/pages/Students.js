import React, { useEffect, useState } from 'react'
import Api from '../Api'
import SideBar from '../components/SideBar'
import StudentsTable from '../components/StudentsTable'
import { GiHamburgerMenu } from 'react-icons/gi'

function Students() {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="container-fluid rtl" style={{ background: '#EEEEEE' }}>
      <div className='mx-2 mb-2'>
        <span className='cursor_pointer' onClick={handleClick}>
          <GiHamburgerMenu size={20} />
          {/* <span className='mx-2'>اغلاق الشريط</span> */}
        </span>
      </div>
      <div className="row flex-nowrap">
        {clicked ? '' :
          <SideBar />
        }
        <div className="col py-3" style={{ background: '#EEEEEE' }}>
          <h3 className='mb-5 text-center'>الطلاب</h3>
          <StudentsTable />
        </div>
      </div>
    </div>
  )
}

export default Students