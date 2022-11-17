import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginSuccess } from '../redux/authSlice';
import { Backdrop } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import loading from '../public/Ripple-1s-200px.gif'
import BookDetail from '../components/BookDetail';
import TableList from '../components/TableList';
import axios from 'axios';
import CallAPI from '../utils/CallAPI'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Home() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const reduxResponse = useSelector((state) => state.auth.login);
    const user = reduxResponse.currentUser;

    useEffect(() => {
        if (!user) navigate('/login')
    }, [])

    const toastOption = {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      }

    useEffect(() => {
        CallAPI.listBooks().then((res)=> {
            setBooks(res);
            setIsLoading(false)
        })
    }, [])

    const handleLogout = () => {
        
    }
    
    const handleDelete = (e, id) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setIsLoading(true);
                        await CallAPI.deleteBook(id)
                            .then(()=> {
                            toast.success('Deleted successfully', toastOption)
                            const newListBook = books.filter((book)=> book.id !== +id);
                            setBooks(newListBook);
                            setIsLoading(false)
                        })
                            .catch(err => toast.error(err.response.data.message, toastOption))

                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    return (
        <>
            <Container>
                <TableList children={books} deleteBook={handleDelete}></TableList>
            </Container>
            <Backdrop
                open={isLoading}
            >
                 <img src={loading} alt="loading" className="loading" style={{width: '50px'}}/>
            </Backdrop>
            <ToastContainer />
        </>
    )
}
const Container = styled.div`
    // display: grid;
    // grid-template-columns: 15% 65% 20%;
`;
export default Home