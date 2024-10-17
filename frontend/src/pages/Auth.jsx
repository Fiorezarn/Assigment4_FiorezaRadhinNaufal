import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "auth/getCookieRequest" });
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return <></>;
};

export default Auth;
