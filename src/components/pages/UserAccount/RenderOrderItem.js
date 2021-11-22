import React from 'react'
import AddressItem from './AddressItem'

function RenderOrderItem(props) {
    return (
        <div>
            <div>
                <p>Order Delivered to</p>
                <AddressItem address = {props.orderInfo.addressInfo} ></AddressItem>
            </div>
        </div>
    )
}

export default RenderOrderItem
