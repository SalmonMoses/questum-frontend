import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getCookie } from "../../../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { path } from "../../../consts"
import Divider from "@material-ui/core/Divider"
import SubmitAnswer from "./submitAnswer"
import SubmitAnswerPhoto from "./submitAnswerPhoto"
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

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
  }
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

  let history = useHistory();

  const id = history.location.pathname.slice(12);
  console.log(id);

  const groupId = getCookie("groupID");

  const [valuesSubQuests, setValuesSubQuests] = useState([]);

  const [progress, setProgress] = useState({
    prog: 0,
    length: 0,
    result: 0,
  });

  const submitNone = async (id) => {

    let token = getCookie("token");
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

  useEffect(() => {

    const fetchAllQuests = async () => {

      let token = getCookie("token");

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");

      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };

      await fetch(`${path}participants/${getCookie("id")}/progress/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("all subquests: ")
          console.log(result);
          setValuesSubQuests(result.subquests);
          setProgress({ ...progress, prog: result.progress, length: result.subquests.length, result: result.progress * 100 / result.subquests.length });
          if ((result.progress ^ 0) === result.progress) {
            setActiveStep(result.progress);
          } else {
            setActiveStep(Math.floor(result.progress));
          }
        })
        .catch(error => console.log('error', error));
    }
    fetchAllQuests();
  }, [id]);

  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={1}>
        <Grid item >
          <Typography variant="h6" component="h2">
            Progress:
          </Typography>
        </Grid>
        <Grid item >
          <Typography variant="h6" component="h2">
            {progress.result > 100 ? 100 : progress.result} %
          </Typography>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={progress.result > 100 ? 100 : progress.result} />
      <Divider className={classes.margin} />
      <Stepper activeStep={activeStep} orientation="vertical">
        {valuesSubQuests.map((item, index) => (
          <Step key={item.id}>
            <StepLabel>
              {`Subquest ${index + 1}`}
              {index <= activeStep && <Typography>{`Описание: ${item.desc}`}</Typography>}
            </StepLabel>
            <StepContent>

              <Typography color="primary">{`Тип подтверждения: ${item.verificationType}`}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button> */}
                  {item.verificationType === "TEXT" ? (
                    <SubmitAnswer disabled={!((progress ^ 0) === progress)} className={classes.button} subquestId={item.id} groupId={groupId} />
                  ) : (
                      item.verificationType === "IMAGE" ? (
                        <SubmitAnswerPhoto className={classes.button} disabled={!((progress ^ 0) === progress)} subquestId={item.id} groupId={groupId} />
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
      {activeStep === valuesSubQuests.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}