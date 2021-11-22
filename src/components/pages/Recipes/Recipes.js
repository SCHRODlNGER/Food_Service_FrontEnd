import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { getRecipeByFilter, cleanupFilter, AddProduct, RemoveProduct } from '../../../redux'

import { useEffect } from 'react'
import RecipeItem from './RecipeItem'

const mapStatetoProps = (state)=>{
    return{
        recipes: state.CommonReducer.recipes,
        totalCount: state.CommonReducer.totalCount,
        error: state.CommonReducer.error,
        restaurants: state.CommonReducer.restaurants,
        vegCategories : state.CommonReducer.vegCategories
    }
}

const mapDispatchtoProps = (dispatch)=>{
    return{
        getRecipeDetails: (restaurants, vegCategories)=>dispatch(getRecipeByFilter(restaurants, vegCategories)),
        cleanup : ()=>dispatch(cleanupFilter()),
        manageCartItems: (type = "ADD", productId, price)=>{
            if(type === "ADD")
                dispatch(AddProduct(productId, price))
            else
                dispatch(RemoveProduct(productId, price))
        }
    }
}


function Recipes(props) {

    useEffect(() => {
        props.getRecipeDetails(props.restaurants, props.vegCategories);
    }, [])




    return (
        <div>
            {(props.error || props.recipes === null ) ?
                    <div style ={{ fontSize: "20px", color: "red", padding: "20px" }} >{props.error}</div>:
                    props.recipes.map((item, index) =>{
                        return <RecipeItem key = {item.id} id = {item.id} imageUrl = {item.imageUrl} name = {item.name} price = {item.price} restaurant = {item.restaurant.name} vegCategory = {item.vegCategory.type} >
                            <Button onClick = {() => props.manageCartItems("ADD", item.id, item.price)} > Add </Button>
                            <Button onClick = {() => props.manageCartItems("REM", item.id, item.price)}> Remove </Button>
                        </RecipeItem>
                    } )    
            }
            <p>Total Recipes Found: {props.totalCount}</p>

        </div>
    )
}

export default  connect(mapStatetoProps, mapDispatchtoProps) (Recipes)
