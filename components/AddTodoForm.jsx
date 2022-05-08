import React from 'react'
import { TextField, Paper, Button, Grid } from "@material-ui/core";


function AddTodoForm() {
  return (
    <Grid container justifyContent="center">
        <Grid xs={10} md={6} item style={{ paddingRight: 16 }}>
        <TextField
            placeholder="Add Todo here"
            // value={""}
            // onChange={""}
            // onKeyPress={""}
            fullWidth
        />
        </Grid>
        <Grid xs={2} md={1} lg={1} item>
        <Button
            fullWidth
            color="secondary"
            variant="outlined"
            // onClick={"onButtonClick"}
        >
            Add
        </Button>
        </Grid>
  </Grid>
  )
}

export default AddTodoForm