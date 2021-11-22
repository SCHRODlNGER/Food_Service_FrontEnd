import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import SignInModal from "../../modals/SignInModal"
import { getUserOrders, orderDetailsCleanup } from '../../../redux'
import RenderOrder from './RenderOrder'

function Orders() {

    const isSignedIn = useSelector(state=>state.UserAuthReducer.isSignedIn)

    const orderDetails = useSelector(state =>  { 
            
        return {
            OrderList: state.UserReducer.OrderList,
            OrderPrice: state.UserReducer.OrderPrice,
            OrderCount: state.UserReducer.OrderTotalCount
        }
        })
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserOrders())
        return () => {
            dispatch(orderDetailsCleanup())
        }
    }, [])

    return (
        <div>
            <h2>Orders</h2>
            {isSignedIn?null:<SignInModal visible = {true} />}
            {orderDetails.OrderList !== null ?orderDetails.OrderList.map(item=>{
                return <RenderOrder orderInfo = {item} />
            }):null}
        </div>
    )
}

export default Orders
