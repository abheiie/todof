import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  updateTodos,
  deleteTodos,
  createTodos,
} from "../redux/actions/todosActions";
import { getCookie } from "../utils/cookie";

//ui imports
import Loader from "../components/Loader";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
const Home = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const todoList = useSelector((state) => state.todos.todos);
  const statUpdatingTodo = useSelector(
    (state) => state.todos.update_todo_start
  );
  const loading = useSelector((state) => state.todos.loading);
  const router = useRouter();
  const [editData, setEditData] = useState("");
  const [body, setBody] = useState("");
  const [createBody, setCreateBody] = useState("");

  useEffect(() => {
    dispatch(getTodos());
  }, [getTodos]);

  useEffect(() => {
    // const token = getCookie("token");
    if (statUpdatingTodo && statUpdatingTodo === true) {
      setBody("");
      setEditData("");
    }
  }, [statUpdatingTodo]);

  if (!authUser) {
    return router.push({
      pathname: "/auth/login",
      query: { returnUrl: router.asPath },
    });
  }
  const onClickEditData = (id, data) => {
    setEditData(id);
    setBody(data);
  };
  const onChangeFn = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };
  const onClickSubmit = (id) => {
    dispatch(updateTodos({ id, body }));
  };
  const onClickCancel = () => {
    setEditData("");
  };
  const deleteTodoList = (id) => {
    dispatch(deleteTodos({ id }));
  };
  const onChangeCreate = (e) => {
    e.preventDefault();
    setCreateBody(e.target.value);
  };
  const handeleCreate = () => {
    dispatch(createTodos({ body: createBody }));
    setCreateBody("");
  };
  return (
    <Fragment>
      <div className="container">
        <Grid style={{ margin: 16, padding: 16 }}>
          {/* <AddTodoForm /> */}
          <Grid container justifyContent="center">
            <Grid xs={10} md={6} item style={{ paddingRight: 16 }}>
              <TextField
                placeholder="Add Todo here"
                value={createBody}
                onChange={(e) => onChangeCreate(e)}
                // onKeyPress={""}
                fullWidth
              />
            </Grid>
            <Grid xs={2} md={1} lg={1} item>
              <Button
                fullWidth
                color="secondary"
                variant="outlined"
                onClick={handeleCreate}
                disabled={createBody === ""}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {/* {loading ? <Loader/>: */}
      <Grid container justifyContent="center">
        {loading ? (
          <Grid xs={10} md={7} item style={{ paddingRight: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader />
            </div>
          </Grid>
        ) : (
          <>
            {todoList &&
              todoList.map((data, index) => (
                <Grid xs={10} md={7} item style={{ paddingRight: 16 }}>
                  <div
                    className="toDoCard hey"
                    style={{
                      border: "1px solid #d1c6c6",
                      padding: "20px",
                      boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",
                      borderRadius: "5px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      className="cardBody"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {editData === data.id ? (
                        <input
                          style={{
                            padding: "10px",
                            border: "1px solid #d6c7c7",
                            borderRadius: "5px",
                            width: "90%",
                          }}
                          value={body}
                          onChange={(e) => onChangeFn(e)}
                        />
                      ) : (
                        <div className="title">{data.body}</div>
                      )}
                      {editData === data.id ? (
                        <div>
                          <span
                            style={{
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => onClickSubmit(data.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#a3a3a3"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-save"
                            >
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                              <path d="M17 21v-8H7v8M7 3v5h8" />
                            </svg>
                          </span>
                          <span
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={onClickCancel}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fe91ac"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-x"
                            >
                              <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                          </span>
                        </div>
                      ) : (
                        <div className="iconBlock">
                          <span
                            style={{
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                            onClick={() => onClickEditData(data.id, data.body)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#a3a3a3"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-edit-2"
                            >
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                            </svg>
                          </span>
                          <span
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => deleteTodoList(data.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fe91ac"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-trash-2"
                            >
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Grid>
              ))}
          </>
        )}
      </Grid>
      {/* } */}
    </Fragment>
  );
};
export default Home;
