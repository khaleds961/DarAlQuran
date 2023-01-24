import React from 'react'
import { useParams } from 'react-router-dom'


export default function StudentProfile() {
    const {id} = useParams();
  return (
    <div>StudentProfile{id} for superadmin</div>
  )
}
