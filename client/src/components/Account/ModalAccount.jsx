import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Account from './Account';

export default function ModalAccount({ setUserLogin }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link variant="primary" onClick={handleShow}>
                Cuenta
            </Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¡ Un gusto volver a verte !</Modal.Title>
                </Modal.Header>
                <Modal.Body><Account setShow={setShow} setUserLogin={setUserLogin} /></Modal.Body>
            </Modal>
        </>
    );
}

