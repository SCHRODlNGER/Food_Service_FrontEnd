import axios from 'axios'
import {Base64} from 'js-base64'
let baseURL;


baseURL = "http://localhost:8080"
    
axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

const auth = axios.create({
    baseURL: baseURL
})





export default{
    getUser: function (userid){
        return auth.get('/authenticate/user',)
    },
    
    // Log the user in
    login: function(username, password) {
        const creds = Base64.encode(`${username}:${password}`)

        auth.defaults.headers.common["Authorization"] = `Basic ${creds}`

        auth.defaults.timeout = 5000
        return auth.post('/authenticate/login');
    },
    // New user registration
    signup: function(UserData) {

        const creds = Base64.encode(`${UserData.username}:${UserData.password}`)

        auth.defaults.headers.common["Authorization"] = `Basic ${creds}`

        auth.defaults.timeout = 5000

        const {username, password, ...remData} = UserData

        let requestBody = {
            ...remData 
        }
        requestBody = JSON.stringify(requestBody)

        return auth.post('/authenticate/signup', requestBody, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}

