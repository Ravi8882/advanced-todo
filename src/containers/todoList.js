
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, setTodos } from "../redux/actions/todosAction";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TableCell,
    LinearProgress,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
  } from "@material-ui/core";



  





const TodoList = () => {

    const useSortableData = (items, config = null) => {
        const [sortConfig, setSortConfig] = useState(config);
        const sortedItems = useMemo(() => {
          let sortableItems = [...items];
          if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
              if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
              return 0;
            });
          }
          return sortableItems;
        }, [items, sortConfig]);
      
        const requestSort = (key) => {
          let direction = 'ascending';
          if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
          ) {
            direction = 'descending';
          }
          setSortConfig({ key, direction });
        };
        return { todos: sortedItems, requestSort, sortConfig };
      };




    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const todos1 = useSelector((state) => state.allTodos.todos);

    const { todos, requestSort, sortConfig } = useSortableData(todos1);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const navigate = useNavigate();

    

    const handleSearch = () => {
        return todos.filter(
          (todo) =>
            todo.title.toLowerCase().includes(search)
        );
      };
      if(todos.length == 0){
        return (
            <div className="container">
                <h1>Loading......</h1>
                <LinearProgress style={{ backgroundColor: "gold" }} />
            </div>
        );
      }else{
        return (
            <div className="container">
                <Container style={{ textAlign: "center" }}>
                        <Typography
                        variant="h4"
                        style={{ margin: 18, fontFamily: "Montserrat" }}
                >
               TODO LIST
                </Typography>
                <TextField
                label="Search For a Task.."
                variant="outlined"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
                 />
                 <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                    <TableRow>
                    {["id", "title", "completed", "Action"].map((head) => (
                        <TableCell
                        style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                            cursor: 'pointer'
                        }}
                        key={head}
                        align="center"
                        onClick={() => requestSort(head)}
                        className={getClassNamesFor(head)}
                        >
                        {head.toUpperCase()}
                        </TableCell>
                    ))}
                    </TableRow>
              </TableHead>
                    <TableBody>
                    {todos.length > 0 && handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                        return (

                        <TableRow
                            style={{backgroundColor: "#16171a"}}
                            key={row.id}
                        >
                            <TableCell align="center" style={{color: "white"}}>
                               {row.id}
                            </TableCell>
                            <TableCell
                                align="center" style={{color: "white"}}
                            >                            
                                
                                    <span
                                        style={{
                                            color: "white",
                                            textTransform: "uppercase",
                                            //fontSize: 22,
                                        }}
                                    >
                                        {row.title}
                                    </span>
                            </TableCell>
                            <TableCell align="center" style={{color: "white"}}>
                               {row.completed === true ? 'Complete' : 'Not Completed'}
                            </TableCell>
                            <TableCell align="center" style={{color: "white", cursor : "pointer"}} 
                                 onClick={() => navigate(`/todos/${row.id}`)}
                            >
                           
                               Detail
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                    </Table>
                    <Pagination
                        count={(handleSearch()?.length/10).toFixed(0)}
                        style={{
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 450);
                        }}
                    />
                </Container>
            </div>
        );
    }
};

export default TodoList;