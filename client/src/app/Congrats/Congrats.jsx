import axios from 'axios'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function Congrats() {
    const navigate = useNavigate()
    const reservedCourt = async () => {
        if (!window.localStorage.getItem('court')) return
        await axios.get(`${process.env.REACT_APP_URL}/api/court/courtreserved/${window.localStorage.getItem('court')}`,
            {
                headers: {
                    'x-access-token': window.localStorage.getItem('login'),
                    'Content-Type': 'application/json'
                }
            })
    }
    useEffect(() => {
        if (window.localStorage.getItem('login')) {
            reservedCourt()
            window.localStorage.removeItem('court')
            return
        }
        return
    }, [])

    function handleRedirect() {
        navigate('/')
    }

    return (
        <div className='container'>
            <Card>
                <Card.Header>Gracias por tu reserva</Card.Header>
                <Card.Body>
                    <Card.Title>Te esperamos el dia de la reserva</Card.Title>
                    <Card.Text>
                        Tu reserva fue realizada con exito, te esperamos el dia de la fecha
                        recorda que entre todos debemos cuidarnos y tomar prevencion contra el covid-19
                    </Card.Text>
                    <Button variant="success" onClick={handleRedirect} >Volver</Button>
                </Card.Body>
            </Card>
        </div>
    );
}