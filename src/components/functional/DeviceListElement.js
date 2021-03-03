import { makeStyles, Button, Grid, Typography } from '@material-ui/core'
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';

function DeviceButton(props) {
    const useStyles = makeStyles((theme) => ({
        deviceCardGrid: {
            marginBottom: theme.spacing(3)
        }
    }));
    const classes = useStyles();

    // props: isOnCooldown, powerState, onChange, deviceName
    const deviceNameUpper = props.deviceName.toUpperCase();
    return (
        <Button color="primary" onClick={() => {props.handleClick(props.deviceId)}} variant="contained" disableElevation className={classes.deviceCard}>
            <div>
                <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
                    <Grid xs={12} item>
                        <EmojiObjectsTwoToneIcon fontSize="large"></EmojiObjectsTwoToneIcon>
                    </Grid>
                    <Grid className={classes.deviceCardGrid} xs={12} item>
                        <Typography style={{ fontSize: '1.15rem' }} variant="overline">{ deviceNameUpper }</Typography>
                    </Grid>
                </Grid>
            </div>
        </Button>
    )
}

export function DeviceListElement(props) {
    const useStyles = makeStyles((theme) => ({
        dashboardSpace: {
            marginBottom: theme.spacing(3)
        }
    }));
    const classes = useStyles();

    return (
        <Grid className={classes.dashboardSpace} spacing={2} auto container>
            <Grid item>
                { props.devices.map((device) => {return <DeviceButton key={device.device} deviceId={device.device} deviceName={device.deviceName} handleClick={props.handleClick} />}) }
            </Grid>
        </Grid>
    )
}