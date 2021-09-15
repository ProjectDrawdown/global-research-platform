import React, {useState, useContext} from 'react'
import styled from "styled-components"
import { UserContext } from "services/user"

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
  const { user, patchUserFromAPI } = useContext(UserContext);
  const stopTour =()=>{
    patchUserFromAPI({
      ...user,
      meta: {
        ...user.meta,
        hasOnboarded: true
      }
    });
  }

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
    {(current === (totalSteps-1) )?<NavigationButton onClick={()=> close() }>finish</NavigationButton>:
    <NavigationButton onClick={()=> stopTour() }>skip tour</NavigationButton>}

</ToolTipBox>
  )
}

 Tourtooltip.displayName = ' Tourtooltip'

export default  Tourtooltip;
