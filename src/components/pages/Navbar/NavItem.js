import React from 'react'
import {Menu } from 'antd'
import history from '../../../history'

function NavItem(props) {
    return (
        <Menu.Item key = {props.key} onClick = {()=> history.push(props.route) }>
                <span>{props.name}</span>
        </Menu.Item>
    )
}

export default NavItem
