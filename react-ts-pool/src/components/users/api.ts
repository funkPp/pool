import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { apiService, IUser } from "../../services/";
import { queryClient } from "../../services/queryClient";

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

export function useGetUsers() {
  return useQuery({
    ...usersListApi.getUsersListQueryOptions(),
    enabled: !!localStorage.getItem("auth"),
  });
}

export function useGetUserById(id: string) {
  const usersList = queryClient.getQueryData(
    usersListApi.getUsersListQueryOptions().queryKey,
  );
  const user = usersList?.find((u: IUser) => u.id === +id);
  return user;
}



const useAddUser = () => {
  return useMutation(apiService.put, user), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};


export function useUserMutation(isEdit: boolean, user: IUser){
  return useMutation(apiService.put(`${baseUrl}`, user) , user), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      reset(); 
    },
  })
}

