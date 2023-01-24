import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionContext from '../session/SessionContext';
import { FormGroup, Form, Button, FormLabel, InputGroup } from 'react-bootstrap';
import dar_quran from '../images/dar_quran2.png'

function Login() {

    const navigate = useNavigate();

    const { actions: { login } } = useContext(SessionContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        // Prevent the default submit and page reload
        e.preventDefault()
        login(username, password)
    }
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/')
        }
    });

    return (
        <div className='rtl login-form' >
            <Form className='m-5 p-5 border'>
                {/* <h3 className='text-center mb-5' >دار القران الكريم</h3> */}
                <div className='d-flex align-items-center justify-content-center mb-3'>
                <img src={dar_quran} alt="cur"
                    height={200}
                    width={200}
                ></img>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='h5' >اسم المستخدم</Form.Label>
                    <Form.Control type="email" placeholder=""
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='h5'>كلمة المرور</Form.Label>
                    <Form.Control type="password" placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button className='form-control btn btn-dark rounded submit px-3'
                    onClick={handleSubmit}>
                    تسجيل الدخول
                </Button>
            </Form>
        </div>
    )
}

export default Login