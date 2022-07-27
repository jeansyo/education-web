import Swal from "sweetalert2";

import { fetchWithoutToken } from "../utils/fetchWithoutToken";
import { fetchWithToken } from "../utils/fetchWithToken";
import { types } from "../utils/types";
import { _uiFinishChecking, _uiFinishLoading, _uiStartChecking, _uiStartLoading } from "./uiActions";

export const _authLogin = (payload) => ({
    type: types.authLogin,
    payload
})

export const _authRegister = (payload) => ({
    type: types.authRegister,
    payload
})

export const _authLogout = () => ({
    type: types.authLogout
})

export const __authLogout = () => {
    return (dispatch) => {
        localStorage.removeItem("EDU-TKN");
        dispatch(_authLogout());
    }
}

export const __authLogin = (payload, resetform) => {
    return async (dispatch) => {
        try {
            
            dispatch( _uiStartLoading() )

            const res = await fetchWithoutToken('api/login', { ...payload }, 'POST');
            const {
                api,
                user
            } = await res.json();
            
            if ( api.codeError === "200" ) {
                resetform();

                const { token, ...rest } = user;
                localStorage.setItem('EDU-TKN', token);

                dispatch( _authLogin({ ...rest }) )
            } else {
                Swal.fire({
                    title: api.msgError,
                    icon: "warning",
                    confirmButtonText: "Cerrar"
                })
            }
            

            dispatch( _uiFinishLoading() )

        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "Server error",
                text: err.message,
                icon: "error",
                confirmButtonText: "Cerrar"
            })
        }
    }
}

export const __authRegister = (payload, resetform) => {
    return async (dispatch) => {
        dispatch( _uiStartLoading() )
        try {

            const res = await fetchWithoutToken('api/register', { ...payload }, 'POST');
            const {
                api
            } = await res.json();
            
            if( api.codeError === "201" ) {
                resetform();
                Swal.fire({
                    title: api.msgError,
                    text: "Ve a la pagina de inicio para iniciar sesión",
                    icon: "success",
                    confirmButtonText: "OK"
                })
            } else {
                Swal.fire({
                    title: api.msgError,
                    icon: "warning",
                    confirmButtonText: "Cerrar"
                })
            }


        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "Server error",
                text: err.message,
                icon: "error",
                confirmButtonText: "Cerrar"
            })
        }

        dispatch(_uiFinishLoading())

    }
}

export const __authRenew = () => {
    return async (dispatch) => {

        dispatch( _uiStartChecking() )

        try {
            
            if(!localStorage.getItem('EDU-TKN')) {
                dispatch( __authLogout() )
                return dispatch( _uiFinishChecking() )
            }

            const res = await fetchWithToken("api/renew")
            const {
                api,
                user
            } = await res.json();
            
            if( api.codeError === "200" ) {
                const { token, ...rest } = user;
                localStorage.setItem('EDU-TKN', token);
                dispatch( _authLogin({ ...rest }) )
                
            } else {
                dispatch( __authLogout() )
            }


        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "Server error",
                text: err.message,
                icon: "error",
                confirmButtonText: "Cerrar"
            })
        }
        dispatch( _uiFinishChecking() )

    }
}
