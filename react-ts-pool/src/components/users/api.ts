import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { apiService, IUser } from "../../services/";
import { queryClient } from "../../services/queryClient";
import { alertActions, useAppDispatch } from "../../store";

const URL_API = process.env.REACT_APP_API_URL ?? "http://localhost:5555";
const baseUrl = `${URL_API}/users`;

const usersListApi = {
  baseKey: "users",
  getUsersListQueryOptions: () => {
    return queryOptions({
      queryKey: [usersListApi.baseKey, "list"],
      queryFn: () => apiService.get(`${baseUrl}`, null),
    });
  },
  // getUserByIdQueryOptions: (id: string) => {
  //   return queryOptions({
  //     queryKey: [usersListApi.baseKey, id],
  //     queryFn: () => apiService.get(`${baseUrl}/${id}`, null),
  //   });
  // },
};

const userByIdApi = {
  baseKey: "users",
  getUserByIdQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: [userByIdApi.baseKey, "list", id],
      queryFn: () => apiService.get(`${baseUrl}/${id}`, null),
      initialData: () => {
        const usersList = queryClient.getQueryData(
          usersListApi.getUsersListQueryOptions().queryKey,
        );
        const userCach = usersList?.find((u: IUser) => u.id === id);
        return userCach;
      },
      initialDataUpdatedAt: () => {
        const state = queryClient.getQueryState(
          usersListApi.getUsersListQueryOptions().queryKey,
        );
        return state?.dataUpdatedAt;
      },
    });
  },
};

export function useGetUsers() {
  return useQuery({
    ...usersListApi.getUsersListQueryOptions(),
    enabled: !!localStorage.getItem("auth"),
  });
}

// export function useGetUserById(id: string) {
//   const usersList = queryClient.getQueryData(
//     usersListApi.getUsersListQueryOptions().queryKey,
//   );
//   const user = usersList?.find((u: IUser) => u.id === +id);
//   return user;
// }

export function useGetUserById(id: string) {
  return useQuery({
    ...userByIdApi.getUserByIdQueryOptions(id),
    enabled: !!localStorage.getItem("auth"),
  });
}

// const useAddUser = () => {
//   return useMutation(apiService.put, user), {
//     onSuccess: () => {
//       queryClient.invalidateQueries('users');
//     },
//   });
// };

export function useUserMutationEdit(id: string) {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IUser) => apiService.put(`${baseUrl}/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [usersListApi.baseKey] });
      const message = "Пользователь обновлен";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}

export function useUserMutationСreate() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IUser) => apiService.post(`${baseUrl}/register`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [usersListApi.baseKey] });
      const message = "Пользователь добавлен";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}

export function useUserMurationDelete() {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (id: string) => apiService.delete(`${baseUrl}/${id}`, null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [usersListApi.baseKey] });
      const message = "Пользователь удален";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });   
}
