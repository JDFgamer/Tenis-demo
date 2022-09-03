import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ListCourts({ type, availableDate, price, turn, id }) {

  async function handlePayment() {
    if (!window.localStorage.getItem('login')) {
      alert('Antes debes estar logueado 😢')
      return
    }
    await axios.get(`${process.env.REACT_APP_URL}/api/court/courtpayment/${id}`,
      {
        headers: {
          'x-access-token': window.localStorage.getItem('login'),
          'Content-Type': 'application/json'
        }
      })
      .then((result) => {
        window.location.href = result.data
      })
      .catch((err) => console.log(err))
      window.localStorage.setItem('court', id)
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://i.pinimg.com/originals/c0/55/a8/c055a8d5b5bce69b8293e9474e44de63.jpg" />
      <Card.Body>
        <Card.Title>{type}</Card.Title>
        <Card.Text>
          <p>la fecha de la reserva es: {availableDate}</p>
          <p>el horario: {turn}</p>
          <p>El precio es de: ${price}</p>
        </Card.Text>
        <Button variant="primary" onClick={handlePayment} >Reserva sin problemas</Button>
      </Card.Body>
    </Card>
  );
}

export default ListCourts;