import React from 'react'
import { connect } from 'react-redux'
import { addVegCategory } from '../../../redux'
import VegCategoryItem from './VegCategoryItem'

const mapStatetoProps = (state)=>{
    return{
        vegCategories : state.CommonReducer.homeDetails.vegCategories
    }
}

const mapDispatchtoProps = (dispatch)=>{
    return{
        manageCategory : (name) => dispatch(addVegCategory(name))
    }
}

function VegCategories(props) {

    const VegCategoryitems = props.vegCategories.map( item=>{
        return <VegCategoryItem type = {item.type} key = {item.id} manageCategory = {props.manageCategory} />
    }
    )
    
    return (
        <div>
            <p>Veg Categories</p>
            {VegCategoryitems}
        </div>
    )
}

export default connect(mapStatetoProps, mapDispatchtoProps) (VegCategories)
