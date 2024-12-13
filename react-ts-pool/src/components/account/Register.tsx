import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import clsx from "clsx";
import { Button } from "../ui-kit/Button";
import { Card } from "../ui-kit/Card";
import { history } from "../../services";
import {
  authActions,
  useAppDispatch,
  userActions,
  alertActions,
} from "../../store";

interface IError {
  message?: string;
}

export function Register() {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  type FormSchema = Yup.InferType<typeof validationSchema>;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    dispatch(alertActions.clear());
    try {
      await dispatch(userActions.register(data)).unwrap();

      history.navigate!("/account/login");
      dispatch(
        alertActions.success({
          message: "Регистрация прошла успешно!", //fixme
          showAfterRedirect: true,
        }),
      );
    } catch (err) {
      const error = err as IError;
      if (!error.message) {
        throw err;
      }
      dispatch(alertActions.error(error.message));
    }
  };

  const styleInput = `
    bg-gray-50 border border-gray-300 text-sm rounded-lg 
    hover:border-cyan-600 focus:outline-cyan-700 block w-full p-2`;
  const styleLabel = "block mb-2 text-sm font-medium";

  return (
    <Card typeClass="main">
      <h4 className="pb-4 text-center font-medium text-lg">Регистрация</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className={clsx(styleLabel)}>Имя</label>
          <input
            type="text"
            {...register("firstName")}
            className={clsx(styleInput)}
          />
          <div className="mt-1 text-sm text-red-600 ">
            {errors.firstName?.message}
          </div>
        </div>
        <div className="mb-3">
          <label className={clsx(styleLabel)}>Фамилия</label>
          <input
            type="text"
            {...register("lastName")}
            className={clsx(styleInput)}
          />
          <div className="mt-1 text-sm text-red-600">
            {errors.lastName?.message}
          </div>
        </div>
        <div className="mb-3">
          <label className={clsx(styleLabel)}>Логин</label>
          <input
            type="text"
            {...register("userName")}
            className={clsx(styleInput)}
          />
          <div className="mt-1 text-sm text-red-600">
            {errors.userName?.message}
          </div>
        </div>
        <div className="mb-3">
          <label className={clsx(styleLabel)}>Пароль</label>
          <input
            type="password"
            {...register("password")}
            className={clsx(styleInput)}
          />
          <div className="mt-1 text-sm text-red-600">
            {errors.password?.message}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between mt-5">
          <Button typeClass="main">
            <button disabled={isSubmitting}>
              {isSubmitting && <span className=""></span>}
              Зарегистрировать
            </button>
          </Button>
          <Button typeClass="main">
            <Link to="../login">Отмена</Link>
          </Button>
        </div>
      </form>
    </Card>
  );
}
