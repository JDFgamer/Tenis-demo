import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createCourts, successCreationCourt } from '../../redux/actions/actions.jsx'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './style.css'
import DataPicker from "./DataPicker";

export default function CreateCourt({ setShow }) {
    const dispatch = useDispatch();
    const errorCourt = useSelector((state) => state.createCourtError)
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const [turn, setTurn] = useState("");
    function validateForm() {
        return type.length > 0 || price > 0 || availableDate.length > 0 || turn.length > 0
    }
    async function handleSubmit() {
        dispatch(createCourts({ type, price, availableDate, turn }))
        if (errorCourt) {
            alert('error al crear cancha')
        }
        else {
            setShow(false)
        }
    }
    return (
        <div className="Login">
            <Form>
                <Form.Group size="lg">
                    <Form.Label>Tipo de cancha</Form.Label>
                    <Form.Select
                        autoFocus
                        type="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option>Abrir para seleccionar</option>
                        <option value="aire libre"> Aire libre</option>
                        <option value="polvo de ladrillo"> Polvo de ladrillo</option>
                        <option value="techada"> Techada</option>
                    </Form.Select>

                </Form.Group>
                <Form.Group size="lg" >
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group size="lg">
                    <Form.Label>Fecha del turno </Form.Label>
                    <DataPicker setAvailableDate={setAvailableDate} availableDate={availableDate} />
                </Form.Group>

                <Form.Group size="lg">
                    <Form.Label>Horario</Form.Label>
                    <Form.Select
                        autoFocus
                        type="type"
                        value={turn}
                        onChange={(e) => setTurn(e.target.value)}
                    >
                        <option>Abrir para seleccionar</option>
                        <option value="Matutino"> Matutino</option>
                        <option value="Tarde"> Tarde</option>
                        <option value="nocturno"> Nocturno</option>
                    </Form.Select>

                </Form.Group>
                <Button block="true" size="lg" disabled={!validateForm()} onClick={handleSubmit}>
                    Aceptar
                </Button>
            </Form>
        </div>
    );
}