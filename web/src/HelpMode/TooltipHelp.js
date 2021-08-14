import React, { useState, useEffect } from "react";
import "./Tooltip.css";

const TooltipHelp = ({ children, delay, content, direction, show, stopHover }) => {
  let timeout;
  const [active, setActive] = useState(!!show);

  const showTip = () => {
    if (!show){
      return
    }
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  useEffect(() => {
    setActive(show);
  }, [show]);

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || "top"}`}>
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};

export default TooltipHelp;
