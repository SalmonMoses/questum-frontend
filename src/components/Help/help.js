import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage } from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { strings } from "../../localization"

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: theme.spacing(100),
    marginTop: theme.spacing(0),
    [theme.breakpoints.up('xs')]: {
      paddingRight: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(0),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(4),
    },
    // paddingRight: theme.spacing(4),
    // paddingTop: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  content: {
    [theme.breakpoints.up('xs')]: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  },
  cont: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
    },
  },
  area: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(40),
  },
  area1: {
    width: theme.spacing(37),
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  area3: {
    height: theme.spacing(10)
  }
}));

export default function Help() {

  let history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  let cookie = getLocalStorage("refreshToken");

  if (cookie === undefined) {
    history.push("/login/owner");
    enqueueSnackbar("Время сессии истекло, войдите заново.", {
      variant: 'error',
    });
  }

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>
          <Typography variant="h2">
            {strings.helpPage}
          </Typography>
          <Divider />
          <Typography variant="h4" align="center"><span>Administrator</span></Typography>

          <Typography variant="h5" align="center"><span>Account
Management </span></Typography>

          <Typography variant="body1" ><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span >Resetting your password</span></u></Typography>

          <Typography variant="body1" ><span>To change the password for your account when you’re
          already logged in, click “Settings” in the menu on the left or on your account
          photo at the top of the dashboard. Enter the new password and then confirm it.
          After clicking the “Save changes” button, your password will be automatically
updated.</span></Typography>

          <Typography variant="body1"><span >·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Managing your email address</span></u></Typography>

          <Typography variant="body1"><span>To view or change your email address:</span></Typography>

          <Typography variant="body1"><span>1)<span
          >&nbsp;&nbsp;&nbsp; </span></span><span>Click
          “Settings” in the menu on the left or on your account photo at the top of the
dashboard.</span></Typography>

          <Typography variant="body1"><span
          >2)<span
          >&nbsp;&nbsp;&nbsp; </span></span><span>In
          the “E-Mail” field change the email address and click the “Save changes”
button.</span></Typography>

          <Typography variant="body1"><span
          >3)<span
          >&nbsp;&nbsp;&nbsp; </span></span><span>You’ll
be prompted to enter your password to confirm the changes.</span></Typography>

          <Typography variant="body1" ><span
          >·<span
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><u><span>Email troubleshooting</span></u></Typography>

          <Typography variant="body1" ><span>If you’re not receiving email from us, do the
following:</span></Typography>

          <Typography variant="body1" ><span
          >·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>In
your account settings, check if the email address is entered correctly.</span></Typography>

          <Typography variant="body1"><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>Check
your spam or junk filters.</span></Typography>

          <Typography variant="body1"><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>Try
          changing your email address to the one you have access to and see if you
receive an email at that address.</span></Typography>

          <Typography variant="body1"><span
          >If your registered address is correct, but the message
from Questerium doesn’t arrive, contact us via </span><span><a
              href="mailto:Questerium@questerium.app"><span>Questerium@questerium.app</span></a></span><span>.
</span></Typography>

          <Typography variant="body1"><span>If you’re not sure which email account you signed up
with, search your email account for messages that come from </span><span><a href="mailto:Questerium@questerium.app"><span
            >Questerium@questerium.app</span></a></span><span>.</span></Typography>

          <Typography variant="body1" ><span >If you no longer have access to the email that you
          used to register your account and our advices didn’t help, unfortunately, we
          aren’t able to verify that you’re the owner and therefore we won’t be able to give
out login information.</span></Typography>

          <Typography variant="body1" ><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Account language</span></u></Typography>

          <Typography variant="body1" ><span>To change your account’s language, click
          “Settings” in the menu on the left or on your account photo at the top of the
dashboard. Select the right option in the “General Settings’ section.</span></Typography>

          <Typography variant="body1"><span >·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>The difference between administrator and
group member account</span></u></Typography>

          <Typography variant="body1"><span>An administrator account is basically an
          account of group owner. It gives a possibility to create, delete and edit your
          groups, quests and subquests. You can also add participants to the groups, check
          the leaderboard and confirm the quests that the participants have already
passed. </span></Typography>

          <Typography variant="body1" ><span>A group member’s account is significantly
          different. You can see the quests and subquests that you have to pass, give out
          different types of answers and also monitor the progress of your group and
check the leaderboard.</span></Typography>

          <Typography variant="h5" align="center"><b><span>Posting</span></b></Typography>

          <Typography variant="body1" ><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Creating a new group</span></u></Typography>

          <Typography variant="body1"><span>To create a new group, you have to:</span></Typography>

          <Typography variant="body1" ><span
          >1)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Click the “Create a new group” button.</span></Typography>

          <Typography variant="body1"><span
          >2)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Enter the name of the group.</span></Typography>

          <Typography variant="body1"><span
          >3)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions.</span></Typography>

          <Typography variant="body1" ><span >Now you can edit or delete your new group
and add members to it.</span></Typography>

          <Typography variant="body1"><span>·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Adding new members</span></u></Typography>

          <Typography variant="body1"><span > To add new members to the group, you have
to:</span></Typography>

          <Typography variant="body1"><span>1)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Select the group.</span></Typography>

          <Typography variant="body1"><span
          >2)<span >&nbsp;&nbsp;&nbsp; </span></span><span>In the “Members” page, click on the button with the “+” sign
located in the lower right corner of the screen.</span></Typography>

          <Typography variant="body1" ><span>3)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Enter the name and the email of the participant.</span></Typography>

          <Typography variant="body1"><span>4)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions. </span></Typography>

          <Typography variant="body1" ><span >You can also delete members from the
          group. To do this, select the necessary participant from the list, click on it
and confirm the deletion.</span></Typography>

          <Typography variant="body1" ><span >·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span >Creating new quests </span></u></Typography>

          <Typography variant="body1" ><span>To create a new quest, you need to:</span></Typography>

          <Typography variant="body1"><span
          >1)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Select the group.</span></Typography>

          <Typography variant="body1"  ><span
          >2)<span >&nbsp;&nbsp;&nbsp; </span></span><span
          >Go to the “Quests” page.</span></Typography>

          <Typography variant="body1"  ><span
          >3)<span >&nbsp;&nbsp;&nbsp; </span></span><span
          >Click on the button with a pencil sign located in the lower right
corner of the screen.</span></Typography>

          <Typography variant="body1" ><span

          >4)<span>&nbsp;&nbsp;&nbsp; </span></span><span

          >Enter the name and number of points for this quest.</span></Typography>

          <Typography variant="body1"  ><span>5)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions.</span></Typography>

          <Typography variant="body1" ><span >After creating a new quest, you can edit or
delete it. Remember, deleting a quest leads to deleting all its subquests.</span></Typography>

          <Typography variant="body1"><span >·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Adding new subquests</span></u></Typography>

          <Typography variant="body1" ><span>To add a new subquest:</span></Typography>

          <Typography variant="body1"><span>1)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Select the group.</span></Typography>

          <Typography variant="body1"><span>2)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Go to the “Quests” page.</span></Typography>

          <Typography variant="body1"><span>3)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Create a quest for which you need to add a subquest (if there
isn’t already).</span></Typography>

          <Typography variant="body1" ><span>4)<span >&nbsp;&nbsp;&nbsp; </span></span><span
          >Click on the “Add new subquest” button.</span></Typography>

          <Typography variant="body1"><span>5)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Select the type of confirmation. </span></Typography>

          <Typography variant="body1"><span>6)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Enter a description of the subquest and the expected answer from
the participant.</span></Typography>

          <Typography variant="body1"><span>7)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions.</span></Typography>

          <Typography variant="body1"><span >After creating the subquests, you can also
delete and edit them.</span></Typography>

          <Typography variant="body1"><span>·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Confirmation of the quests</span></u></Typography>

          <Typography variant="body1" ><span>To confirm your quests, you have to:</span></Typography>

          <Typography variant="body1"><span
          >1)<span>&nbsp;&nbsp;&nbsp; </span></span><span
          >Go to the “Pending quests” page in the menu on the left.</span></Typography>

          <Typography variant="body1" ><span>2)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Select the quest.</span></Typography>

          <Typography variant="body1" ><span>3)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Compare the participant’s answer with the expected answer and
click the “Confirm” button. </span></Typography>

          <Typography variant="body1"><span>Notifications will help you to check for
          new confirmations. To do this, just click on the bell sign at the top of the
dashboard.</span></Typography>

          <Typography variant="h5" align="center"><b><span>More</span></b></Typography>

          <Typography variant="body1" ><span >·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span >“Buy us coffee” button</span></u></Typography>

          <Typography variant="body1" ><span>If you’d like to express gratitude to us,
          then this button is for you. Here you can make any contribution for the further
development of our projects.</span></Typography>

          <Typography variant="body1" ><span>&nbsp;</span></Typography>
          <Typography variant="body1" ><span>&nbsp;</span></Typography>
          <Typography variant="body1" ><span>&nbsp;</span></Typography>
          <Typography variant="body1" ><span>&nbsp;</span></Typography>
          <Typography variant="body1" ><span>&nbsp;</span></Typography>


        </Container>
      </Paper>
    </main>
  );
}