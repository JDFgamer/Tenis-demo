import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourtsAdmin } from '../../redux/actions/actions.jsx'
import NavBar from './components/headers/NavBar'
function Admin() {
    const dispatch = useDispatch();
    const courtsList = useSelector(state => state.listCourtsAdmin)
    useEffect(() => {
        dispatch(getAllCourtsAdmin())
    }, [])
    return (
        <>
            <NavBar />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipos</th>
                        <th>Precios</th>
                        <th>Fecha de reserba</th>
                        <th>turno</th>
                    </tr>
                </thead>
                {courtsList && courtsList.map((court) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{court.id}</td>
                                <td>{court.type}</td>
                                <td>{court.price}</td>
                                <td>{court.availableDate}</td>
                                <td>{court.turn}</td>
                            </tr>
                        </tbody>
                    )
                })}

            </Table>
        </>
    );
}

export default Admin;