import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { getCookie } from "../../../../Cookie"
import { path } from "../../../consts"
import { useSnackbar } from 'notistack';

export default function SubmitAnswerPhoto(props) {

    const [values, setValues] = useState({
        answer: "",
    });

    const { enqueueSnackbar } = useSnackbar();

    const sendPhoto = async (e) => {
        var myHeaders = new Headers();
        let token = getCookie("token");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var formdata = new FormData();
        formdata.append("answer", e.target.files[0], "im_on_a_horse.jpg");

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${path}groups/${props.groupId}/submit?verification_id=${props.subquestId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <Button variant="contained" color="primary" onClick={sendPhoto} >
            Send an photo
        </Button>
    );
}