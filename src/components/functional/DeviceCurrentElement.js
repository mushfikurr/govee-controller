import { Paper, Card, Box, Typography, Grid, makeStyles } from '@material-ui/core';
import { AjaxPowerSwitch } from './AjaxPowerSwitch';
import { AjaxSlider } from './AjaxSlider';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(2)
    },
    switch: {
        flexGrow: 1
    },
    propertyStyle: {
        padding: theme.spacing(1),
    },
    deviceCard: {
        padding: theme.spacing(1),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingBottom: 0
    },
    deviceCardGrid: {
        marginTop: theme.spacing(-1.5)
    },
    dashboardSpace: {
        marginBottom: theme.spacing(3)
    },
    center: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent:'center'
    }
}));

function PropertyCard(props) {
    // PROPS
    // @ propertyName
    // @ propertyValue
    const classes = useStyles();
    return (
        <Card className={classes.propertyStyle} variant="outlined">
            <Box color="text.secondary"><Typography variant="subtitle1" element="h5">{ props.propertyName }</Typography></Box>
            <Typography element="p">{ props.propertyValue }</Typography>
        </Card>
    )
}

export function CurrentDeviceElement(props) {
    // @device -> The current device being displayed
    // @onPower -> Event fired when turning on and off
    // @onBrightnessChange -> Event fired when brightness changes
    // @isOnCooldown -> Global state handling cooldowns
    // @powerState
    // @brightness 
    // @color
    // @warmth

    const classes = useStyles();
    return (
        <Paper>
            <div className={classes.paperContent}>
                <Grid container className={classes.switch} justify="space-between" spacing={2}>
                    <Grid item>
                        <Typography variant='h4' element='h4'>
                            <strong>{props.deviceModel}</strong>  { props.deviceName }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <AjaxPowerSwitch onChange={props.onPower} isOnCooldown={props.isOnCooldown} powerState={props.powerState} /> 
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <PropertyCard propertyName={"Brightness"} propertyValue={props.brightness} />
                    </Grid>
                    <Grid item>
                        <PropertyCard propertyName={"Colour"} propertyValue={props.color} />
                    </Grid>
                    <Grid item>
                        <PropertyCard propertyName={"Colour Warmth"} propertyValue={0} />
                    </Grid>
                </Grid>
                <br></br>
                <Typography variant="body1">
                    Brightness
                </Typography>
                <AjaxSlider onBrightnessChange={props.onBrightnessChange} min={10} max={100} isOnCooldown={props.isOnCooldown} brightness={props.brightness} powerState={props.powerState} />
            </div>
        </Paper>
    )
}