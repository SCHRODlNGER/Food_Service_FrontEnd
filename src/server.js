import { Server } from "miragejs"

import {Base64} from 'js-base64'


const decodeAuth = (request)=>{

  let auth  = request.requestHeaders.Authorization
  auth = auth.split(' ')[1]
  
  auth = Base64.decode(auth)

  return {
    "username": auth.split(":")[0],
    "password": auth.split(':')[1]
  }

}

const sendUserData = (UserData)=>{
  const resp = {
    firstname: UserData.firstname,
    lastname: UserData.lastname,
    username: UserData.username,

  }
  return resp
}

export function makeServer({environment = "development"} = {}){

  const users = [
  
  ]

  let server = new Server({
    environment,
    routes(){
        this.post("/AccountHandler/authenticate/login", (schema, request)=>{
          console.log(users)
          
          const UserData = decodeAuth(request)

          if(users.some(user => user.username === UserData.username && user.password === UserData.password)){
            const resp = users.filter(user =>{
              if(user.username == UserData.username)
                return true
              return false
            })
            console.log(resp)
            return {signIn: true, userid: resp.userid }
          }
          else
            return {signIn: false}


        })
    
        this.post("/AccountHandler/authenticate/signup", (schema, request)=>{
          
          const remData = JSON.parse(request.requestBody)
          const UserData = {
            ...decodeAuth(request),
            ...remData,
            userid: users.length,
          }
          

          if(users.length >0 && users.some(user => user.username === UserData.username))
            return {status: 501}
          else{
            users.push(UserData)
            return {status: 200, userid: UserData.userid}

          }
          
        })
    }


  })

  return server;
}
