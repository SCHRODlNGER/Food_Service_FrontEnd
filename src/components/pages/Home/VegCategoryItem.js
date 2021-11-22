import React from 'react'
import { Card } from 'antd';
import { useState } from 'react';
const { Meta } = Card;
function VegCategoryItem(props) {
    const [selected, setselected] = useState(false)

    return (
        <Card   hoverable 
                style = {{width: 240, display :'inline-block', padding: "20px",backgroundColor: selected?"green":"" }}  
                onClick = {()=>{ setselected(!selected); props.manageCategory(props.type) }} >
                <Meta title = {props.type} />
        </Card>
    )
}

export default VegCategoryItem
