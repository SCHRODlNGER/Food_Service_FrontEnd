import React from 'react'
import {Content} from 'antd/lib/layout/layout'
import RecipeItem from '../Recipes/RecipeItem'
import { Button } from 'antd'
import {RemoveProduct, makeOrder, selectAddressCleanup} from '../../../redux'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../../history'
import Address from '../UserAccount/Address'

function Cart() {

    const dispatch = useDispatch()

    const recipeItems = useSelector(state => state.CommonReducer.recipes)
    const selectedAddress = useSelector(state=>state.CartReducer.address_id)
    const cartItems = useSelector(state => state.CartReducer.productId, )
    const error = useSelector(state => state.CommonReducer.error)
    const isSignedIn = useSelector(state=>state.UserAuthReducer.isSignedIn)

    const RemoveCartItems = useCallback(
        (productId, price) => {
            dispatch(RemoveProduct(productId, price))
        },
        [dispatch],
    )
    
    const makeOrderHook = useCallback(
        (address_id, recipe_ids)=>{
            dispatch(makeOrder(address_id, recipe_ids))
        }
        ,[dispatch]
    )

    const OrderHandler = ()=>{
        if(isSignedIn){
                makeOrderHook(selectedAddress, cartItems);
                history.push("/confirm-order")}
        else{
            history.push("/signin")
        } 
    }

    useEffect(()=>{
        return ()=>{
            dispatch(selectAddressCleanup())
        }
    })

    return (
        <Content style ={{width : "100vw", display: "block", alignContent: "center", height: "100vh" ,textAlign : "center"}}>
            <div>
                <h3>Cart</h3>
                {error || recipeItems === null? <div style ={{ fontSize: "20px", color: "red", padding: "20px" }} > Error: {error}</div>:
                    <div>
                        {recipeItems.filter((item)=>{
                            return cartItems.includes(item.id)
                        }).map((item)=>{
                            return <RecipeItem key = {item.id} id = {item.id} imageUrl = {item.imageUrl} name = {item.name} price = {item.price} restaurant = {item.restaurant.name} vegCategory = {item.vegCategory.type} >
                                <Button onClick = {()=>RemoveCartItems(item.id, item.price)} >Remove</Button>
                            </RecipeItem>
                        })}
                        <div style ={{display: 'block', alignSelf: "center", padding: "50px"}}>
                            <Button type = "primary" onClick = {()=>OrderHandler()} > Order </Button>
                        </div>
                    </div>
                }
                {
                    cartItems.length === 0?<div style ={{ fontSize: "20px", color: "red", padding: "20px" }} > Error: Cart Empty </div>:null
                }

                {
                    isSignedIn? <Address selectable = {true} /> :null
                }

                <Button onClick = {()=>history.push("/recipes")} > Add to Cart </Button>
            </div>
        </Content>
    )
}

export default Cart
