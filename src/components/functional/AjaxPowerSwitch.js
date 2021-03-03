import { Switch } from '@material-ui/core';

export function AjaxPowerSwitch(props) {
    // props: isOnCooldown, powerState, onChange

    const renderSwitch = _ => {
        if (props.isOnCooldown) {
            return <Switch checked={ props.powerState === 'on' ? true : false }
                onChange={props.onChange}
                color='primary'
                name="Power"
                disabled>{ props.powerState }
            </Switch>
        }else{
            return <Switch checked={ props.powerState === 'on' ? true : false }
                onChange={props.onChange}
                color='primary'
                name="Power"
                >{ props.powerState }
            </Switch>
        }
    }

    return (
        <>
            { renderSwitch() }
        </>
    )
}