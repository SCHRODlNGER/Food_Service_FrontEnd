import React from 'react'
import { Card } from 'antd'
const {Meta} = Card;

function RecipeItem(props) {
    return (
        <Card   hoverable 
                style = {{width: 240, display :'inline-block', padding: "20px"}} 
                cover = {<img src = {props.imageUrl} /> }  >
                <Meta title = {props.name} description = {props.price} />
                <p> Restaurant: {props.restaurant} </p>
                <p> Category: {props.vegCategory} </p>
                {props.children}
        </Card>
    )
}

export default RecipeItem
