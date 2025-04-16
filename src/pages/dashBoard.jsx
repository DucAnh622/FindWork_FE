import { toast } from "react-toastify"; 
import { logout } from "../services/userService";
import { useDispatch } from "react-redux";  
import { useNavigate } from "react-router-dom";
import { logoutRedux } from "../redux/slices/userSlice";

export const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    let res = await logout();
    if (res.statusCode === 201) {
      toast.success(res.message);
      dispatch(logoutRedux());
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={()=>handleLogout()}>Logout</button>
    </div>
  );
}
