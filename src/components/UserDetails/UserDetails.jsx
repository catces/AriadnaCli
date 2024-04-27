import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userLoged } from '../../redux/actions/actions';
import './UserDetails.css'; 

export default function UserDetails() {

    const dispatch = useDispatch();
    const details =  useSelector(state => state.userDetails);
    const isLoged =  useSelector(state => state.isLoged);
    const history = useNavigate();
    
    function handleButtonClick (e) {
        e.preventDefault();
        dispatch(userLoged(false));
        history('/');
    };
    
    return (
        <div className = 'container'>
            {
                Object.entries(details).length > 0
                ?
                <div className='internalContainer'>
                    <div className='leftsideContainer'>
                        <div className='leftsideElements'>
                            <div>
                                <img id='avatar' src = {`https://ui-avatars.com/api/?name=${details.name ? details.name : ' '}+${details.name ? details.name : ' '}${details.name ? '?background=F0EDE5' : ' '}`} alt='Avatar' />
                                <h1>{details.name.toUpperCase()}</h1>
                            </div>
                            <div className='detailsContainer'>
                                <span>                                        
                                    <h4>Usuario:</h4><h4>{details.mail}</h4>
                                </span>
                                <span>
                                    <h4>Departamento:</h4><h4> {details.department}</h4>
                                </span>
                                <span>
                                    <h4>Municipio:</h4><h4> {details.municipality}</h4>
                                </span>
                                <span>
                                    <h4>Dirección:</h4><h4> {`${details.streetType} ${details.streetNumber}`}</h4>
                                </span>
                            </div>
                        </div>
                        <button className='backButton' onClick={ (e) => handleButtonClick(e) }>Cerrar Sesión</button>
                    </div>
                    <div className='rightside'>
                        
                    </div>
                </div>
                :
                <div className = "overlay">
                    <div>
                        <p>Cargando detalles...</p>
                    </div>
                </div>
            }
        </div>
    )
}