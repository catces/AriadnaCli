import {
    GET_ALL_USERS,
    PUT_STATUS,
    GET_DEPARTMENTS,
    GET_MUNICIPALITIES,
    CLEAN_UP_DETAILS,
    GET_USER
} from './variables';
import axios from "axios";
import Swal from "sweetalert2";

export let getALLUsers = () => {
    try {
        return async function (dispatch) {
            const response = await axios
            .get('/givemeall')
            .catch(() => alert(`Algo salió mal. Por favor verifica su solicitud.`));
            if(response) {
                const userList = response.map((x) => x);
                dispatch({ type: GET_ALL_USERS, payload: userList });
            }
        }
    } catch (error) {
        console.log(error)
    }
};

export const loginUser = (user) => async(dispatch)=>{
    try{
        return await axios.post('/auth/login',user)
            .then(async ({data})=>{
                if(data.error){
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.error,
                        })
                }else{
                    await Swal.fire({
                        title: `Bienvenido ${user.mail}`,
                        text: 'Puedes acceder a tu perfil en la barra de navegación o registrar un nuevo usuario',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    return dispatch({
                        type: GET_USER,
                        payload: data.userLoged
                    })
                }
            })
    }
    catch(error){
        console.log(error);
    }
};

export const userLoged = (status) => {
    return async function (dispatch) {
        dispatch({
            type: PUT_STATUS,
            payload: status
        })
    }
}

export const registerUser = (user) => async()=>{
    await axios.post('/auth/register',user)
        .then(({data})=>{
            if(typeof data !== 'object') {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error,
                })
            } else {
                return Swal.fire(
                    '¡Bien!',
                    `Usuario registrado exitosamente`,
                    'success'
                )
            }
        }
    )
}

export const getAllDepartments = () => {
    return async function (dispatch) {
        const response = await axios
        .get(`https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento`)
        .catch(() => alert(`Algo salió mal. Por favor intenta nuevamente.`));
            if(response.data[0]) {
                const departmentList = response.data.map((x) => x.departamento);
                dispatch({ type: GET_DEPARTMENTS, payload: departmentList });
            }
    }
};

export const getMunicipalityByDepartment = (department) => {
    return async function (dispatch) {
        const response = await axios
        .get(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}&$select=municipio&$order=municipio`)
        .catch(() => alert(`Algo salió mal. Quizás "${department}" no es un nombre válido. Por favor intenta nuevamente.`));
            if(response.data[0]) {
                const municipalList = response.data.map((x) => x.municipio);
                dispatch({ type: GET_MUNICIPALITIES, payload: municipalList });
            }
    }
};

export const cleanUpStateDetails = () => {
    return { type: CLEAN_UP_DETAILS, payload: {} };
};