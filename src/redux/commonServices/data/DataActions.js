import { GET_HOME_DATA, GET_HOME_DATA_ERROR, GET_RECIPE_FILTER,CLEANUP_FILTER, GET_RECIPE_FILTER_ERROR , ADD_CATEGORY, ADD_RESTAURANT} from "./DataType";

import serviceAPI from "../../../api/service_api";

import log from 'loglevel'


export const getHomeData = ()=>{
    return async (dispatch) =>{
        log.info('[Action]: Getting Home Details')

        const response = await serviceAPI.home().catch(err =>{
            log.info('Unable to Get Home Details')
            dispatch({
                type: GET_HOME_DATA_ERROR,
                payload: err.message
            })
        })

        try{
            if(response.status === 200){
                log.info("[Action]: Got Home Details")
                dispatch({
                    type: GET_HOME_DATA,
                    payload: {...response.data}
                })
            }
            else
                throw "Unable to get Home Details"
        }
        catch{
            log.info("[ERROR]: Unable to get Home Details")
            dispatch({
                type: GET_HOME_DATA_ERROR,
                payload: "Unable to get Home Details"
            })
        }

    }
}


export const getRecipeByFilter = (restaurants, vegCategories)=>{
    return async(dispatch)=>{

        log.info(`[Action]: Gettting Recipe Info by ${restaurants} and ${vegCategories}`)

        const queryDict = {}
        if(restaurants.length > 0)
            queryDict["restaurant"] = [...restaurants]
        
        if(vegCategories.length > 0)
            queryDict["veg-category"] = [...vegCategories]

        const response = await serviceAPI.recipes(queryDict).catch(err=>{
            log.info("[ERROR] Unable to get Recipe Details")
            dispatch({
                type: GET_RECIPE_FILTER_ERROR,
                payload: err.message
            })
            return
        })

        try{
            if(response.status === 200){
                log.info("[INFO] Got Recipe Details")
                dispatch({
                    type: GET_RECIPE_FILTER,
                    payload: [...response.data.recipeList],
                    totalCount: response.data.totalCount,
                })
            }
            else{
                throw "Unable to get Recipe Details"
            }
        }
        catch(err){
            log.error("Unable to get Recipe Details")
            dispatch({
                type: GET_RECIPE_FILTER_ERROR,
                payload: "Unable to get recipe Details"
            })
        }

    }
}

export const addRestaurant = (restaurantName)=>{
    return (dispatch)=>{
        log.info(`[INFO] Adding Restaurant: ${restaurantName}`)
        dispatch({
            type: ADD_RESTAURANT,
            payload: restaurantName
        })
    }
}

export const addVegCategory = (categoryName)=>{
    return (dispatch)=>{
        log.info(`[INFO] Adding Category: ${categoryName}`)
        dispatch({
            type: ADD_CATEGORY,
            payload: categoryName
        })
    }
}

export const cleanupFilter = ()=>{
    return (dispatch)=>{
        dispatch({
            type: CLEANUP_FILTER
        })
    }
}