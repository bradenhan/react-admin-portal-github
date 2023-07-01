import { useLocation ,Navigate} from "react-router-dom";
 
function Author({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" replace></Navigate>;
  }
}
export default Author;