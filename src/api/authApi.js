import axios from 'axios'
import {Base64} from 'js-base64'
import sha256 from '../utils/hashPassword';
let baseURL;


const REACT_APP_AUTHENTICATION_SERVICE_PORT = process.env["REACT_APP_AUTHENTICATION_SERVICE_PORT"] !== undefined ? process.env["REACT_APP_AUTHENTICATION_SERVICE_PORT"] : 7000

baseURL = `http://localhost:${REACT_APP_AUTHENTICATION_SERVICE_PORT}`
    
const auth = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})





export default{
    getUser: function (userid){
        return auth.get('/authenticate/user',)
    },
    
    // Log the user in
    login: function(username, password) {

        
        const creds = Base64.encode(`${username}:${password}`)

        auth.defaults.headers.common["Authorization"] = `Basic ${creds}`

        console.log(creds)

        auth.defaults.timeout = 5000
        return auth.post('/authenticate');
    },


    // New user registration
    signup: function(UserData) {


        
        let requestBody = {
            ...UserData ,
        }

        console.log(requestBody)

        requestBody = JSON.stringify(requestBody)


        return auth.post('/signup', requestBody, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

