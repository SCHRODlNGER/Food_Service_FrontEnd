import { Button } from 'antd'
import React from 'react'

import { useEffect } from 'react'

import {useSelector, useDispatch} from 'react-redux'
import serviceAPI from '../../../api/service_api'

import history from '../../../history'

import {getUserDetails} from "../../../redux"
import Address from './Address'


function UserAccount() {

    const userDetails = useSelector(state => state.UserReducer.userDetails)


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getUserDetails())

        return () => {
            console.log("cleanup");
        }
    }, [])

    const addAddress = ()=>{
        history.push("/saveAddress")
    }

    return (
        <div>
            <h2>User Account</h2>
            <div>
                <h3>First Name: {userDetails.firstname} </h3>
                <h3>Last Name: {userDetails.lastname} </h3>
            </div>

            <div>
                <Address></Address>
                <Button type = "primary" onClick = {addAddress} > Add Address </Button>
            </div>



        </div>
    )
}

export default UserAccount
