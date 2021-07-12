import css from "./Login.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import BaseButton from "../Common/Buttons/BaseButton";
import {
  FormInputField,
  FormCheckbox,
} from "../Common/FormControls/FormControls";

const LoginForm = (props) => {
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

  const FormikLoginForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={submitFunction}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, errors }) => (
          <Form className={css.wrapper}>
            <div className={css.title}>Login</div>
            <section className={css.holder}>
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
              {props.captcha && (
                <div className={css.captcha}>
                  <img src={props.captcha} />
                  <FormInputField name="captcha" label="Captcha" type="text" />
                </div>
              )}
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

  return <FormikLoginForm />;
};

export default LoginForm;
