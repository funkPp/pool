import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  UseMutationResult,
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

const userByIdApi = {
  baseKey: "users",
  getUserByIdQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: [usersListApi.baseKey, "list", id],
      queryFn: () => apiService.get(`${baseUrl}/${id}`, null),
      initialData: () =>  {
        const usersList = queryClient.getQueryData(usersListApi.getUsersListQueryOptions().queryKey,);
        const userCach = usersList?.find((u: IUser) => u.id === +id);
        return userCach
      },
      initialDataUpdatedAt: () => {
        const state = queryClient.getQueryState(usersListApi.getUsersListQueryOptions().queryKey)   
        return state?.dataUpdatedAt
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


export function useUserMutation(path: string, body: IUser){
  return useMutation({
    mutationFn: apiService.put(path, body),
    onSuccess: () => { 
      queryClient.invalidateQueries();
    },
  })
}


// // Пример мутации для создания пользователя
// export const useCreateUser = () => {
//   return useMutation((newUser: IUser) => apiService.post('/users', newUser));
// };

// // Пример мутации для обновления пользователя
// export const useUpdateUser = () => {
//   return useMutation(({ id, updatedData }) => apiService.put(/users/${id}, updatedData));
// };

// // Пример мутации для удаления пользователя
// export const useDeleteUser = () => {
//   return useMutation((userId) => apiService.delete(/users/${userId}));
// };


// export const useCreateUser = (): UseMutationResult<IUser, Error, IUser> => {
//   return useMutation<IUser, Error, IUser, null>((newUser: IUser) => apiService.post('/users', newUser));
// };
