import React, { useEffect } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import TableList from '../components/TableList'
import {useSelector} from 'react-redux'
import BookDetail from '../components/BookDetail';

function Admin() {
  const reduxResponse = useSelector((state) => state.auth.login);
  

  useEffect(() => {

  },[])
  return (
    <>
      {/* <HeaderAdmin/> */}
      <BookDetail/>
    </>
  )
}

export default Admin