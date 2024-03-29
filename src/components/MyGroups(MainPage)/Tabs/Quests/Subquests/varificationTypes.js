import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { strings } from "../../../../../localization"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function VarificationTypes(props) {
  const classes = useStyles();

  const [type, setType] = React.useState(props.typename);

  const handleChange = event => {
    setType(event.target.value);
    props.type(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{strings.type}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={handleChange}
        >
          <MenuItem value="NONE">{strings.none}</MenuItem>
          <MenuItem value="TEXT">{strings.text}</MenuItem>
          <MenuItem value="IMAGE">{strings.image}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}