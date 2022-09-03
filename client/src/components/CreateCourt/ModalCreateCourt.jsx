import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import CreateCourt from './CreateCourt';

export default function ModalSingUp() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link variant="primary" onClick={handleShow}>
                Crear Cancha
            </Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body><CreateCourt setShow={setShow} /></Modal.Body>
            </Modal>
        </>
    );
}
