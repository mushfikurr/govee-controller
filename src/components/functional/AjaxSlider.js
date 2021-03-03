import { Slider } from '@material-ui/core';
import { useEffect, useState } from 'react';

export function AjaxSlider(props) {
    const [ sliderVal ] = useState(props.brightneass); 

    const renderSlider = _ => {
        if (props.isOnCooldown || props.powerState === 'off') {
            return <Slider
                defaultValue={props.brightness}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                value={sliderVal}
                onChange={props.handleBrightnessChange}
                disabled
            />
        }else{
            return <Slider
                defaultValue={props.brightness}
                value={sliderVal}
                onChange={props.handleBrightnessChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={props.min}
                max={props.max}
            />
        }
        
    }

    return (
        <>
            { renderSlider() }
        </>
    )
}