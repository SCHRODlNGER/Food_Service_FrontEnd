import FormItem from 'antd/lib/form/FormItem'
import React from 'react'
import { saveUserAddress } from '../../../redux'
import history from '../../../history'
import { connect } from 'react-redux'

import {Form, Input, Button, Divider, } from 'antd'
import { Content } from 'antd/lib/layout/layout'

const mapStatetoProps = (state)=>{
    return{
        errorMsg: state.UserReducer.error,
    }
}

const mapDispatchtoProps = (dispatch)=>{
    return{
        saveAddress: (address)=>dispatch(saveUserAddress(address))
    }
}


function SaveAddress(props) {

    const viewUserDetails = ()=>{
        history.push("/user")
    }

    return (
        <Content style ={{width : "100vw", display: "block", alignContent: "center", height: "100vh" ,textAlign : "center"}}>

                <h1> Add Address</h1>

                <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={props.saveAddress}
                style = {{maxWidth: "50%", margin: "auto"}}
                
                >

                    <Form.Item 
                        label = "Address"
                        name = "address"
                        required= {true}
                    >
                        <Input  />
                    </Form.Item>
                    
                    <Form.Item
                    label = "Phone"
                    name = "phone"
                    required= {true}>
                        <Input />
                    </Form.Item>

                    <FormItem label = "Zipcode" name = "zipcode" required = {true}>
                        <Input />
                    </FormItem>

                    {props.errorMsg?<div style ={{ fontSize: "20px", color: "red", padding: "20px" }} >{props.errorMsg}</div>:null}
                    <Button type = "primary" htmlType = "submit">Submit</Button>
                
                </Form>

                <Divider dashed orientation = "center" style = {{ width: "50%" , fontSize: "20px"}}> OR </Divider>

                <Button type = "primary" onClick = {viewUserDetails} >User Details</Button>
            </Content>
    )
}

export default connect(mapStatetoProps, mapDispatchtoProps) (SaveAddress)
