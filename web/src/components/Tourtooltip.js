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

const [open,setOpen] = useState("open nav");

function openNav (){
  var url = window.location.href;
  var nav_url= "#nav/portfolio";
  if (url.includes(nav_url)){
    var new_link=url.replace("nav/portfolio","");
    setOpen("open nav");
    window.location.href=new_link;
  }
  else {
    var new_link=url.replace("#","")+nav_url;
    setOpen("close nav");
    window.location.href=new_link;
  }
  gotoStep(current+1);
}

  return (
<ToolTipBox>
    <ToolTipBoxContent>
        { content }
    </ToolTipBoxContent>

    {(current >=1 ) && <NavigationButton onClick={()=> gotoStep(current-1)} >previous</NavigationButton> }
      {(current < (totalSteps -1)) && <NavigationButton onClick={current == 1 ? openNav:
        ()=> gotoStep(current+1)} >
        {!!current ? current==1 ?open:"next": "start"}
      </NavigationButton>}
      <NavigationButton onClick={()=> close() }>skip</NavigationButton>

</ToolTipBox>
  )
}

 Tourtooltip.displayName = ' Tourtooltip'

export default  Tourtooltip;
