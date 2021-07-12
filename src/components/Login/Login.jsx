import css from "./Login.module.css";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import BaseButton from "../Common/Buttons/BaseButton";

const Login = (props) => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: true,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Wrong e-mail format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const submitFunction = (values, { setErrors, setSubmitting }) => {
    // console.log(JSON.stringify(values, null, 2));
    const actions = {
      setErrors: (error) => {
        setErrors({ form: error });
      },
      setSubmitting,
    };

    props.loginUser(values, actions);
  };

  const FormInputField = ({ label, ...props }) => {
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
        ) : null}
      </div>
    );
  };

  const FormCheckbox = ({ label, ...props }) => {
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

  const FormikLoginForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={submitFunction}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, errors }) => (
          <Form className={css.wrapper}>
            <div className={css.title}>Login Form</div>
            <section>
              <FormInputField name="email" label="Email" type="text" />
              <FormInputField
                name="password"
                label="Password"
                type="password"
              />
              <FormCheckbox name="rememberMe" label="Remember me" />
              {errors.form ? (
                <div className={css.errorPopup}>{errors.form}</div>
              ) : null}
            </section>
            <div className={css.button}>
              <BaseButton
                type="submit"
                disabled={isSubmitting || !isValid}
                text="Log me in"
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  return (
    <div className={css.container}>
      <div>
        <FormikLoginForm />
      </div>
    </div>
  );
};

export default Login;
