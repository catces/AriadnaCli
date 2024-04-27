import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';

export default function NavBar() {

	const isLoged =  useSelector(state => state.isLoged);
	
	return (
			<React.Fragment>
				<nav className='navbar'>
					<ul>
						<li><NavLink to = { '' }>Home</NavLink></li>
						{
							isLoged === true
							?
							<li><NavLink to = { '/profile' }>Perfil / Cerrar Sesión</NavLink></li>
							:
							<li><NavLink to = { '/login-register' }>Iniciar Sesión / Registrarse</NavLink></li>
						}
						<li><NavLink to = { '/about' }>About</NavLink></li>
					</ul>
				</nav>
			</React.Fragment>
		)
}