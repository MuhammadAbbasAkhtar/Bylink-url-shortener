import React from 'react'
import Error404 from './Error404';
import { makeStyles } from '@material-ui/core/styles';

export default function index(props) {
    const {code, message} = props
    if(code === 404) return (<Error404 message={message}/>)
    return (
        <>
            Unknown Error
        </>
    )
}
