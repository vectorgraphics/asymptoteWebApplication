import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyle = makeStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: "2rem",
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));


function BaseSwitch(props) {
  const locClasses = useStyle()
  return (
    <Switch
      focusVisibleClassName={locClasses.focusVisible}
      disableRipple
      classes={{
        root: locClasses.root,
        switchBase: locClasses.switchBase,
        thumb: locClasses.thumb,
        track: locClasses.track,
        checked: locClasses.checked,
      }}
      {...props}
    />
  );
}

export function BinarySwitch({checked=true, ...props}) {
  const [state, setState] = useState(true);

  return (
    <FormGroup>
      <FormControlLabel
        label="switch value"
        control={
          <BaseSwitch checked={checked} name="on&off" onChange={(event) => setState(!state)}/>
        }
      />
    </FormGroup>
  );
}
