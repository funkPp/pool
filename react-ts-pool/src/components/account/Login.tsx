import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card } from "../ui-kit/Card";
import { Button } from "../ui-kit/Button";
import clsx from "clsx";

import { authActions, useAppDispatch } from "../../store";

export function Login() {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Имя пользователя - обязательное поле"),
    password: Yup.string().required("Пароль - обязательное поле"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    return dispatch(authActions.login({ username, password }));
  }

  const styleInput = `
  bg-gray-50 border border-gray-300 text-sm rounded-lg 
  hover:border-cyan-600 focus:outline-cyan-700 block w-full p-2`;
  const styleLabel = "block mb-2 text-sm font-medium";

  return (
    <Card typeClass="main">
      <h4 className="pb-4 text-center font-medium text-lg">Вход</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className={clsx(styleLabel)}>Логин</label>
          <input
            type="text"
            {...register("username")}
            className={clsx(styleInput)}
          />
          <div className="mt-1 text-sm text-red-600">
            {errors.username?.message}
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
          <Button typeClass="main" disabled={isSubmitting} value={"Войти"} />

          <div
            className="py-2 px-5 mb-1 focus:outline-none bg-gray-50 rounded-lg 
                        border border-gray-300 hover:bg-gray-100 hover:text-cyan-700
                        focus:z-10 focus:ring-3 focus:ring-cyan-100 align-middle"
          >
            <Link to="../register">Регистрация</Link>
          </div>
        </div>
      </form>
    </Card>
  );
}
