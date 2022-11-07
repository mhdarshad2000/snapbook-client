import "./style.css";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { Axios } from "../../helpers/Axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import LoginInput from "../../component/inputs/loginInput/Index";
const loginInfos = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const openSignup = () => {
    navigate("/register");
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email Address is compulsary")
      .email("Must be a valid Email")
      .max(50),
    password: Yup.string().required("Password is requied"),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.post("/login", {
        email,
        password,
      });
      setLoading(false);
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <h3 className="login_header">Snapbook</h3>
            <span>Share your snaps with the world</span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidation}
                onSubmit={() => {
                  loginSubmit();
                }}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      placeholder="Email Address / Phone Number"
                      type="text"
                      name="email"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      placeholder="password"
                      type="password"
                      name="password"
                      onChange={handleLoginChange}
                    />
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                    <div className="reg_loading">
                      <DotLoader color="#1876f2" loading={loading} size={30} />
                      {error && <div className="error_text">{error}</div>}
                    </div>
                  </Form>
                )}
              </Formik>

              <Link to="/forgot" className="forgot_password">
                Forgotten password ?{" "}
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup" onClick={openSignup}>
                Create Account
              </button>
            </div>
            {/* <Link to="/" className="sign_extra">
                        <b>Create a page</b>
                        for a celebrity, brand or business.
                    </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
