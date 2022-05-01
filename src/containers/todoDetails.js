import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail, selectedTodo } from "../redux/actions/todosAction";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import {
    LinearProgress,
} from "@material-ui/core";


import { useNavigate } from 'react-router-dom';

const TodoDetails = () => {
    const { todoId } = useParams();
    let todo = useSelector((state) => state.todo);

    const { id, title, completed } = todo;
    const dispatch = useDispatch();
  

    useEffect(() => {
        if (todoId && todoId !== "") {
            dispatch(fetchProductDetail(todoId));
        }

    }, [todoId]);
    const navigate = useNavigate();
    if (!todo) return <LinearProgress style={{ backgroundColor: "gold" }} />;



    return (
        <div style={{ backgroundColor: "teal", display: "flex", minHeight: '100vh' }}>

            <Card style={{
                backgroundColor: "whitesmoke",
                alignItems: 'center',
                justifyContent: 'center', minWidth: '100vh', minHeight: '100vh', backgroundPosition: '50% 50%',
                backgroundSize: 'cover'
            }}>
                <Typography
                    onClick={() => navigate(`/`)}
                    variant="h1"
                    style={{ cusrsor: 'pointer' }}
                >
                    TODO DETAIL
                </Typography>
                <CardActionArea>
                    <CardMedia
                        style={{ maxWidth: '80vh', maxHeight: '80vh' }}
                        component="img"
                        image={todo.completed === true ? "https://previews.123rf.com/images/vertex4/vertex41501/vertex4150100116/34950617-3d-illustration-of-right-sign-in-green-color.jpg" : "https://png.pngitem.com/pimgs/s/144-1442121_red-cross-mark-clipart-wrong-answer-cross-wrong.png"}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Your Task is
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div">
                            {todo.completed === true ? 'Completed' : 'Not Completed'}
                        </Typography>
                        <Typography variant="h4" color="text.secondary">
                            {todo.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
};

export default TodoDetails;