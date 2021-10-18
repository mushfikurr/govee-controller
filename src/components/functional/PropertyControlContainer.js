import { Paper, Typography, makeStyles } from "@material-ui/core";
import { AjaxSlider } from "./AjaxSlider";

const useStyles = makeStyles((theme) => ({
  paperContent: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
  },
}));

function BrightnessControl(props) {
  const classes = useStyles();

  return (
    <div className={classes.paperContent}>
      <Typography variant="h6">Brightness</Typography>
      <AjaxSlider
        onValueChange={props.onBrightnessChange}
        min={10}
        max={100}
        isOnCooldown={props.isOnCooldown}
        brightness={props.brightness}
        powerState={props.powerState}
      />
    </div>
  );
}

export function PropertyControlContainer(props) {
  return (
    <Paper>
      {props.currentProperty == "Brightness" && (
        <BrightnessControl {...props} />
      )}
    </Paper>
  );
}
