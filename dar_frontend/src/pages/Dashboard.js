import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/SideBar'
import Statistics from '../components/Statistics';
import SessionContext from '../session/SessionContext'
import { GiHamburgerMenu } from 'react-icons/gi'


export default function Dashboard() {
  const { session: { user } } = useContext(SessionContext);
  
  const [clicked, setClicked] = useState(true)
  const [clicked_md, setClicked_md] = useState(false)


  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleClickMd = () => {
    setClicked_md(!clicked_md);
  };

  return (

    <div className="container-fluid rtl min-vh-100" style={{ background: '#EEEEEE' }}>
      <div className='mb-2' style={{ marginRight: '-5px' }}>
        <span className='cursor_pointer d-md-none' onClick={handleClick}>
          <GiHamburgerMenu size={20} />
        </span>
        <span className='cursor_pointer d-none d-md-block' onClick={handleClickMd}>
          <GiHamburgerMenu size={20} />
        </span>
      </div>
      <div className="row flex-nowrap">
        <Navbar clicked={clicked} clicked_md={clicked_md}/>
        <div className="col py-3" style={{ background: '#EEEEEE' }}>
          <Statistics />
        </div>
      </div>
    </div>

  )
}
