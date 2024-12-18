import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "../ui-kit";
import * as Yup from "yup";
import {
  useAppSelector,
  useAppDispatch,
  alertActions,
  history,
} from "../../store";
import Select from "react-select";
import { useGetUserById } from "./api";
import { clsx } from "clsx";

export function AddEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const dispatch = useAppDispatch();

  // console.log({ user });

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    role: Yup.string().required("Заполните поле"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(id ? null : Yup.string().required("Password is required"))
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = {
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const user = useGetUserById(id);

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  // useEffect(() => {
  //   if (id) {
  //     setTitle("Edit User");
  //    // fetch user details into redux state and
  //    // populate form fields with reset()
  //     dispatch(userActions.getById(id))
  //       .unwrap()
  //       .then((user) => reset(user));

  //   } else {
  //     setTitle("Add User");
  //   }
  // }, []);

  async function onSubmit(data) {
    dispatch(alertActions.clear());
    // try {
    //   // create or update user based on id param

    //   let message;
    //   if (id) {
    //     await dispatch(userActions.update({ id, data })).unwrap();
    //     message = "User updated";
    //   } else {
    //     await dispatch(userActions.register(data)).unwrap();
    //     message = "User added";
    //   }

    //   // redirect to user list with success message
    //   history.navigate("/admin");
    //   dispatch(alertActions.success({ message, showAfterRedirect: true }));
    // } catch (error) {
    //   dispatch(alertActions.error(error));
    // }
  }
  const styleInput = `
  bg-gray-50 border border-gray-300 text-sm rounded-lg 
  hover:border-cyan-600 focus:outline-cyan-700 block w-full p-2`;
  const styleLabel = "block mb-2 text-sm font-medium";

  const options = [
    { value: "user", label: "Пользователь" },
    { value: "admin", label: "Администратор" },
    { value: "owner", label: "Владелец" },
  ];
  const getValue = (value) =>
    value ? options.find((o) => o.value === value) : "";

  return (
    <Card typeClass="main">
      <h1>{title}</h1>
      {!(user?.loading || user?.error) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <div>
            <div className="mb-3 col">
              <label className={clsx(styleLabel)}>Имя</label>
              <input
                name="firstname"
                type="text"
                {...register("firstname")}
                className={clsx(styleInput)}
              />
              <div className="invalid-feedback">
                {errors.firstname?.message}
              </div>
            </div>
            <div className="mb-3 col">
              <label className={clsx(styleLabel)}>Фамилия</label>
              <input
                name="lastName"
                type="text"
                {...register("lastname")}
                className={clsx(styleInput)}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
          </div>
          <div>
            <div className="mb-3 col">
              <label className={clsx(styleLabel)}>Login</label>
              <input
                name="username"
                type="text"
                {...register("username")}
                className={clsx(styleInput)}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div>
              <label className={clsx(styleLabel)}>Роль</label>
              <div className=''>
                <Controller
                  control={control}
                  defaultValue={"user"}
                  name="role"
                  // className={clsx(styleInput)}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder="Выберите роль"
                      inputRef={ref}
                      options={options}
                      value={getValue(value)}
                      className={clsx(styleInput)}
                      onChange={(newValue) => onChange(newValue.value)}
                    />
                  )}
                />
              </div>

              <div className="invalid-feedback">{errors.role?.message}</div>
            </div>
            <div className="mb-1 col">
              <label className={clsx(styleLabel)}>
                Пароль
                {id && (
                  <em className="ml-1 font-light">
                    (Оставьте поле пустым, чтобы не менять пароль)
                  </em>
                )}
              </label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={clsx(styleInput)}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary me-2"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Сохранить
            </button>
            <button
              onClick={() => reset()}
              type="button"
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Сброс
            </button>
            <Link to="/admin/users" className="btn btn-link">
              Отмена
            </Link>
          </div>
        </form>
      )}
      {user?.loading && (
        <div className="text-center m-5">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
      )}
      {user?.error && (
        <div class="text-center m-5">
          <div class="text-danger">Error loading user: {user.error}</div>
        </div>
      )}
    </Card>
  );
}
