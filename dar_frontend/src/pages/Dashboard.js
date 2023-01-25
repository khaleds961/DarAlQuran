import React, { useContext, useEffect } from 'react'
import Navbar from '../components/SideBar'
import SessionContext from '../session/SessionContext'


export default function Dashboard() {
  const { session:{user} } = useContext(SessionContext);


  useEffect(() => { 
    console.log(user);
  })
  return (
    <div className="container-fluid rtl">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3" style={{ background: '#EEEEEE' }}>
          اهلا وسهلا
        </div>
      </div>
    </div>
  )
}
