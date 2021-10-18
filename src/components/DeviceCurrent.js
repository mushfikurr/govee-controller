import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval'
import { dispatchAPICommand, getAPIDeviceState, getInstructionIndex } from '../utils/api';
import { CurrentDeviceElement } from './functional/DeviceCurrentElement';

export function DeviceCurrent(device) {
    // Device
    const [online, updateOnline] = useState(true);
    const [powerState, updatePowerState] = useState("off");
    const [brightness, updateBrightness] = useState(100);
    const [color, updateColor] = useState(JSON.stringify({'color':{'r':0,'b':0,'g':0}}));
    const [loading, setLoading] = useState(true);
    const [hasMounted, setMounted] = useState(false);

    const updateAllProperties = (properties) => {
        updateOnline(properties[0].online);
        updatePowerState(properties[1].powerState);
        updateBrightness(properties[2].brightness);
        updateColor(JSON.stringify(properties[3].color));
    }

    // On component load
    useEffect(() => {
        setLoading(true);
        getAPIDeviceState(device)
        .then(response => {
            const deviceData = response.data.data;
            updateAllProperties(deviceData.properties);
            console.log(deviceData);
            setLoading(false);
            setMounted(true);
        })
    }, []);

    // Polling + Cooldown - This helps the UI stay in sync with the smart device. 
    // When an action is performed, the UI is put in a state of, 'cooldown', where the user will not be able to perform any actions.
    // An expected value is put into state, and the client will poll the API for the expected value.
    // Only after the expected value is found will the cooldown be released.
    // This helps the UI stay in sync with the smart device.
    // Decreasing the pollingRate leads to faster detection of change in state.

    const [pollingRate, setPollingRate] = useState(500);
    const [shouldPoll, setShouldPoll] = useState(false);
    const [expectedValue, setExpectedValue] = useState([]); 
    useInterval(() =>{
        if (shouldPoll) { 
            console.log("Polling..")
            getAPIDeviceState(device)
            .then(response => {
                if (hasMounted) {
                    const indexToBeChecked = getInstructionIndex(expectedValue[0]);
                    const deviceData = response.data.data;
                    if (Object.values(deviceData.properties[indexToBeChecked]).includes(expectedValue[1])) {
                        console.log("Matches!")
                        setShouldPoll(false);
                        setIsOnCooldown(false);
                        updateAllProperties(deviceData.properties);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, pollingRate)

    // When individual states change (i.e. Power on)
    // Send a PUT request detailing changes to API.
    const [isOnCooldown, setIsOnCooldown] = useState(false); // Cooldown for all device instructions

    // Handling the switch of power
    const newPowerState = powerState === "on" ? "off" : "on";
    const handlePower = _ => {if (!isOnCooldown) updatePowerState(newPowerState);}

    // Fired when power is toggled
    useEffect(() => {
        if (hasMounted && !isOnCooldown) {
            setLoading(true);
            // Send PUT request to server to update with current state
            const command = {"name": "turn", "value": powerState}
            dispatchAPICommand(command, device)
            .then(response => {
                if (response.data.message === "Success") {
                    setExpectedValue(["powerState", powerState]);
                    setIsOnCooldown(true);
                    setShouldPoll(true);
                }
            });
        }
    }, [powerState])

    const handleBrightnessChange = (newValue) => {
        if (!isOnCooldown) {
            updateBrightness(newValue);
        }
    }

    useEffect(() => {
        if (hasMounted && !isOnCooldown) {
            setLoading(true);
            const command = {"name": "brightness", "value": brightness};
            dispatchAPICommand(command, device)
            .then(response => {
                if (response.data.message === "Success") {
                    setExpectedValue(["brightness", brightness]);
                    setIsOnCooldown(true);
                    setShouldPoll(true);
                }
            });
        }
    }, [brightness])

    const propsToPass = {
        deviceModel: device.model, deviceName: device.name,
        onPower: handlePower, onBrightnessChange: handleBrightnessChange,
        isOnCooldown: isOnCooldown,
        powerState: powerState, brightness: brightness, color: color, warmth: 0
    }

    return ( <CurrentDeviceElement {...propsToPass} /> )
}