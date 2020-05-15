import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getLocalStorage } from "../../../../Cookie"
import { path } from "../../../consts"
import SubmitAnswer from "./submitAnswer"
import SubmitAnswerPhoto from "./submitAnswerPhoto"
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { strings } from "../../../../localization"
import useInterval from 'react-useinterval';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  margin: {
    marginTop: theme.spacing(2),
  },
}));

export default function SubquestStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const groupId = getLocalStorage("groupID");

  const [valuesSubQuests, setValuesSubQuests] = useState([]);

  const [progress, setProgress] = useState({
    prog: 0,
    length: 0,
    result: 0,
  });

  const [progressLast, setProgressLast] = useState({
    prog: 0,
    length: 0,
    result: 0,
  });

  const submitNone = async (id) => {

    let token = getLocalStorage("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({ "subquestId": id, "answer": "" });


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${path}groups/${groupId}/submit`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    handleNext();
  }

  const refresh = () => {
    setProgressLast(progress);
    console.log("refreshhhhhh.......");
  }

  const fetchAllQuests = async () => {

    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    await fetch(`${path}participants/${getLocalStorage("id")}/progress/${props.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("all subquests: ")
        console.log(result);
        setValuesSubQuests(result.subquests);
        setProgress({ ...progress, prog: result.progress, length: result.subquests.length, result: result.percentage * 100 });
        if ((result.progress ^ 0) === result.progress) {
          setActiveStep(result.progress);
        } else {
          setActiveStep(Math.floor(result.progress));
        }
      })
      .catch(error => console.log('error', error));
  }

  useInterval(fetchAllQuests, 15000);

  useEffect(() => {
    fetchAllQuests();

  }, [props.id, progressLast]);

  return (
      <ExpansionPanel expanded={expanded === 'panel' + (props.count + 1)} onChange={handleChange('panel' + (props.count + 1))}>

        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >

          <Grid container direction="column" spacing={1}>
          <Grid item>
          <Typography variant="h6" component="h2" className={classes.heading}>{props.title}</Typography>
          </Grid>
            <Grid item >
              <Typography variant="h6" component="h2">
                {strings.progress}  {progress.result > 100 ? 100 : Math.floor(progress.result)} %
          </Typography>
            </Grid>
            <Grid item >
            <LinearProgress variant="determinate" value={progress.result > 100 ? 100 : progress.result} />
            </Grid>
          </Grid>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

          <Stepper activeStep={activeStep} orientation="vertical">
            {valuesSubQuests.map((item, index) => (
              <Step key={item.id}>
                <StepLabel>
                  {`${strings.quest} ${index + 1}`}
                  {index <= activeStep && <Typography>{`${strings.description} ${item.desc}`}</Typography>}
                </StepLabel>
                <StepContent>

                  <Typography color="primary">{`${strings.typeOfVarification}: ${item.verificationType}`}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      
                      {item.verificationType === "TEXT" ? (
                        <SubmitAnswer disabled={!((progress.prog ^ 0) === progress.prog)} className={classes.button} subquestId={item.id} groupId={groupId} refresh={()=> refresh()} />
                      ) : (
                          item.verificationType === "IMAGE" ? (
                            <SubmitAnswerPhoto className={classes.button} disabled={!((progress.prog ^ 0) === progress.prog)} subquestId={item.id} groupId={groupId} refresh={()=> refresh()} />
                          ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={item.verificationType === "NONE" ? () => submitNone(item.id) : () => handleNext()}
                                className={classes.button}
                              >
                                {activeStep === valuesSubQuests.length - 1 ? 'Finish' : 'Next'}
                              </Button>
                            )
                        )}
                      {
                        (activeStep < Math.floor(progress)) && (item.verificationType !== "NONE") ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === valuesSubQuests.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                        ) : (
                            <div></div>
                          )
                      }
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

        </ExpansionPanelDetails>

      </ExpansionPanel>
  );
}