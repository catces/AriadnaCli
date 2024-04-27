import React, { useEffect, useState } from 'react';
import { registerUser, loginUser, getAllDepartments, getMunicipalityByDepartment, userLoged } from '../../redux/actions/actions';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import './Register.css';
import { useNavigate } from "react-router-dom";

function mailValidator (mailToTest) {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const validate = re.test(mailToTest);
    if (mailToTest.length > 0 && !validate) return 'E-mail inválido';
    return;
}

function isSomeEmpty (objectToTest) {
    const someEmpty = {};
    Object.keys(objectToTest).forEach(property => {
        if (!objectToTest[property] || objectToTest[property] === '') {
            someEmpty.title = `Todos los campos son obligatorios`
        }
    })
    return someEmpty;
}

function createUserValidator (createUserForm) {
    let createUserForbidden = {};
    createUserForbidden = isSomeEmpty (createUserForm)
    createUserForbidden.mail = mailValidator(createUserForm.mail)
    if (createUserForm.password2 !== createUserForm.password) createUserForbidden.password2 = 'Las contraseñas deben coincidir';
    return createUserForbidden;
}

function userValidator (userForm) {
    let userForbidden = {};
    userForbidden = isSomeEmpty (userForm);
    userForbidden.mail = mailValidator(userForm.mail);
    return userForbidden;
}

let createUserState = {
    mail: '',
    name: '',
    password: '',
    password2: '',
    department: '',
    municipality: '',
    streetType: '',
    streetNumber: '',
    url: '',
};


export default function Register() {
    const [ showLogin, setShowLogin ] = useState(true);
    const [ showSignUp, setShowSignUp ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ createUserForm, setCreateUserForm ] = useState(createUserState);
    const departmentList = useSelector(state  => state.departments);
    const municipalList = useSelector(state  => state.municipalities);
    const isLoged = useSelector(state => state.isLoged);
    const [ userForm, setUserForm ] = useState({
        mail: '',
        password: '',
    });
    const [ createUserForbidden, setCreateUserForbidden ] = useState({});
    const [ userForbidden, setUserForbidden ] = useState({});

    const handleClick = (e) => {
        e.preventDefault();
        setShowSignUp((showSignUp) => !showSignUp);
        setShowLogin((showLogin) => !showLogin);
        setCreateUserForm(createUserForm => createUserState);
        setUserForm({mail: '', password: ''});
    };

    function handleCreateUserFormChange (e) {
        setCreateUserForm({
            ...createUserForm,
            [e.target.name] : e.target.value,
        });
        setCreateUserForbidden(createUserValidator({
            ...createUserForm,
            [e.target.name]: e.target.value,
        }))
    };

    function handleSelectOption (e, str) {
        e.preventDefault();
        if (e.target.value !== 'disabled') {
            if (str === 'dep') {
                setCreateUserForm({
                    ...createUserForm,
                    "department": e.target.value
                });
                dispatch(getMunicipalityByDepartment(e.target.value));
            }
            if (str === 'mun') {
                setCreateUserForm({
                    ...createUserForm,
                    "municipality": e.target.value
                });
            }        
        }
    };

    function handleUserFormChange (e) {
        setUserForm({
            ...userForm,
            [e.target.name] : e.target.value
        });
        setUserForbidden(userValidator({
            ...userForm,
            [e.target.name]: e.target.value
        }))
    };

    async function handleCreateUserFormSubmit (e) {
        e.preventDefault();
        let voidForm = false;
        // for(const property in createUserForm) {
        //     if (createUserForm[property] === '') voidForm = true;
        // }
        if (createUserForm.name==='' || createUserForm.mail==='' || createUserForm.password==='' ||createUserForm.password2==='' ||createUserForm.streetType==='' || createUserForm.streetNumber==='') {
            voidForm=true
        }
        setCreateUserForbidden(createUserValidator(createUserForm))
        if(/*Object.keys(createUserForbidden).length !== 0 || */voidForm === true){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
        } else {
            const result = Swal.fire({
                title: 'Estas seguro?',
                text: "No podrás revertirlo",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No, Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Confirmar!'
            });
            if ((await result).isConfirmed) {
                dispatch(registerUser({
                    mail: createUserForm.mail,
                    password: createUserForm.password,
                    name: createUserForm.name,
                    streetType: createUserForm.streetType,
                    streetNumber: createUserForm.streetNumber,
                    department: createUserForm.department,
                    municipality: createUserForm.municipality,
                    url: `https://ui-avatars.com/api/?name=${createUserForm.name}+${createUserForm.name}?background=F0EDE5`
                }));
                setCreateUserForm({
                    mail: '',
                    password: '',
                    password2: '',
                    name: '',
                    url: ``,
                    department: '',
                    municipality: '',
                    streetType: '',
                    streetNumber: ''
                });
                navigate('/');
            }
        }
    }

    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getMunicipalityByDepartment(createUserForm.department))
    }, [getAllDepartments])

    // function handleCallbackResponse (response){
    //     // console.log("Encoded JWT ID token: " + response.credential);
    //     const googleLogin = jwt_decode(response.credential);
    //     dispatch(googleLogRes(googleLogin))
    //     // document.getElementById("signInDiv").hidden = true;
    // }

    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id: "569317957647-3eg4sjqbiotum9jak6kcc80qr0lt97gb.apps.googleusercontent.com",
    //         callback: handleCallbackResponse
    //     });

    //     google.accounts.id.renderButton(
    //         document.getElementById("signInDiv"),
    //         { theme: "outline", size: "large"}
    //     )

    //     google.accounts.id.prompt();
    // }, [showLogin])

    function handleUserFormSubmit (e) {
        e.preventDefault();
        let voidForm = false;
        if (userForm.mail === '' || userForm.password === '') voidForm = true;
        if (/*Object.keys(userForbidden).length !== 0 || */voidForm === true){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
        } else {
            dispatch(userLoged(true))
            dispatch(loginUser({
                mail: userForm.mail,
                password: userForm.password
            }))
            setShowSignUp((showSignUp) => !showSignUp);
            setShowLogin((showLogin) => !showLogin);
            setUserForm({
                mail: '',
                password: ''
            });
        }
    }
    
    if (showSignUp) {
        return (
            <div className='maxContainer'>
                <div className='container1'>
                    <div className='container2'>
                        <form className = 'registerFormBody' onSubmit={e => handleCreateUserFormSubmit (e)}>
                            <h1 className='logintittle' >Registrarse</h1>
                            <div className = 'registerElementsDiv'>
                                <div>
                                    <label>Nombre</label><br></br>
                                    <input type = 'text' name = 'name' value = {createUserForm.name} onChange={e => handleCreateUserFormChange (e)} className='inputBlank'/><br></br>
                                </div>
                                <div>
                                    <label>E-mail</label><br></br>
                                    <input type = 'mail' name = 'mail' value = {createUserForm.mail} onChange={e => handleCreateUserFormChange (e)} className='inputBlank'/><br></br>
                                </div>
                                {createUserForbidden.mail && ( <p key = 'mailError' className = "errorMessage">{createUserForbidden.mail}</p> )}
                            </div>
                            <div className = 'registerElementsDiv'>
                                <div>
                                    <label>Departamento</label><br></br>
                                    <select className = 'selectClass' onChange = {(e) => handleSelectOption(e, 'dep')}>
                                        <option /*disabled={true}*/ value="disabled">--Selecciona--</option>
                                        {
                                            departmentList.map(d  => ( <option value = {d}>{d}</option> ))
                                        }
                                        <input  type = 'text' value = {createUserForm.department} name = 'department'/>
                                    </select>
                                    <br></br>
                                </div>
                                <div>
                                    <label>Municipio</label><br></br>
                                    <select className = 'selectClass' onChange = {(e) => handleSelectOption(e, 'mun')}>
                                        <option /*disabled={true}*/ value="disabled">--Selecciona--</option>
                                        {
                                            municipalList.map(m  => ( <option value = {m}>{m}</option> ))
                                        }
                                        <input  type = 'text' value = {createUserForm.municipality} name = 'municipality'/>
                                    </select>
                                    <br></br>
                                </div>
                                <div>
                                    <label>Tipo de calle</label><br></br>
                                    <input type = 'text' name = 'streetType' value = {createUserForm.streetType} onChange={e => handleCreateUserFormChange (e)} className='inputBlank'/><br></br>
                                </div>
                                <div>
                                    <label>Nomenclatura calle</label><br></br>
                                    <input type = 'text' name = 'streetNumber' value = {createUserForm.streetNumber} onChange={e => handleCreateUserFormChange (e)} className='inputBlank'/><br></br>
                                </div>
                            </div>
                            <div className = 'registerElementsDiv'>
                                <div>
                                    <label>Contraseña</label><br></br>
                                    <input type = 'password' name = 'password' value = {createUserForm.password} onChange={e => handleCreateUserFormChange (e)} className='inputBlank'/><br></br>
                                </div>
                                <div>
                                    <label>Confirmar contraseña</label><br></br>
                                    <input type = 'password' name = 'password2' value = {createUserForm.password2} onChange={e => handleCreateUserFormChange (e)} className='inputBlank'/><br></br>
                                </div>
                            </div>
                            {createUserForbidden.password2 && ( <p key = 'passwordError' className = "errorMessage">{createUserForbidden.password2}</p> )}
                            <br></br>
                            <div className = 'registerElementsDiv'>
                            <br></br>
                                {/* {Object.entries(createUserForbidden).length === 0 ?  */}
                                <input type = 'submit' value = 'Registrarse'  onClick = { (e) => handleCreateUserFormSubmit(e) } className='inputButton'/>
                                {/* : */}
                                {/* <input type = 'submit' value = 'Registrarse'  onClick = { (e) => handleCreateUserFormSubmit(e) } className='inputButton'/>} */}
                                <br></br>
                                <label className = 'label'>¿Ya tienes cuenta?</label><br></br>
                                <input type = 'submit' value = 'Iniciar sesión' onClick = { (e) => handleClick(e) } className='inputButton'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        )
    }

    if (showLogin) {
        return (
            <div className = 'loginContainer'>
                <div className = 'loginSubContainer'>
                    <div className = 'loginFormContainer'>
                        <form className = 'loginFormBody' onSubmit={e => handleUserFormSubmit (e)}>
                            <h1 className = 'logintittle'>Iniciar sesión</h1>
                            <label>E-mail</label><br></br>
                            <input type = 'mail' name = 'mail' value = {userForm.mail} onChange={e => handleUserFormChange (e)} className='inputBlank'/><br></br>
                            {userForbidden.mail && ( <p key = 'mailError' className = "errorMessage">{userForbidden.mail}</p> )}
                            <label>Contraseña</label><br></br>
                            <input type = 'password' name = 'password' value = {userForm.password} onChange={e => handleUserFormChange (e)} className='inputBlank'/><br></br>
                            <br></br>
                            <input type = 'submit' value = 'Ingresar' onClick = { (e) => handleUserFormSubmit(e) } className = 'inputButton'/>
                            {/* <label>¿Tienes cuenta google?</label><br></br>
                            <div id = "signInDiv"></div> */}
                            <label className = 'loginLabel'>¿Aún no tienes cuenta?</label><br></br>
                            <label className = 'loginLabel'>Puedes registrarte gratis</label><br></br>
                            <input type = 'submit' value = 'Crear cuenta' onClick = { (e) => handleClick(e) } className = 'inputButton'></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

{/* ////////https://www.datos.gov.co/resource/xdk5-pm3f.json */}