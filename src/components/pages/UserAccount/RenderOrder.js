import React from 'react'
import RecipeItem from '../Recipes/RecipeItem'

import AddressItem from './AddressItem'
function RenderOrder(props) {
    return (
        <div style ={{backgroundColor: "slategrey"}} >
            <div>
                <p>Order Delivered to</p>
                <AddressItem address = {props.orderInfo.addressInfo} ></AddressItem>
            </div>
            
            <div>
                {
                    props.orderInfo.recipeList.map(item => <RecipeItem style = {{padding: "10px"}} key = {item.id} id = {item.id} imageUrl = {item.imageUrl} name = {item.name} price = {item.price} restaurant = {item.restaurant.name} vegCategory = {item.vegCategory.type} />)
                }
            </div>

        </div>
    )
}

export default RenderOrder
