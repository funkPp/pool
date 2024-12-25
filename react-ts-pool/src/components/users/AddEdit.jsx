import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, LinkButton } from "../ui-kit";
import * as Yup from "yup";
import { useAppDispatch, alertActions } from "../../store";
import Select from "react-select";
import {
  useGetUserById,
  useUserMutationEdit,
  useUserMutationСreate,
} from "./api";
import { clsx } from "clsx";
import { history } from "../../services";

export function AddEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const dispatch = useAppDispatch();

  // console.log({ user });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("Username is required"),
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

  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const { data: user, isSuccess } = useGetUserById(id);
  console.log(user, isSuccess);
  useEffect(() => {
    setTitle("Новый пользователь");
    if (isSuccess && user) {
      setTitle("Редактирование пользователеля");
      console.log("reset", user.id);
      reset(user);
    }
  }, [reset, user, isSuccess]);
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

  const mutationEdit = useUserMutationEdit(id);
  const mutationCreate = useUserMutationСreate();

  async function onSubmit(data) {
    dispatch(alertActions.clear());

    if (id) {
      mutationEdit.mutate(data);
    } else {
      mutationCreate.mutate(data);
    }

    history.navigate("admin/users");
  }

  const styleInput = `
  bg-gray-50 border border-gray-300 text-sm rounded-lg 
  hover:border-cyan-600 focus:outline-cyan-700 block w-full p-2`;

  const styleSelect = `
  bg-gray-50 border border-gray-300 text-sm rounded-lg 
  hover:border-cyan-600 focus:outline-cyan-700 block w-full`;
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
      <h1 className="text-center">{title}</h1>
      {!(user?.loading || user?.error) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <div>
            <div className="mb-3 col">
              <label className={clsx(styleLabel)}>Имя</label>
              <input
                name="firstName"
                type="text"
                {...register("firstName")}
                className={clsx(styleInput)}
              />
              <div className="mt-1 text-sm text-red-600">
                {errors.firstName?.message}
              </div>
            </div>
            <div className="mb-3 col">
              <label className={clsx(styleLabel)}>Фамилия</label>
              <input
                name="lastName"
                type="text"
                {...register("lastName")}
                className={clsx(styleInput)}
              />
              <div className="mt-1 text-sm text-red-600">
                {errors.lastName?.message}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3 col">
              <label className={clsx(styleLabel)}>Login</label>
              <input
                name="userName"
                type="text"
                {...register("userName")}
                className={clsx(styleInput)}
              />
              <div className="mt-1 text-sm text-red-600">
                {errors.userName?.message}
              </div>
            </div>
            <div>
              <label className={clsx(styleLabel)}>Роль</label>
              <div className="">
                <Controller
                  control={control}
                  defaultValue={"user"}
                  name="role"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder="Выберите роль"
                      inputRef={ref}
                      options={options}
                      value={getValue(value)}
                      onChange={(newValue) => onChange(newValue.value)}
                      classNamePrefix="react-select"
                      className={styleSelect}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderColor: "none",
                          boxShadow: "none",
                          borderRadius: "5px",
                          background: "#FAFAFA",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#0097A7 ",
                        }),
                      }}
                    />
                  )}
                />
              </div>
              <div className="mt-1 text-sm text-red-600">
                {errors.role?.message}
              </div>
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
              <div className="mt-1 text-sm text-red-600">
                {errors.password?.message}
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between">
            <Button
              typeClass="main"
              type="submit"
              disabled={isSubmitting}
              value="Сохранить"
            />

            <Button
              typeClass="main"
              onClick={() => reset()}
              type="button"
              disabled={isSubmitting}
              value="Сброс"
            />

            <LinkButton typeClass="main" to="/admin/users">
              Отмена
            </LinkButton>
          </div>
        </form>
      )}
      {/* {user?.loading && (
        <div className="text-center m-5">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
      )}
      {user?.error && (
        <div class="text-center m-5">
          <div class="text-danger">Error loading user: {user.error}</div>
        </div>
      )} */}
    </Card>
  );
}
