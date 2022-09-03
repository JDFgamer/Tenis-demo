import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourts } from '../../redux/actions/actions.jsx'
import ListCourts from '../../components/ListCourts/ListCourts.jsx';
import NavBar from '../NavBar/NavBar'
import './style.css'

function Home() {
    const dispatch = useDispatch();
    const courtsList = useSelector(state => state.listCourts)
    useEffect(() => {
        dispatch(getAllCourts())
    }, [])
    return (
        <div>
            <NavBar />
            <article>
                {courtsList && courtsList.map((courtList) => {
                    return (
                        <div className='container'>
                            <ListCourts
                                key={courtList.id}
                                id={courtList.id}
                                type={courtList.type}
                                availableDate={courtList.availableDate}
                                turn={courtList.turn}
                                price={courtList.price}
                            />
                        </div>
                    )
                })}
            </article>
        </div>
    )
}

export default Home