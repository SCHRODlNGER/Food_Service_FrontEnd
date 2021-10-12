import React from 'react'
import {Form, Input, Button, Divider, } from 'antd'
import { Content } from 'antd/lib/layout/layout'

import {connect} from  'react-redux'
import { User_SignIn } from '../../../redux'

import history from '../../../history'

const mapStatetoProps = (state) =>{
    return{
        errorMsg: state.UserReducer.errorMsg
    }
}

const mapDispatchtoProps = (dispatch) =>{
    return{
        login: (values)=>dispatch(User_SignIn(values))
    }
}

function Login(props) {

    const onSignUpClickHandler = ()=>{
        history.push("/signup")
    }

    return (
            <Content style ={{width : "100vw", display: "block", alignContent: "center", height: "100vh" ,textAlign : "center"}}>

                <h1> Sign In</h1>

                <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={props.login}
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
                    {props.errorMsg?<div style ={{ fontSize: "20px", color: "red", padding: "20px" }} >{props.errorMsg}</div>:null}
                    <Button type = "primary" htmlType = "submit">Submit</Button>
                </Form>

                <Divider dashed orientation = "center" style = {{ width: "50%" , fontSize: "20px"}}> OR </Divider>

                <Button type = "primary" onClick = {onSignUpClickHandler} >Sign Up</Button>
            </Content>

    )
}

export default connect(mapStatetoProps, mapDispatchtoProps) (Login)
