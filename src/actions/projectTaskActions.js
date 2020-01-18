import axios from "axios";
import {GET_SINGLE_PROJECT_TASK, DELETE_PROJECT_TASK, GET_ERRORS, GET_PROJECT_TASK } from './types'

export const addProjectTask = (project_task, history) => async dispatch => {

    try {
        await axios.post("http://127.0.0.1:8080/api/board", project_task);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}


export const getBackLogs = () => async dispatch => {
    const res = await axios.get("http://127.0.0.1:8080/api/board/all");
    console.log(res.data);
    dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
    })
}

export const deleteProjectTask = id => async  dispatch => {
    if (window.confirm(`Are you sure Delete Project  Task ${id}`)) {
        const res = await axios.delete(`http://127.0.0.1:8080/api/board/${id}`);
        console.log(res.data);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: id
        })
}}

export const getTaskById = ( id , history) => async dispatch =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8080/api/board/${id}`);
        console.log(res.data);

        dispatch({
            type : GET_SINGLE_PROJECT_TASK,
            payload : res.data
        })
    }catch(error){
            history.push("/");
    }
}