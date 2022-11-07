import "./style.css"
import { ErrorMessage, useField } from "formik"

export default function LoginInput({placeholder, bottom, ...props}) {
    const [field,meta] = useField(props)
  return (
    <div className="input_wrap">
        <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...props}
        />
        {meta.touched && meta.error && (
          <div className="input_error" style={{transform: "translateY(3px)"}}>
            {meta.touched && meta.error && <ErrorMessage name={field.name}/> }
            {meta.touched && meta.error && <div className="error_arrow_up"></div> }
          </div>
        )}
    </div>
  )
}
