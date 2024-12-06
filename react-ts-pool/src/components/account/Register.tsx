import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

// import { history } from "_helpers";
//import { userActions, alertActions } from "_store";

export function Register() {
  // const dispatch = useDispatch();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  type FormSchema = Yup.InferType<typeof validationSchema>;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    // dispatch(alertActions.clear());
    // try {
    //   await dispatch(userActions.register(data)).unwrap();
    //   // redirect to login page and display success alert
    //   history.navigate("/account/login");
    //   dispatch(
    //     alertActions.success({
    //       message: "Registration successful",
    //       showAfterRedirect: true,
    //     })
    //   );
    // } catch (error) {
    //   dispatch(alertActions.error(error));
    // }
  };

  return (
    <div className="max-w-sm mx-auto  bg-white text-cyan-700  p-6 border border-gray-200 rounded-lg shadow">
      <h4 className="pb-4 text-center font-medium text-lg">Регистрация</h4>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium  dark:text-white">
              Имя
            </label>
            <input
              // name="firstName"
              type="text"
              {...register("firstName")}
              className={`bg-gray-50 border  border-gray-300 text-sm rounded-lg hover:border-cyan-600 focus-within:border-gray-100 block w-full p-2.5`}
            />
            <div className="mt-2 text-sm text-red-600">
              {errors.firstName?.message}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              // name="lastName"
              type="text"
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              // name="username"
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              // name="password"
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
            Register
          </button>
          <Link to="../login" className="btn btn-link">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
