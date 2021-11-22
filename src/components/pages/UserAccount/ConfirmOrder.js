import { Button } from 'antd'
import React from 'react'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../../history'
import { makeOrderCleanup } from '../../../redux'
import RenderOrder from './RenderOrder'

function ConfirmOrder() {

    const confirmedOrder = useSelector(state=> state.UserReducer.confirmedOrder)
    const error = useSelector(state=>state.UserReducer.error)
    const dispatch = useDispatch()

    useEffect(() => {
        
        return () => {
            dispatch(makeOrderCleanup())
        }
    }, [])

    return (
        <div>
            {confirmedOrder === null || error? <div style ={{ fontSize: "20px", color: "red", padding: "20px" }} > Error: {error}</div> : <React.Fragment> 
                <RenderOrder orderInfo = {confirmedOrder.OrderInfo} /> 
            <p style ={{color: "green"}} > Successfully placed Order </p> 
                 </React.Fragment> }
            
            <Button onClick = {()=>history.push("/")} > Close </Button> 
        </div>
    )
}

export default ConfirmOrder
