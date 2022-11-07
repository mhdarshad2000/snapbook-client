import "./style.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginInput from "../../component/inputs/loginInput/Index";
import { Axios } from "../../helpers/Axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
const loginInfos = {
  username: "",
  password: "",
};

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { username, password } = login;
  const loginValidation = Yup.object({
    username: Yup.string()
      .min(6, "The username must be minimum 6 characters")
      .required(),
    password: Yup.string()
      .required()
      .min(5, "Password must be minimum 5 characters")
      .max(10, "The password must be less than 10 characters"),
  });
  const adminLoginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.post("/admin", {
        username,
        password,
      });
      setLoading(false);
      dispatch({ type: "ADMIN_LOGIN", payload: data });
      navigate("/admin/home");
      Cookies.set("admin", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const handleAdminLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  return (
    <div>
      <div className="login">
        <div className="login_wrapper">
          <div className="login_wrap">
            <div className="login_1">
              <h3 className="login_header">Snapbook</h3>
              <h2 className="admin_sub_header">Admin</h2>
            </div>
            <div className="login_2">
              <div className="login_2_wrap">
                <Formik
                  enableReinitialize
                  initialValues={{
                    username,
                    password,
                  }}
                  validationSchema={loginValidation}
                  onSubmit={() => {
                    adminLoginSubmit();
                  }}
                >
                  {(formik) => (
                    <Form>
                      <LoginInput
                        placeholder="Username"
                        type="text"
                        name="username"
                        onChange={handleAdminLogin}
                      />
                      <LoginInput
                        placeholder="password"
                        type="password"
                        name="password"
                        onChange={handleAdminLogin}
                      />
                      <button type="submit" className="blue_btn">
                        Login
                      </button>
                      <div className="reg_loading">
                        <DotLoader
                          color="#1876f2"
                          loading={loading}
                          size={30}
                        />
                        {error && <div className="error_text">{error}</div>}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
