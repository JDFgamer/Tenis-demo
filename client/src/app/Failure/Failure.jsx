import axios from 'axios'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function Congrats() {
    const navigate = useNavigate()
    useEffect(() => {
        window.localStorage.clear('court')
        return
    }, [])

    function handleRedirect() {
        navigate('/')
    }

    return (
        <div className='container'>
            <Card>
                <Card.Header>Tuvimos un problema</Card.Header>
                <Card.Body>
                    <Card.Title>ups... tuvimos un problema en tomar la reserva</Card.Title>
                    <Card.Text>
                        Tuvimos un error al procesar tu pago. recorda que podes acercarte y pagar en nuestra local
                    </Card.Text>
                    <Button variant="danger" onClick={handleRedirect} >Volver</Button>
                </Card.Body>
            </Card>
        </div>
    );
}