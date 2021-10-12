import React from 'react'
import {Button, Menu } from 'antd'
import NavItem from './NavItem';
import CartIcon from "../../../assets/shopping-cart.png"
import history from '../../../history'
import {connect} from 'react-redux'

import {User_Signout} from '../../../redux/userAccount/userAccountAction'

const mapStatetoProps = (state)=>{
    return{
        isSignedIn : state.UserReducer.isSignedIn
    }
}

const mapDispatchtoProps = (dispatch)=>{
    return {
        signoutHandler: ()=>dispatch(User_Signout())
    }
}


function Navbar(props) {

    console.log(props.isSignedIn)
    const onAccountHandler = ()=>{

        if(props.isSignedIn)
            history.push("/account")
        else
            history.push("/signin")

    }

    const CartHandler = ()=>{
        history.push("/cart")
    }

    const HomeRouting = ()=>{
        history.push("/")
    }

    

    return (
        
            <Menu   style={{ width: "max-width" ,display: "flex", justifyContent: "space-between"}}
                    mode  = "horizontal">

                <Menu.Item key = "name" onClick = {HomeRouting}>
                    <h2>Deepika Store</h2>
                </Menu.Item>

                <NavItem name = {"Link1"} key = {1} />
                <NavItem name = {"Link2"} key = {2} />
                <NavItem name = {"Link3"} key = {3} />
                <NavItem name = {"Link4"} key = {4} />

                
                <Menu.Item key = "userAccount">
                    <Button type = "primary" onClick = {onAccountHandler}>
                        { props.isSignedIn ? "Profile": "SignIn"} 
                    </Button>
                </Menu.Item>
                
                {props.isSignedIn? <Menu.Item key = "SignOut">
                    <Button type = "default" style ={{color : "red"}} onClick = {props.signoutHandler}>
                        SignOut 
                    </Button>
                </Menu.Item>: null

                }


                <Menu.Item key = "cart" onClick = {CartHandler}>
                        <img src = {CartIcon} />
                </Menu.Item>
            </Menu>
        
    )
}

export default connect(mapStatetoProps,mapDispatchtoProps ) (Navbar)
