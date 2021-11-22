import React from 'react'
import { useState } from 'react';
import { Card } from 'antd';
const { Meta } = Card;
function RestaurantItem(props) {
    const [selected, setselected] = useState(false)
    return (
        <Card   hoverable 
                style = {{width: 240, display :'inline-block', padding: "20px", backgroundColor: selected?"green":""}} 
                cover = {<img src = {props.imageUrl} /> }  onClick = {()=>{
                                                                            setselected(!selected)
                                                                            props.manageRestaurant(props.name)
                                                                            }}  >
                <Meta title = {props.name} />
        </Card>
    )
}

export default RestaurantItem
