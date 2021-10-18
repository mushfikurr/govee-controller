import { Slider } from '@material-ui/core';
import { useEffect, useState } from 'react';

export function AjaxSlider(props) {
    const [ sliderVal, setSliderVal ] = useState(props.brightness); 

    const handleCommit = (_, newValue) => {
        props.onValueChange(newValue);
    }

    const handleChange = (_, newValue) => {
        setSliderVal(newValue);
    }

    const renderSlider = _ => {
        if (props.isOnCooldown || props.powerState === 'off') {
            return <Slider
                defaultValue={sliderVal}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                value={sliderVal}
                disabled
            />
        }else{
            return <Slider
                defaultValue={sliderVal}
                value={sliderVal}
                onChange={handleChange}
                onChangeCommitted={handleCommit}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={props.min}
                max={props.max}
            />
        }
        
    }

    return (<>{ renderSlider() }</>)
}