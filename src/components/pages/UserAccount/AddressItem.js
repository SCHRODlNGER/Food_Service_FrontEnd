import { Descriptions, Card } from 'antd'
import { useState } from 'react'
import React from 'react'

function AddressItem(props) {

    return (

        <Card key = {props.key} style = {{backgroundColor: (props.selectable && props.selected_address == props.address.id)?"green":""}} onClick = {()=>{
            props.selectHandler(props.address.id)
        }} >
            <Descriptions key = {props.key}  >
                <Descriptions.Item label = "Address" > {props.address.address} </Descriptions.Item>
                <Descriptions.Item label = "Phone" > {props.address.phone} </Descriptions.Item>
                <Descriptions.Item label = "Zipcode" > {props.address.zipcode} </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default AddressItem
