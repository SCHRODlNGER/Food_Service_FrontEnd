import React from 'react'
import { connect } from 'react-redux'
import {getHomeData, cleanupFilter} from "../../../redux"
import { useEffect } from 'react'
import Restaurants from './Restaurants'
import VegCategories from './VegCategories'
import { Button } from 'react-bootstrap'
import history from '../../../history'

const mapStatetoProps = (state)=>{
    return{
        homeDetails: state.CommonReducer.homeDetails,
        error: state.CommonReducer.error
    }
}

const mapDispatchtoProps = (dispatch)=>{
    return{
        getHomeDetails: ()=>dispatch(getHomeData()),
        cleanup : ()=>dispatch(cleanupFilter()),
    }
}

function Home(props) {

    useEffect(() => {
        props.getHomeDetails()
        props.cleanup()
    }, [])

    const searchHandler = ()=>{
        history.push("/recipes")
    }
    
    return (
        <div>
            <h1>Home</h1>
            {props.homeDetails != null? <React.Fragment>
                                            <h2>Select Restaurants</h2>
                                            <Restaurants restaurant = {props.homeDetails.restaurants} />
                                            <VegCategories vegCategories = {props.homeDetails.vegCategories}/>
                                            <Button onClick = {searchHandler} > Search </Button>
                                        </React.Fragment>: <p>Home Details</p>}
            {(props.error || props.homeDetails === null)? <div style ={{ fontSize: "20px", color: "red", padding: "20px" }} >Error: {props.error}</div>: null}

        </div>
    )
}

export default connect(mapStatetoProps, mapDispatchtoProps) (Home)
