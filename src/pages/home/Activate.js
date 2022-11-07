import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/header/Header";
import LeftHome from "../../component/home/left/LeftHome";
import CreatePost from "../../component/home/createPosts/CreatePost";
import ActivateForm from "./ActivateForm";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Axios } from "../../helpers/Axios";

export default function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.post(
        "/activate",
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account Verification succeeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account Verification failled"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <div className="home_middle">
        <CreatePost user={user} />
      </div>
      <LeftHome user={user} />
    </div>
  );
}
