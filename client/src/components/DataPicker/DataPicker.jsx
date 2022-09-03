import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getFilterCourt, getAllCourts } from "../../redux/actions/actions"
import { useEffect } from "react";
import './style.css'

export default function App() {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const filterError = useSelector(state => state.errorFilter)
    function changeFilter(value) {
        setDate(value)
    }
    function handleClick(date) {
        dispatch(getFilterCourt(date))
    }
    useEffect(() => {
        if (filterError) {
            alert('no se encontro cancha para esta fecha')
            dispatch(getAllCourts())
        }
    }, [filterError])
    return (

        <div className="container">
            <Form.Group controlId="duedate">
                <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"
                    value={date}
                    onChange={(e) => changeFilter(e.target.value)}
                />
                <Button variant="primary" className="container-button"  onClick={() => handleClick(date)}>Buscar</Button>
            </Form.Group>
        </div>

    );
}