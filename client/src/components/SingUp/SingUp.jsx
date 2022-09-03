import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { singInWithGoogle } from '../../services/firebase'
import axios from 'axios'
import './style.css'
export default function SingUp({ setShow, setUserLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setname] = useState("");
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    async function handleSubmit() {
        await axios.post(`${process.env.REACT_APP_URL}/api/user/createuser`, { email, password, name })
            .then((result) => {
                window.localStorage.setItem('login', result.data)
            }).catch((err) => console.log(err))
        setShow(false)
        setUserLogin(true)
    }

    function handleLoginGoogle() {
        singInWithGoogle()
        setShow(false)
        setUserLogin(true)
    }
    return (
        <div className="Login">
            <Form>
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
            <img src='https://icon-library.com/images/sign-in-with-google-icon/sign-in-with-google-icon-3.jpg' onClick={handleLoginGoogle} ></img>
        </div>
    );
}