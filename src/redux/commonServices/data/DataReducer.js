import {
    ADD_CATEGORY,
    ADD_RESTAURANT,
    GET_HOME_DATA,
    GET_HOME_DATA_ERROR,
    GET_RECIPE_FILTER,
    GET_RECIPE_FILTER_ERROR,
    CLEANUP_FILTER
} from "./DataType"

import removeItemOnce from "../../../utils/RemoveValFromList";

import _ from 'lodash'

const INITIAL_STATE = {
    homeDetails: null,
    error: null,
    recipes: null,
    totalCount: null,
    restaurants :[],
    vegCategories: [],
}


let prevState;

const CommonDataReducer = (state = INITIAL_STATE, action)=>{


    switch(action.type){

        case GET_HOME_DATA:
            return {
                ...state,
                homeDetails:{
                    restaurants: [...action.payload.restaurants],
                    vegCategories: [...action.payload.vegCategories]
                },
                error: null
            }

        case GET_HOME_DATA_ERROR:
            return{
                ...state,
                homeDetails:null,
                error: action.payload
            }

        case GET_RECIPE_FILTER:
            return{
                ...state,
                recipes: [...action.payload],
                totalCount: action.totalCount,
                error: null
            }
        case GET_RECIPE_FILTER_ERROR:
            return{
                ...state,
                error: action.payload
            }

        case ADD_CATEGORY:
            prevState = {...state}
            if(prevState.vegCategories.includes(action.payload)){
                prevState.vegCategories = removeItemOnce(prevState.vegCategories, action.payload)
            }
            else{
                prevState.vegCategories.push(action.payload)
            }
            
            return{
                ...prevState
            }
        case ADD_RESTAURANT:
            prevState = {...state}
            if(prevState.restaurants.includes(action.payload)){
                prevState.restaurants = removeItemOnce(prevState.restaurants, action.payload)
            }
            else{
                prevState.restaurants.push(action.payload)
            }
            
            return{
                ...prevState
            }
        case CLEANUP_FILTER:
            return{
                ...state,
                restaurants: [],
                vegCategories: [],
            }


        default:
            return state
    }

}

export default CommonDataReducer