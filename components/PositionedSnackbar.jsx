import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PositionedSnackbar(props) {
  const error = props.error;

  const [state, setState] = React.useState({
    open: error.show_error,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button
        onClick={handleClick({
          vertical: "top",
          horizontal: "center",
        })}
      >
        Top-Center
      </Button>
      <Button
        onClick={handleClick({
          vertical: "top",
          horizontal: "right",
        })}
      >
        Top-Right
      </Button>
      <Button
        onClick={handleClick({
          vertical: "bottom",
          horizontal: "right",
        })}
      >
        Bottom-Right
      </Button>
      <Button
        onClick={handleClick({
          vertical: "bottom",
          horizontal: "center",
        })}
      >
        Bottom-Center
      </Button>
      <Button
        onClick={handleClick({
          vertical: "bottom",
          horizontal: "left",
        })}
      >
        Bottom-Left
      </Button>
      <Button
        onClick={handleClick({
          vertical: "top",
          horizontal: "left",
        })}
      >
        Top-Left
      </Button>
    </React.Fragment>
  );

  return (
    <div>
      {buttons}
      <Snackbar
        severity="error"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error.errorContent}
        </Alert>
      </Snackbar>
    </div>
  );
}
