import axios from "axios"

import Cookies from "js-cookie";    

const REACT_APP_COMMON_SERVICE_PORT = process.env["REACT_APP_COMMON_SERVICE_PORT"] !== undefined ? process.env["REACT_APP_COMMON_SERVICE_PORT"] : 7001

const baseURL = `http://localhost:${REACT_APP_COMMON_SERVICE_PORT}`

console.log(baseURL)

const commonServiceAPI = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})



const serviceAPI = {
    
    recipes : (queryDictList = undefined)=>{
        let query = ""

        if(queryDictList!==undefined){
            for(const [key, value] of Object.entries(queryDictList)){
                query += `${key}=${value.join(',')}::`
            }
            if(query.length>0)
                query = query.substring(0, query.length - 2)
        }
        console.log(query)
        return commonServiceAPI.get("/recipes",{
            params:{
                'q': query
            }
        })

    },

    home:()=>{
        return commonServiceAPI.get("/home")
    },

    recipes_id:(recipeIdList=undefined)=>{

        let query = recipeIdList.join(",")
        return commonServiceAPI.get("/recipes", {
            params:{
                "product_id": query
            }
        })
    },

    viewUserAddresses: (token = undefined)=>{
        return commonServiceAPI.get("/address", {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
    },

    saveUserAddress:(address, token = undefined)=>{

        const requestBody = JSON.stringify(address)

        return commonServiceAPI.post("/address",requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } ,

    getUser: (token = undefined)=>{

        const AuthHeader = `Bearer ${token}`

        return commonServiceAPI.get("/user", {
            headers:{
                "Authorization": AuthHeader
            }
        })
    },

    getOrderDetails:(token = undefined)=>{
        return commonServiceAPI.get("/orders", {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
    },

    saveUserOrder:(orderInfo, token = undefined)=>{
        const  requestBody = JSON.stringify(orderInfo)

        return commonServiceAPI.post("/order",requestBody, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

}


export default serviceAPI

