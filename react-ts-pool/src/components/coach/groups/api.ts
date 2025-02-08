import {
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { apiService, IGroup } from "../../../shared";
import { queryClient } from "../../../shared/queryClient";
import { alertActions, useAppDispatch } from "../../../shared/store";

const URL_API = process.env.REACT_APP_API_URL ?? "http://localhost:5555";
const baseUrl = `${URL_API}/groups`;

const groupsListApi = {
  baseKey: "groups",
  getGroupsListQueryOptions: () => {
    return queryOptions({
      queryKey: [groupsListApi.baseKey, "list"],
      queryFn: () => apiService.get(`${baseUrl}`, null),
    });
  },
};

const groupsListByParentApi = {
  baseKey: "groups",
  getGroupsByParentListQueryOptions: (parentId: string) => {
    return queryOptions({
      queryKey: [groupsListApi.baseKey, "list", parentId],
      queryFn: () => apiService.get(`${baseUrl}/parent/${parentId}`, null),
    });
  },
};

const groupByIdApi = {
  baseKey: "groups",
  getGroupByIdQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: [groupByIdApi.baseKey, "list", id],
      queryFn: () => apiService.get(`${baseUrl}/${id}`, null),
      initialData: () => {
        const groupsList = queryClient.getQueryData(
          groupsListApi.getGroupsListQueryOptions().queryKey,
        );
        const groupCach = groupsList?.find((u: IGroup) => u.id === id );
        return groupCach;
      },
      initialDataUpdatedAt: () => {
        const state = queryClient.getQueryState(
          groupsListApi.getGroupsListQueryOptions().queryKey,
        );
        return state?.dataUpdatedAt;
      },
    });
  },
};

export function useGetGroups() {
  return useQuery({
    ...groupsListApi.getGroupsListQueryOptions(),
    enabled: !!localStorage.getItem("auth"),
  });
}

export function useGetGroupById(id: string) {
  return useQuery({
    ...groupByIdApi.getGroupByIdQueryOptions(id),
    enabled: !!localStorage.getItem("auth") && !!id ,
  });
}

export function useGetGroupByParent(parentId: string) {
  return useQuery({
    ...groupsListByParentApi.getGroupsByParentListQueryOptions(parentId),
    enabled: !!localStorage.getItem("auth") && !!parentId,
  });
}

export function useGroupMutationEdit(id: string) {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IGroup) => apiService.put(`${baseUrl}/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [groupsListApi.baseKey] });
      const message = "Ученик обновлен";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}

export function useGroupMutationСreate() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IGroup) => apiService.post(`${baseUrl}/create`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [groupsListApi.baseKey] });
      const message = "Ученик добавлен";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}

export function useGroupMurationDelete() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: string) => apiService.delete(`${baseUrl}/${id}`, null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [groupsListApi.baseKey] });
      const message = "Ученик удален";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}
