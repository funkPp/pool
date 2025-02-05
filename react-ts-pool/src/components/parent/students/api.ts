import {
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { apiService, IStudent } from "../../../shared";
import { queryClient } from "../../../shared/queryClient";
import { alertActions, useAppDispatch } from "../../../shared/store";

const URL_API = process.env.REACT_APP_API_URL ?? "http://localhost:5555";
const baseUrl = `${URL_API}/students`;

const studentsListApi = {
  baseKey: "students",
  getStudentsListQueryOptions: () => {
    return queryOptions({
      queryKey: [studentsListApi.baseKey, "list"],
      queryFn: () => apiService.get(`${baseUrl}`, null),
    });
  },
};

const studentsListByParentApi = {
  baseKey: "students",
  getStudentsListQueryOptions: (parentId: string) => {
    return queryOptions({
      queryKey: [studentsListApi.baseKey, "list", parentId],
      queryFn: () => apiService.get(`${baseUrl}/parent/${parentId}`, null),
    });
  },
};

const studentByIdApi = {
  baseKey: "students",
  getStudentByIdQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: [studentByIdApi.baseKey, "list", id],
      queryFn: () => apiService.get(`${baseUrl}/${id}`, null),
      initialData: () => {
        const studentsList = queryClient.getQueryData(
          studentsListApi.getStudentsListQueryOptions().queryKey,
        );
        const studentCach = studentsList?.find((u: IStudent) => u.id === id);
        return studentCach;
      },
      initialDataUpdatedAt: () => {
        const state = queryClient.getQueryState(
          studentsListApi.getStudentsListQueryOptions().queryKey,
        );
        return state?.dataUpdatedAt;
      },
    });
  },
};

export function useGetStudents() {
  return useQuery({
    ...studentsListApi.getStudentsListQueryOptions(),
    enabled: !!localStorage.getItem("auth"),
  });
}

export function useGetStudentById(id: string) {
  return useQuery({
    ...studentByIdApi.getStudentByIdQueryOptions(id),
    enabled: !!localStorage.getItem("auth") && !!id,
  });
}

export function useGetStudentByParent(parentId: string) {
  return useQuery({
    ...studentByIdApi.getStudentByIdQueryOptions(parentId),
    enabled: !!localStorage.getItem("auth") && !!parentId,
  });
}

export function useStudentMutationEdit(id: string) {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IStudent) => apiService.put(`${baseUrl}/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [studentsListApi.baseKey] });
      const message = "Ученик обновлен";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}

export function useStudentMutationСreate() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IStudent) => apiService.post(`${baseUrl}/register`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [studentsListApi.baseKey] });
      const message = "Ученик добавлен";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}

export function useStudentMurationDelete() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: string) => apiService.delete(`${baseUrl}/${id}`, null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [studentsListApi.baseKey] });
      const message = "Ученик удален";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}
