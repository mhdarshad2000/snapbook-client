import { useState } from "react";
import "./style.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import RegisterInput from "../../component/inputs/registerInput/RegisterInput";
import DotLoader from "react-spinners/DotLoader";
import { Axios } from "../../helpers/Axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DateOfBirthSelect from "../../component/inputs/registerInput/DateOfBirthSelect";
import GenderSelect from "../../component/inputs/registerInput/GenderSelect";

export default function Register() {
  const navigate = useNavigate();
  const registerInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bDay: new Date().getDate(),
    bMonth: new Date().getMonth() + 1,
    bYear: new Date().getFullYear(),
    gender: "",
  };
  const yearTemp = new Date().getFullYear();

  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerSubmit = async () => {
    try {
      const { data } = await Axios.post("http://localhost:8000/register", {
        first_name,
        last_name,
        email,
        password,
        bDay,
        bMonth,
        bYear,
        gender,
      });

      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  const [register, setRegister] = useState(registerInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bDay,
    bMonth,
    bYear,
    gender,
  } = register;
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const openLogin = () => {
    navigate("/login");
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("First name is required")
      .min(3, "First name must be minimum 3 Characters")
      .max(30, "First name must be minimum 30 Characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string()
      .required("Last name is required")
      .min(3, "Last name must be minimum 3 Characters")
      .max(30, "Last name must be minimum 30 Characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be minimum 6 Characters")
      .max(15, "Password must be minimum 15 Characters"),
  });

  return (
    <div>
      <div className="register">
        <div className="register_wrapper">
          <div className="register_1">
            <div className="login_header">Snapbook</div>
            <h3 className="register_header">Register</h3>
          </div>
          <div className="register_2">
            <div className="register_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  first_name,
                  last_name,
                  email,
                  password,
                  bDay,
                  bMonth,
                  bYear,
                  gender,
                }}
                validationSchema={registerValidation}
                onSubmit={() => {
                  if (gender === "") {
                    setGenderError("You need to specify the gender");
                  } else {
                    setGenderError("");
                    registerSubmit();
                  }
                }}
              >
                {(Formik) => (
                  <Form>
                    <RegisterInput
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      onChange={handleRegisterChange}
                    />
                    <RegisterInput
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      onChange={handleRegisterChange}
                    />
                    <RegisterInput
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={handleRegisterChange}
                    />
                    <RegisterInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleRegisterChange}
                    />
                    <DateOfBirthSelect
                      bDay={bDay}
                      bMonth={bMonth}
                      bYear={bYear}
                      handleRegisterChange={handleRegisterChange}
                      days={days}
                      years={years}
                      months={months}
                    />

                    <GenderSelect
                      genderError={genderError}
                      handleRegisterChange={handleRegisterChange}
                    />
                    <button type="submit" className="blue_btn register_btn">
                      Sign In
                    </button>
                    <div className="reg_loading">
                      <DotLoader color="#1876f2" loading={loading} size={30} />
                      {error && <div className="error_text">{error}</div>}
                      {success && <div className="success_text">{success}</div>}
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_login" onClick={openLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
