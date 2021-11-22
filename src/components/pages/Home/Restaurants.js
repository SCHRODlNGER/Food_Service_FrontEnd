import React from 'react'
import { useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { addRestaurant } from '../../../redux'
import RestaurantItem from './RestaurantItem'

function Restaurants(props) {

    const dispatch = useDispatch()
    const manageRestaurantFilter = useCallback((name)=>dispatch(addRestaurant(name)), [dispatch])

    const Restaurantitems = props.restaurant.map( item=>
        <RestaurantItem name = {item.name} imageUrl = {item.imageUrl} key = {item.id} manageRestaurant = {manageRestaurantFilter} />
    )
    
    return (
        <div>
            {Restaurantitems}
        </div>
    )
}

export default Restaurants
