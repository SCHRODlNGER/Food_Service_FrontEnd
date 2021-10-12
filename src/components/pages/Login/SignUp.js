import React from 'react'
import {Form, Input, Button, Divider, } from 'antd'
import { Content } from 'antd/lib/layout/layout'

import history from '../../../history'
import {connect} from 'react-redux'

import { User_SignUp } from '../../../redux'

const mapStatetoProps = (state) =>{
    return{
        errorMsg: state.UserReducer.errorMsg
    }
}


const mapDispatchtoProps = (dispatch)=>{
    return{
        signUpHandler: (values)=>{
            
            return dispatch(User_SignUp(values))}
    }
}

function SignUp(props) {

   
    const onSignInClickHandler = ()=>{
        history.push("/signin")
    }

    return (
        <Content style ={{width : "100vw", display: "block", alignContent: "center", height: "100vh" ,textAlign : "center"}}>

                <h1> Sign Up</h1>

                <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={props.signUpHandler}
                style = {{maxWidth: "50%", margin: "auto"}}
                
                >

                    <Form.Item 
                        label = "UserName"
                        name = "username"
                        required= {true}
                    >
                        <Input  />
                    </Form.Item>
                    
                    <Form.Item
                    label = "Password"
                    name = "password"
                    required= {true}>
                        <Input type = "password" />
                    </Form.Item>
                    
                    <Form.Item
                    label = "First Name"
                    name = "firstname"
                    required= {true}>
                        <Input  />
                    </Form.Item>
                    
                    <Form.Item
                    label = "LastName"
                    name = "lastname"
                    required= {true}>
                        <Input  />
                    </Form.Item>

                    <Form.Item
                    label = "Email Id"
                    name = "emailId"
                    required= {true}>
                        <Input type = "email" />
                    </Form.Item>

                    {props.errorMsg?<div style ={{ fontSize: "20px", color: "red", padding: "20px" }} >{props.errorMsg}</div>:null}

                    <Button type = "primary" htmlType = "submit">Submit</Button>
                </Form>

                <Divider dashed orientation = "center" style = {{ width: "50%" , fontSize: "20px"}}> OR </Divider>

                <Button type = "primary" onClick = {onSignInClickHandler} >Sign In</Button>
            </Content>
    )
}

export default connect(mapStatetoProps, mapDispatchtoProps) (SignUp)
