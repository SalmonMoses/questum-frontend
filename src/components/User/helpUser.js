import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage} from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
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
    enqueueSnackbar(strings.sessionTimeout, {
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
        <p><b><span>Group Member</span></b></p>

<p><b><span>Account
            Management </span></b></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><u><span>Resetting your password</span></u></p>

<p><span>To change the password for your account when you’re
        already logged in, click “Settings” in the menu on the left or on the gear sign
        at the top of the dashboard. Enter the new password and then confirm it. After
        clicking the “Save changes” button, your password will be automatically
        updated.</span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><u><span>Managing your email address</span></u></p>

<p><span>To view or change your email address:</span></p>

<p><span>4)<span>&nbsp;&nbsp;&nbsp; </span></span><span>Click
        “Settings” in the menu on the left or on the gear sign at the top of the
        dashboard.</span></p>

<p><span>5)<span>&nbsp;&nbsp;&nbsp; </span></span><span>In
        the “E-Mail” field change the email address and click the “Save changes”
        button.</span></p>

<p><span>6)<span>&nbsp;&nbsp;&nbsp; </span></span><span>You’ll
        be prompted to enter your password to confirm the changes.</span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><u><span>Email troubleshooting</span></u></p>

<p><span>If you’re not receiving email from us, do the
        following:</span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>In
        your account settings, check if the email address is entered correctly.</span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>Check
        your spam or junk filters.</span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>Try
        changing your email address to the one you have access to and see if you
        receive an email at that address.</span></p>

<p><span>If your registered address is correct, but the message
        from Questerium doesn’t arrive, contact us via </span><span ><a
            ><span >Questerium@questerium.app</span></a></span><span>.
    </span></p>

<p><span>If you’re not sure which email account you signed up
        with, search your email account for messages that come from </span><span ><a
            ><span
                >Questerium@questerium.app</span></a></span><span>.</span></p>

<p><span>If you no longer have access to the email that you
        used to register your account and our advices didn’t help, unfortunately, we
        aren’t able to verify that you’re the owner and therefore we won’t give out
        login information.</span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><u><span>Account language</span></u></p>

<p><span>To change your account’s language, click
        “Settings” in the menu on the left or on </span><span>the gear sign <span>at the top of the
            dashboard. Select the right option in the
            “General Settings’ section.</span></span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><u><span>The difference between administrator and
            group member account</span></u></p>

<p><span>An administrator account is basically an
        account of group owner. It gives a possibility to create, delete and edit your
        groups, quests and subquests. You can also add participants to the groups,
        check the leaderboard and confirm the quests that the participants have already
        passed. </span></p>

<p><span>A group member’s account is significantly
        different. You can see the quests and subquests that you have to pass, give out
        different types of answers and also monitor the progress of your group and
        check the leaderboard.</span></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><u><span>Deleting your account</span></u></p>

<p><span>Before do anything, please be aware that
        deletion cannot be undone. Once you delete your content, its contents are gone
        forever. </span></p>

<p><span>To delete your entire account, go to the
        “Profile” page in the menu on the left and click the “Delete my account” button
        at the bottom of the page. </span></p>

<p><b><span>Quests</span></b></p>

<p><span>You can monitor the progress of the quests
        in the “Quests” page in the menu on the left. In also displays the subquests
        that you’ve already passed or which are waiting for your confirmation. Sunquest
        confirmation is the way for group administrator to understand that you’ve
        successfully completed the subquest and ready for new tasks. Depending on the
        type of confirmation, you can send text of photo answers. There’re also subquests
        that don’t require any confirmation. To send your answer, enter it in the
        special field and click on the send button. Then wait for the result from your
        administrator and be ready to move on. Good luck!</span></p>

<p><b><span>More</span></b></p>

<p><span>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><u><span>“Buy us coffee” button</span></u></p>

<p><span>If you’d like to express gratitude to us,
        then this button is for you. Here you can make any contribution for the further
        development of our projects.</span></p>

<p><span>&nbsp;</span></p>

<p><span>&nbsp;</span></p>
        </Container>
      </Paper>
    </main>
  );
}