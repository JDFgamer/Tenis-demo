import Form from "react-bootstrap/Form";
import './style.css'

export default function DataPicker({ availableDate, setAvailableDate }) {
    function changeFilter(value) {
        setAvailableDate(value)
    }
    return (

        <div className="container">
            <Form.Group>
                <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"
                    value={availableDate}
                    onChange={(e) => changeFilter(e.target.value)}
                    className='dataPiker'
                />
            </Form.Group>
        </div>

    );
}