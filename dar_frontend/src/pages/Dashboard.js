import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/SideBar'
import Statistics from '../components/Statistics';
import SessionContext from '../session/SessionContext'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Dashboard() {
  const { session: { user } } = useContext(SessionContext);
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
          <Navbar />
        }
        <div className="col py-3" style={{ background: '#EEEEEE' }}>
          <Statistics />
        </div>
      </div>
    </div>

  )
}
