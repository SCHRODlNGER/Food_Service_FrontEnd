import {HANDE_SIGNOUT,
        HANDLE_SIGNIN,
        HANDLE_SIGNIN_ERROR,
        HANDLE_SIGNUP_ERROR,
        HANDLE_SIGNUP} from "./userAccountType";

import AuthAPI from '../../api/authApi'

import log from 'loglevel'
import history from "../../history";

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
            if(response.data.signIn){
                log.info("Authenticated")
                history.replace("/")
                dispatch({
                    type: HANDLE_SIGNIN,
                    payload: {
                        userid: response.data.userid
                    }
                })
            }
            else
                throw "signinError"
        }
        catch{
            log.info(`[ERROR]: SignIn error`)
            dispatch({
                type: HANDLE_SIGNIN_ERROR,
                payload: "SignIn Error"
            })
        }

    }
};

export const User_Signout = ()=>{
    log.info(`[Action]: SignOut api called`)
    return{
            type: HANDE_SIGNOUT,
        }
}

export const User_SignUp = (UserData)=>{
    log.info(`[Action]: SignUp api called with value= ${JSON.stringify(UserData)}`)


    return async (dispatch)=>{

        const response = await AuthAPI.signup(UserData).catch(err=>{
            log.info(`Authentication Failed, Error: ${err.message}`)
            dispatch({
                type: HANDLE_SIGNUP_ERROR
            })
        })

        try{
            if(response.data.status == 200){
                history.replace("/")
                dispatch({
                    type: HANDLE_SIGNUP,
                    status: response.data.status,
                    payload: {
                        userid: response.data.userid
                    }
                })
            }
            else
                throw "SignUpError"
        }
        catch{
            log.info(`[ERROR]: SignUp error`)
            dispatch({
                type: HANDLE_SIGNUP_ERROR,
                payload: "SignUp Error"
            })
        }

    }

}