import { Image } from "@chakra-ui/react";
import runButtonSVG from 'images/icons/run-button.svg';
import playButtonSVG from 'images/icons/play.svg';

export const faRightPanelClose = {
  prefix: "fas",
  iconName: "right-panel-close",
  icon: [
    32,
    24,
    [],
    "f0000",
    "M30,23H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h28c1.1,0,2,0.9,2,2v19C32,22.1,31.1,23,30,23z M2,2L2,2v19h28V2H2 z M21,2h-2v19h2V2z"
  ]
};

export const faRightPanelOpen = {
  prefix: "fas",
  iconName: "right-panel-open",
  icon: [
    32,
    24,
    [],
    "f0000",
    "M30,23H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h28c1.1,0,2,0.9,2,2v19C32,22.1,31.1,23,30,23z M2,2L2,2v19h28V2H2 z M30,2H19v19h11V2z"
  ]
};

export const faInoutAddon = {
  prefix: "fas",
  iconName: "input-addon",
  icon: [
    24,
    24,
    [],
    "f0000",
    "M17.6,16.4h-1.9c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h1.9c0.3,0,0.6-0.1,0.8-0.3s0.3-0.5,0.3-0.8V4 c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.5-0.3-0.8-0.3H6.4C6.1,2.9,5.8,3,5.6,3.2C5.4,3.5,5.2,3.7,5.2,4v9.8c0,0.3,0.1,0.6,0.3,0.8 c0.2,0.2,0.5,0.3,0.8,0.3h1.9c0.4,0,0.8,0.3,0.8,0.8s-0.3,0.8-0.8,0.8H6.4c-0.7,0-1.4-0.3-1.9-0.8c-0.5-0.5-0.8-1.2-0.8-1.9V4 c0-0.7,0.3-1.4,0.8-1.9C5,1.7,5.7,1.4,6.4,1.4h11.2c0.7,0,1.4,0.3,1.9,0.8C20,2.7,20.2,3.3,20.2,4v9.8c0,0.7-0.3,1.4-0.8,1.9 S18.3,16.4,17.6,16.4z M16.3,10.5l-3.8-3.8c-0.3-0.3-0.8-0.3-1.1,0l-3.8,3.8c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l2.5-2.5 v12.7c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8V9.1l2.5,2.5c0.2,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C16.6,11.3,16.6,10.8,16.3,10.5z"
  ]
};

export const RunButton = (props) => {
  return <Image src={runButtonSVG} {...props} />;
}

export const PlayButton = (props) => {
  return <Image src={playButtonSVG} {...props} />;
}
