import React from "react";

export default function DateOfBirthSelect(props) {
  const { bDay, bMonth, bYear, days, months, years, handleRegisterChange } =
    props;
  return (
    <div className="reg_dob">
      <div className="reg_label">
        Date of Birth <i className="info_icon"></i>
      </div>
      <div className="reg_dob_select">
        <select name="bDay" id="" value={bDay} onChange={handleRegisterChange}>
          {days.map((day, i) => (
            <option value={day} key={i}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="bMonth"
          id=""
          value={bMonth}
          onChange={handleRegisterChange}
        >
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="bYear"
          id=""
          value={bYear}
          onChange={handleRegisterChange}
        >
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
