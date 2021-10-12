import React from 'react'

import {useSelector, useDispatch} from 'react-redux'


function UserAccount() {

    const userid = useSelector(state => state.UserReducer.userid)

    const [userData, setuserData] = useState({})

    useEffect(() => {
        
        function userData(){
            let response = null
        }

        return () => {
            cleanup
        }
    }, [input])

    return (
        <div>
            <h2>User Account</h2>
        </div>
    )
}

export default UserAccount
