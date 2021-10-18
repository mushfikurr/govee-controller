import {
  Paper,
  Card,
  Box,
  Typography,
  Grid,
  makeStyles,
  Link,
} from "@material-ui/core";
import { useState } from "react";
import { AjaxPowerSwitch } from "./AjaxPowerSwitch";
import { AjaxSlider } from "./AjaxSlider";
import { PropertyControlContainer } from "./PropertyControl";

const useStyles = makeStyles((theme) => ({
  paperContent: {
    margin: theme.spacing(2),
  },
  switch: {
    flexGrow: 1,
  },
  propertyStyle: {
    padding: theme.spacing(1),
  },
  deviceCard: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: 0,
  },
  cardSelected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  deviceCardGrid: {
    marginTop: theme.spacing(-1.5),
  },
  dashboardSpace: {
    marginBottom: theme.spacing(3),
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function PropertyCard(props) {
  // PROPS
  // @ propertyName
  // @ propertyValue
  const classes = useStyles();

  const renderCard = (_) => {
    if (props.currentProperty == props.propertyName) {
      return (
        <Card
          className={`${classes.propertyStyle} ${classes.cardSelected}`}
          color="primary"
          variant="outlined"
          hoverable
        >
          <Box>
            <Typography variant="subtitle1" element="h5">
              {props.propertyName}
            </Typography>
          </Box>
          <Typography element="p">{props.propertyValue}</Typography>
        </Card>
      );
    } else {
      return (
        <Card
          className={classes.propertyStyle}
          variant="outlined"
          hoverable="true"
        >
          <Box color="text.secondary">
            <Typography variant="subtitle1" element="h5">
              {props.propertyName}
            </Typography>
          </Box>
          <Typography element="p">{props.propertyValue}</Typography>
        </Card>
      );
    }
  };

  return (
    <Link
      onClick={() => {
        props.handlePropertyClick(props.propertyName);
      }}
      style={{ textDecoration: "none" }}
    >
      {renderCard()}
    </Link>
  );
}

function PropertyCardContainer(props) {
  return (
    <>
      <Grid item>
        <PropertyCard
          propertyName={"Brightness"}
          currentProperty={props.currentProperty}
          handlePropertyClick={props.handlePropertyClick}
          propertyValue={props.brightness}
        />
      </Grid>
      <Grid item>
        <PropertyCard
          propertyName={"Colour"}
          currentProperty={props.currentProperty}
          handlePropertyClick={props.handlePropertyClick}
          propertyValue={props.color}
        />
      </Grid>
      <Grid item>
        <PropertyCard
          propertyName={"Colour Warmth"}
          currentProperty={props.currentProperty}
          handlePropertyClick={props.handlePropertyClick}
          propertyValue={0}
        />
      </Grid>
    </>
  );
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
    <>
      <Paper>
        <div className={classes.paperContent}>
          <Grid
            container
            className={classes.switch}
            justify="space-between"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4" element="h4">
                <strong>{props.deviceModel}</strong> {props.deviceName}
              </Typography>
            </Grid>
            <Grid item>
              <AjaxPowerSwitch
                onChange={props.onPower}
                isOnCooldown={props.isOnCooldown}
                powerState={props.powerState}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <PropertyCardContainer
              brightness={props.brightness}
              color={props.color}
              handlePropertyClick={props.handlePropertyClick}
              currentProperty={props.currentProperty}
            />
          </Grid>
          <br></br>
        </div>
      </Paper>

      <PropertyControlContainer {...props} />
    </>
  );
}
