import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import SingUp from './SingUp';

export default function ModalSingUp({ setUserLogin }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link variant="primary" onClick={handleShow}>
                Crear Cuenta
            </Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¡ Un gusto volver a verte !</Modal.Title>
                </Modal.Header>
                <Modal.Body><SingUp setShow={setShow} setUserLogin={setUserLogin} /></Modal.Body>
            </Modal>
        </>
    );
}

