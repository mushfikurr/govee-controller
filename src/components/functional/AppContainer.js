import { Container, Box, Typography, Grid, makeStyles } from '@material-ui/core';
import { DeviceController } from '../DeviceController';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    panelHeadings: {
        fontSize: "1.2rem"
    },
    centerVertical: {
        display: 'flex', 
        alignItems: 'center',
    }
}));

export function AppContainer(props) {
    const classes = useStyles();

    return (
        <Container className={classes.container} fluid>
            <Grid container spacing={5}>
                <Grid xs={8} item>
                    <DeviceController />
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.panelHeadings} variant='overline' element='h2'>
                        <Box color="text.secondary">SETTINGS</Box>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}