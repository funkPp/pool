import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

// import { authActions } from '_store';

export function Login() {
  // const dispatch = useDispatch();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Имя пользователя обязательное поле"),
    password: Yup.string().required("Пароль обязательное поле"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    return; //dispatch(authActions.login({ username, password }));
  }

  return (
    <div className="card m-3">
      <h4 className="card-header">Login</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              //   name="username"
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              //   name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Login
          </button>
          <Link to="../register" className="btn btn-link">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
