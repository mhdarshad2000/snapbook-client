import React from "react";

export default function GenderSelect(props) {
    const {genderError, handleRegisterChange} =props
  return (
    <div className="reg_gender">
      <div className="reg_label">
        Gender <i className="info_icon"></i>
      </div>
      <div className="reg_radio">
        <div className="reg_gender_group">
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" value="male" onChange={handleRegisterChange} id="male" />
        </div>
        <div className="reg_gender_group">
          <label htmlFor="Female">Female </label>
          <input type="radio" name="gender" value="female" onChange={handleRegisterChange} id="Female" />
        </div>
        <div className="reg_gender_group">
          <label htmlFor="Custom">Custom</label>
          <input type="radio" name="gender" value="custom" onChange={handleRegisterChange} id="Custom" />
        </div>
      </div>
      {genderError && (
        <div className="input_error err_signup">
          <div className="error_arrow_up err_signup"></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
