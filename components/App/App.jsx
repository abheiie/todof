import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useAuth } from "../../utils";
import Navbar from "../Navbar";
import PositionedSnackbar from "../PositionedSnackbar";

const App = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authError, isAuthFetching } = useAuth();
  const authUser = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.error);


  useEffect(() => {}, [authUser, dispatch]);

  if (isAuthFetching) return <>loading...</>;
  if (authError) {
    return(
      router.push({
        pathname: "/auth/login"
    })
    )
  }
  return (
    <>
      {error.show_error && <PositionedSnackbar error = {error}/>}
      {authUser && <Navbar  user = {authUser}/>}
      {children}
    </>
  );
};
export default App;
