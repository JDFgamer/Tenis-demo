import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import './style.css'
import getToken from '../../hook/verifyToken'
export default function Account({ setShow, setUserLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setname] = useState("");
    const token = getToken();
    function validateForm() {
        return email.length > 0 || password.length > 0 || name.length > 0;
    }
    async function handleSubmit() {
        await axios.put(`${process.env.REACT_APP_URL}/api/user/updateuser/${token.id}`, { email, password, name },
            {
                headers: {
                    'x-access-token': window.localStorage.getItem('login'),
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((result) => {
                window.localStorage.setItem('login', result.data)
                setShow(false)
            })
    }
    async function handleDeleteAccount() {
        await axios.delete(`${process.env.REACT_APP_URL}/api/user/deteleuser/${token.id}`,
            {
                headers: {
                    'x-access-token': window.localStorage.getItem('login'),
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(() => {
                window.localStorage.clear();
            }).catch((err) => { console.log(err) })
        setShow(false)
        setUserLogin(false)
    }


    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block="true" size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
                    Aceptar
                </Button>
            </Form>
            <Button variant="danger" onClick={handleDeleteAccount}>Eliminar cuenta</Button>
        </div>
    );
}