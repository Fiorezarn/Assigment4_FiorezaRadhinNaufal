import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }
  return <></>;
};

export default Auth;
