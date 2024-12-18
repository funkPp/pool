import { infiniteQueryOptions, queryOptions, useQuery } from "@tanstack/react-query";
import { apiService, IUser } from "../../services/";

  const URL_API = process.env.REACT_APP_API_URL ?? "http://localhost:5555";
  const baseUrl = `${URL_API}/users`;

 const usersListApi = {
    baseKey: 'users',
    getUsersListQueryOptions: () => {
        return queryOptions({
            queryKey: [usersListApi.baseKey, "list"],
            queryFn: () => apiService.get(`${baseUrl}`, null)
    });
    }
}


export function useGetUsers() {
  return useQuery({
    ...usersListApi.getUsersListQueryOptions(),
    enabled: !!localStorage.getItem('auth'),
  });
}



