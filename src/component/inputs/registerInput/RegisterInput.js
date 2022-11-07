import { ErrorMessage, useField } from "formik";
import "./style.css";

export default function RegisterInput({ placeholder, ...props }) {
  const [Field, Meta] = useField(props);
  return (
    <div className="input_wrap">
      <input
        type={Field.type}
        name={Field.name}
        placeholder={placeholder}
        {...props}
      />
      {Meta.touched && Meta.error && (
        <div className="input_error" style={{ transform: "translateY(3px)" }}>
          {Meta.touched && Meta.error && <ErrorMessage name={Field.name} />}
          {Meta.touched && Meta.error && <div className="error_arrow_up"></div>}
        </div>
      )}
    </div>
  );
}
