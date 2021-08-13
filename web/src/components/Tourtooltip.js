import React, {useState} from 'react'
import styled from "styled-components"

const ToolTipBox = styled.div`
min-height:100px;
width:400px;
background:#272727;
color:#fff;
padding:20px;
`;

const ToolTipBoxContent = styled.div`
width:100%;
height:100%;
`;

const NavigationButton = styled.button`
padding:10px;
border:1px solid #fff;
margin:5px;
width:100px;
`;


const Tourtooltip = ({  current, content, totalSteps, gotoStep, close }) => {


  return (
<ToolTipBox>
    <ToolTipBoxContent>
        { content }
    </ToolTipBoxContent>

    {(current >=1 ) && <NavigationButton onClick={()=> gotoStep(current-1)} >previous</NavigationButton> }
      {(current < (totalSteps -1)) && <NavigationButton onClick={
        ()=> gotoStep(current+1)} >
        {!!current ?"next": "start"}
      </NavigationButton>}
      <NavigationButton onClick={()=> close() }>skip</NavigationButton>

</ToolTipBox>
  )
}

 Tourtooltip.displayName = ' Tourtooltip'

export default  Tourtooltip;
