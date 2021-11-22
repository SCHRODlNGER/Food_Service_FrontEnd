import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import history from '../../history'

function SignInModal(props) {
    return (
        <div>
            <Modal title = {"SignIn"} visible = {props.visible} onCancel = {()=>history.push("/signup")} onOk = {()=>history.push("/signin")} okText = "SignIn" cancelText = "SignUp" okType = "default" can>
                <p>Not Signed In! Login Now</p>
            </Modal>
        </div>
    )
}

export default SignInModal
