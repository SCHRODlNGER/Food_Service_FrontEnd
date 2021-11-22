import React from 'react'
import {Button, Menu } from 'antd'
import NavItem from './NavItem';
import CartIcon from "../../../assets/shopping-cart.png"
import history from '../../../history'
import {connect} from 'react-redux'

import {User_Signout} from '../../../redux/userAccount/userAccountAction'

const mapStatetoProps = (state)=>{
    return{
        isSignedIn : state.UserAuthReducer.isSignedIn
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
            history.push("/user")
        else
            history.push("/signin")

    }

    const CartHandler = ()=>{
        history.push("/cart")
    }

    const HomeRouting = ()=>{
        history.push("/")
    }

    const UserAccountRouter = ()=>{
        history.push("/user")
    }

    
    

    return (
        
            <Menu   style={{ width: "max-width" ,display: "flex", justifyContent: "space-between"}}
                    mode  = "horizontal">

                <Menu.Item key = "name" onClick = {HomeRouting}>
                    <h2>Restro Store</h2>
                </Menu.Item>

                <NavItem name = {"Home"} key = {1} route = "/" />
                <NavItem name = {"All Recipes"} key = {2} route = "/recipes" />
                <NavItem name = {"Orders"} key = {3} route = "/orders" />

                
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
