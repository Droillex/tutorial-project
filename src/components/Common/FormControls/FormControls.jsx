import { useField } from "formik";
import css from "./FormControls.module.css";
import classNames from "classnames";

export const FormInputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={css.holder}>
      <div
        className={classNames(css.textInput, {
          [css.error]: meta.touched && meta.error,
        })}
      >
        <label htmlFor={props.name}>{label}</label>
        <input {...field} {...props} size={30} />
      </div>
      {meta.touched && meta.error ? (
        <div className={css.errorPopup}>{meta.error}</div>
      ) : (
        <div className={css.errorPopup} />
      )}
    </div>
  );
};

export const FormCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className={css.checkboxInput}>
      <input type="checkbox" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={css.errorPopup}>{meta.error}</div>
      ) : null}
      <label htmlFor={props.name}>{label}</label>
    </div>
  );
};
