import React from 'react'

import { useState, useEffect, useCallback } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'

import { getUserAddress, selectAddress } from '../../../redux'
import AddressItem from './AddressItem'

function Address(props) {

    const addressList = useSelector(state => state.UserReducer.addresses)
    const selectedAddress = useSelector(state=> state.CartReducer.address_id)
    const error = useSelector(state=>state.UserReducer.error)
    const dispatch = useDispatch()

    const getAddress = useCallback(
        () => {
            dispatch(getUserAddress())
        },
        [dispatch],
    )

    const selectAdd = useCallback(
        (id)=>{
            if(props.selectable){
                dispatch(selectAddress(id))}
        }
    )
    

    useEffect(() => {
        getAddress()
    }, [])

    return (
        <div>
            <h1>Address</h1>
            {error || addressList == null?<div style ={{ fontSize: "20px", color: "red", padding: "20px" }} >{props.errorMsg}</div>:addressList.map((item, index)=>{
            return <AddressItem address = {item} key = {index} selectHandler = {selectAdd} selected_address = {selectedAddress} selectable = {props.selectable} />
        })}
        </div>
    )
}

export default   Address
