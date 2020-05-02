import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { getLocalStorage } from "../../../../Cookie"
import { path } from "../../../consts"
import { useSnackbar } from 'notistack';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Input from '@material-ui/core/Input';
import { strings } from "../../../../localization"

export default function SubmitAnswerPhoto(props) {

    const [values, setValues] = useState({
        answer: "",
        id: "",
    });

    const { enqueueSnackbar } = useSnackbar();

    const sendAnswer = async () => {
        var myHeaders = new Headers();
        let token = getLocalStorage("token");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        console.log(props.subquestId);
        var raw = JSON.stringify({ "subquestId": props.subquestId, "answer": "" });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${path}groups/${props.groupId}/submit`, requestOptions)
            .then(response =>
                response.json())
            .then(result => {
                console.log(result);
                setValues({ ...values, "id": result.id });
            })
            .catch(error => console.log('error', error));
        props.refresh();
    }

    const sendPhoto = (e) => {
        if (e.target.files.length != 1) {
            return;
        }

        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        let avatar = new FormData();
        avatar.append('answer', e.target.files[0]);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
            body: avatar
        };

        fetch(`${path}groups/${props.groupId}/submit?verification_id=${values.id}`, requestOptions)
            .then(response => response.blob())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <Input
                style={{ display: 'none' }}
                disabled={props.disabled}
                id="avatar-file-input"
                type="file"
                accept="image/*"
                onChange={sendPhoto}
                onClick={sendAnswer} />
            <label htmlFor="avatar-file-input">
                <Button disabled={props.disabled} variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>{strings.sendPhoto}</Button>
            </label>
        </div>
    );
}