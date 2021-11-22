import {HANDE_SIGNOUT,
        HANDLE_SIGNIN,
        HANDLE_SIGNIN_ERROR,
        HANDLE_SIGNUP_ERROR,
        HANDLE_SIGNUP, HANDLE_TOKEN_ID} from "./userAccountType";

import AuthAPI from '../../api/authApi'

import log from 'loglevel'
import history from "../../history";
import Cookies from "js-cookie";    

export const User_SignIn = (UserData) =>{
    return async (dispatch)=>{
        log.info(`[Action]: SignIn api called with value= ${UserData}`)
        
        const response = await AuthAPI.login( UserData.username, UserData.password).catch(err=>{
            log.info(`Authentication Failed, Error: ${err.message}`)
            dispatch({
                type: HANDLE_SIGNIN_ERROR,
                payload: err.message
            })
        })
        

        try{
            if(response.data.jwt){
                log.info("Authenticated")
                dispatch({
                    type: HANDLE_SIGNIN,
                    payload: {
                        firstName: response.data.firstName
                    }
                })

                Cookies.set(HANDLE_TOKEN_ID, response.data.jwt, {expires: 7});
                history.goBack()

            }
            else
                throw "signinError"
        }
        catch{
            log.info(`[ERROR]: SignIn error`)
            dispatch({
                type: HANDLE_SIGNIN_ERROR,
                payload: response.data.error
            })
        }

    }
};

export const User_Signout = ()=>{
    log.info(`[Action]: SignOut api called`)

    Cookies.remove(HANDLE_TOKEN_ID)

    return{
            type: HANDE_SIGNOUT,
        }
}

export const User_SignUp = (UserData)=>{
    log.info(`[Action]: SignUp api called with value= ${JSON.stringify(UserData)}`)

    return async (dispatch)=>{

        const response = await AuthAPI.signup(UserData).catch(err=>{
            console.log("xxxx")
            console.log(typeof(err))
            log.info(`Authentication Failed, Error: ${err.message}`)
            dispatch({
                type: HANDLE_SIGNUP_ERROR,
                payload: err.message
            })
        })

        

        if(response){
            if(response.status === 201){
                log.info(`[ACTION]: dispatch HANDLE_SIGNUP account creation status: ${response.data.account_creation_msg}`)
                dispatch({
                    type: HANDLE_SIGNUP,
                    payload : response.data.msg
                })
                history.push("/signin")
            }
            else{
                log.info(`[ACTION]: dispatch HANDLE_SIGNUP_ERROR error Message: ${response.data.msg}`)
                dispatch({
                    type: HANDLE_SIGNUP_ERROR,
                    payload : response.data.msg
                })
            }
        }

    }

}