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
          <p><b><span>Administrator</span></b></p>

          <p><b><span>Account
Management </span></b></p>

          <p ><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span >Resetting your password</span></u></p>

          <p ><span>To change the password for your account when you’re
          already logged in, click “Settings” in the menu on the left or on your account
          photo at the top of the dashboard. Enter the new password and then confirm it.
          After clicking the “Save changes” button, your password will be automatically
updated.</span></p>

          <p><span >·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Managing your email address</span></u></p>

          <p><span>To view or change your email address:</span></p>

          <p><span>1)<span
          >&nbsp;&nbsp;&nbsp; </span></span><span>Click
          “Settings” in the menu on the left or on your account photo at the top of the
dashboard.</span></p>

          <p><span
          >2)<span
          >&nbsp;&nbsp;&nbsp; </span></span><span>In
          the “E-Mail” field change the email address and click the “Save changes”
button.</span></p>

          <p><span
          >3)<span
          >&nbsp;&nbsp;&nbsp; </span></span><span>You’ll
be prompted to enter your password to confirm the changes.</span></p>

          <p ><span
          >·<span
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><u><span>Email troubleshooting</span></u></p>

          <p ><span>If you’re not receiving email from us, do the
following:</span></p>

          <p ><span
          >·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>In
your account settings, check if the email address is entered correctly.</span></p>

          <p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>Check
your spam or junk filters.</span></p>

          <p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>Try
          changing your email address to the one you have access to and see if you
receive an email at that address.</span></p>

          <p><span
          >If your registered address is correct, but the message
from Questerium doesn’t arrive, contact us via </span><span><a
              href="mailto:Questerium@questerium.app"><span>Questerium@questerium.app</span></a></span><span>.
</span></p>

          <p><span>If you’re not sure which email account you signed up
with, search your email account for messages that come from </span><span><a href="mailto:Questerium@questerium.app"><span
            >Questerium@questerium.app</span></a></span><span>.</span></p>

          <p ><span >If you no longer have access to the email that you
          used to register your account and our advices didn’t help, unfortunately, we
          aren’t able to verify that you’re the owner and therefore we won’t be able to give
out login information.</span></p>

          <p ><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Account language</span></u></p>

          <p ><span>To change your account’s language, click
          “Settings” in the menu on the left or on your account photo at the top of the
dashboard. Select the right option in the “General Settings’ section.</span></p>

          <p><span >·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>The difference between administrator and
group member account</span></u></p>

          <p><span>An administrator account is basically an
          account of group owner. It gives a possibility to create, delete and edit your
          groups, quests and subquests. You can also add participants to the groups, check
          the leaderboard and confirm the quests that the participants have already
passed. </span></p>

          <p ><span>A group member’s account is significantly
          different. You can see the quests and subquests that you have to pass, give out
          different types of answers and also monitor the progress of your group and
check the leaderboard.</span></p>

          <p ><b><span>Posting</span></b></p>

          <p ><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Creating a new group</span></u></p>

          <p><span>To create a new group, you have to:</span></p>

          <p ><span
          >1)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Click the “Create a new group” button.</span></p>

          <p><span
          >2)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Enter the name of the group.</span></p>

          <p><span
          >3)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions.</span></p>

          <p ><span >Now you can edit or delete your new group
and add members to it.</span></p>

          <p><span>·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Adding new members</span></u></p>

          <p><span > To add new members to the group, you have
to:</span></p>

          <p><span>1)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Select the group.</span></p>

          <p><span
          >2)<span >&nbsp;&nbsp;&nbsp; </span></span><span>In the “Members” page, click on the button with the “+” sign
located in the lower right corner of the screen.</span></p>

          <p ><span>3)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Enter the name and the email of the participant.</span></p>

          <p><span>4)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions. </span></p>

          <p ><span >You can also delete members from the
          group. To do this, select the necessary participant from the list, click on it
and confirm the deletion.</span></p>

          <p ><span >·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span >Creating new quests </span></u></p>

          <p ><span>To create a new quest, you need to:</span></p>

          <p><span
          >1)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Select the group.</span></p>

          <p  ><span
          >2)<span >&nbsp;&nbsp;&nbsp; </span></span><span
          >Go to the “Quests” page.</span></p>

          <p  ><span
          >3)<span >&nbsp;&nbsp;&nbsp; </span></span><span
          >Click on the button with a pencil sign located in the lower right
corner of the screen.</span></p>

          <p ><span

          >4)<span>&nbsp;&nbsp;&nbsp; </span></span><span

          >Enter the name and number of points for this quest.</span></p>

          <p  ><span>5)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions.</span></p>

          <p ><span >After creating a new quest, you can edit or
delete it. Remember, deleting a quest leads to deleting all its subquests.</span></p>

          <p><span >·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Adding new subquests</span></u></p>

          <p ><span>To add a new subquest:</span></p>

          <p><span>1)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Select the group.</span></p>

          <p><span>2)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Go to the “Quests” page.</span></p>

          <p><span>3)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Create a quest for which you need to add a subquest (if there
isn’t already).</span></p>

          <p ><span>4)<span >&nbsp;&nbsp;&nbsp; </span></span><span
          >Click on the “Add new subquest” button.</span></p>

          <p><span>5)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Select the type of confirmation. </span></p>

          <p><span>6)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Enter a description of the subquest and the expected answer from
the participant.</span></p>

          <p><span>7)<span >&nbsp;&nbsp;&nbsp; </span></span><span>Confirm your actions.</span></p>

          <p><span >After creating the subquests, you can also
delete and edit them.</span></p>

          <p><span>·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span>Confirmation of the quests</span></u></p>

          <p ><span>To confirm your quests, you have to:</span></p>

          <p><span
          >1)<span>&nbsp;&nbsp;&nbsp; </span></span><span
          >Go to the “Pending quests” page in the menu on the left.</span></p>

          <p ><span>2)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Select the quest.</span></p>

          <p ><span>3)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Compare the participant’s answer with the expected answer and
click the “Confirm” button. </span></p>

          <p><span>Notifications will help you to check for
          new confirmations. To do this, just click on the bell sign at the top of the
dashboard.</span></p>

          <p ><b><span>More</span></b></p>

          <p ><span >·<span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><u><span >“Buy us coffee” button</span></u></p>

          <p ><span>If you’d like to express gratitude to us,
          then this button is for you. Here you can make any contribution for the further
development of our projects.</span></p>

          <p ><span>&nbsp;</span></p>
          <p ><span>&nbsp;</span></p>
          <p ><span>&nbsp;</span></p>
          <p ><span>&nbsp;</span></p>
          <p ><span>&nbsp;</span></p>


        </Container>
      </Paper>
    </main>
  );
}