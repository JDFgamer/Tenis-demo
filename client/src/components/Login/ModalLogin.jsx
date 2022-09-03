import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Login from './Login';

export default function ModalLogin({setUserLogin}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link variant="primary" onClick={handleShow}>
                Ingresar
            </Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¡ Un gusto volver a verte !</Modal.Title>
                </Modal.Header>
                <Modal.Body><Login setShow={setShow} setUserLogin={setUserLogin} /></Modal.Body>
            </Modal>
        </>
    );
}

