import React from 'react'
import {Menu } from 'antd'

function NavItem(props) {
    return (
        <Menu.Item key = {props.key} >
                <span>{props.name}</span>
        </Menu.Item>
    )
}

export default NavItem
