import React from 'react';
import Logo from "./TweelonLogo.png";

function TweelonLogo({ size = '100px' }) { 
    return <img src={Logo} style={{ width: size, height: size }} alt="Tweelon Logo"/>
};

export default TweelonLogo;
