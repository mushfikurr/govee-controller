import { useEffect, useState } from 'react';
import { getAPIAllDevicesState } from '../utils/api';
import { DeviceCurrent } from './DeviceCurrent';
import { Typography, Box, makeStyles, IconButton } from '@material-ui/core';
import { PropertyControlContainer } from './functional/PropertyControl';
import RefreshIcon from '@material-ui/icons/Refresh';

export function DeviceController() {
    const useStyles = makeStyles((theme) => ({
        dashboardSpace: {
            marginBottom: theme.spacing(3)
        },
        panelHeadings: {
            fontSize: "1.2rem"
        },
        centerVertical: {
            display: 'flex', 
            alignItems: 'center',
        }
    }));

    const classes = useStyles();
    const [devices, updateDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDevice, setCurrentDevice] = useState({});
    useEffect(() => {
        setLoading(true);
        getAPIAllDevicesState()
        .then(response => {
            const deviceListFromResponse = response.data.data.devices;
            updateDevices(deviceListFromResponse);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (devices.length > 0) {
            setCurrentDevice(devices[0]);
        }
    }, [devices]);

    const handleClick = (deviceId) => {
        const foundDevice = devices.find(obj => obj.device === deviceId);
        setCurrentDevice(foundDevice);
    }

    const renderDevicePanel = () => {
        // TODO: Move DeviceListElement
        if (Object.keys(currentDevice).length != 0)
            return <DeviceCurrent {...currentDevice} />
    }

    return (
        <>
            <Typography className={classes.panelHeadings} variant='overline' element='h2'>
                <Box className={classes.centerVertical} color="text.primary">
                    { loading === true ? <>LOADING..</> : <>DEVICES</>}
                    <IconButton style={{paddingLeft: "0.5rem", marginTop: "-2px"}}>
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Typography>
            { renderDevicePanel() }
        </>
    );
}