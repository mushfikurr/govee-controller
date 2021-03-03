import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval'
import { dispatchAPICommand, getAPIDeviceState } from '../utils/api';
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
        // console.log(device);
        getAPIDeviceState(device)
        .then(response => {
            const deviceData = response.data.data;
            // console.log(response.data.data);
            updateAllProperties(deviceData.properties);
            setLoading(false);
            setMounted(true);
        })
    }, []);

    // Handles polling
    const [pollingRate, setPollingRate] = useState(5000);
    const [shouldPoll, setShouldPoll] = useState(false);
    useInterval(() =>{
        if (shouldPoll) {
            getAPIDeviceState(device)
            .then(response => {
                
                    if (hasMounted && !isOnCooldown && !loading) {
                        const deviceData = response.data.data;
                        updateAllProperties(deviceData.properties);
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

    // Toggle Power
    const newPowerState = powerState === "on" ? "off" : "on";
    const handlePower = _ => {if (!isOnCooldown) updatePowerState(newPowerState);}
    useEffect(() => {
        if (hasMounted && !isOnCooldown) {
            setLoading(true);
            // Send PUT request to server to update with current state
            const command = {"name": "turn", "value": powerState}
            dispatchAPICommand(command, device)
            .then(response => {
                if (response.data.message === "Success") {
                    updatePowerState(powerState);
                    setLoading(false);
                    setIsOnCooldown(true);
                    let cooldownTimer = setTimeout(() => {
                        setIsOnCooldown(false);
                    }, 800);
                    return () => {
                        clearTimeout(cooldownTimer);
                    }
                }
            });
        }
    }, [powerState])

    const handleBrightnessChange = (event, newValue) => {
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
                    updateBrightness(brightness);
                    setLoading(false);
                    setIsOnCooldown(true);
                    let cooldownTimer = setTimeout(() => {
                        setIsOnCooldown(false);
                    }, 800);
                    return () => {
                        clearTimeout(cooldownTimer);
                    }
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