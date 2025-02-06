import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, LinkButton, Loader } from "../../ui-kit";
import * as Yup from "yup";
import {
  useAppDispatch,
  alertActions,
  useAppSelector,
} from "../../../shared/store";
import Select from "react-select";
import {
  useGetStudentById,
  useStudentMutationEdit,
  useStudentMutationСreate,
} from "./api";
import { clsx } from "clsx";
import { history } from "../../../shared";

export function AddEditStudent() {
  const parent = useAppSelector((x) => x.auth.value.id);
  const { id } = useParams();
  const [title, setTitle] = useState();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    birthday: Yup.string().required("Username is required"),
    gender: Yup.string().required("Username is required"),
  });
  const formOptions = {
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  };

  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const {
    data: student,
    isSuccess,
    isLoading: isLoadingUser,
    status,
  } = useGetStudentById(id);

  useEffect(() => {
    if (isSuccess && student && student.parent_id === parent) {
      setTitle("Изменить данные");
      reset(student);
    } else {
      setTitle("Добавить нового ученика");
    }
  }, [reset, student, isSuccess]);

  const mutationEdit = useStudentMutationEdit(id);
  const mutationCreate = useStudentMutationСreate();

  async function onSubmit(data) {
    dispatch(alertActions.clear());
    console.log("parent", parent);
    const dataPrepare = { ...data, parent_id: parent };
    if (id) {
      mutationEdit.mutate(dataPrepare);
    } else {
      mutationCreate.mutate(dataPrepare);
    }

    history.navigate("parent/students");
  }

  const styleInput = `
  bg-gray-50 border border-gray-300 text-sm rounded-lg 
  hover:border-cyan-600 focus:outline-cyan-700 block w-full p-2`;

  const styleSelect = `
  bg-gray-50 border border-gray-300 text-sm rounded-lg 
  hover:border-cyan-600 focus:outline-cyan-700 block w-full`;
  const styleLabel = "block mb-2 text-sm font-medium";

  const options = [
    { value: "male", label: "муж" },
    { value: "female", label: "жен" },
  ];
  const getValue = (value) =>
    value ? options.find((o) => o.value === value) : "";

  console.log(isLoadingUser, status);
  return (
    <Card typeClass="main">
      {isLoadingUser && <Loader />}
      <h1 className="text-center">{title}</h1>
      {!(student?.loading || student?.error) && (
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
              <label className={clsx(styleLabel)}>День рождения</label>
              <input
                name="birthday"
                type="text"
                {...register("birthday")}
                className={clsx(styleInput)}
              />
              <div className="mt-1 text-sm text-red-600">
                {errors.userName?.message}
              </div>
            </div>
            <div>
              <label className={clsx(styleLabel)}>Пол</label>
              <div className="">
                <Controller
                  control={control}
                  defaultValue={"male"}
                  name="gender"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder="Выберите пол"
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

            <LinkButton typeClass="main" to="/parent/students">
              Отмена
            </LinkButton>
          </div>
        </form>
      )}
    </Card>
  );
}
