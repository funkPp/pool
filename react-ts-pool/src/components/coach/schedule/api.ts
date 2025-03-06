import {
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { apiService, IEvent } from "../../../shared";
import { queryClient } from "../../../shared/queryClient";
import { alertActions, useAppDispatch } from "../../../shared/store";

const URL_API = process.env.REACT_APP_API_URL ?? "http://localhost:5555";
const baseUrl = `${URL_API}/events`;

const eventsListApi = {
  baseKey: "events",
  getEventsListQueryOptions: () => {
    return queryOptions({
      queryKey: [eventsListApi.baseKey, "list"],
      queryFn: () => apiService.get(`${baseUrl}`, null),
    });
  },
};

const eventsListByParentApi = {
  baseKey: "events",
  getEventsByParentListQueryOptions: (parentId: string) => {
    return queryOptions({
      queryKey: [eventsListApi.baseKey, "list", parentId],
      queryFn: () => apiService.get(`${baseUrl}/parent/${parentId}`, null),
    });
  },
};

const eventByIdApi = {
  baseKey: "events",
  getEventByIdQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: [eventByIdApi.baseKey, "list", id],
      queryFn: () => apiService.get(`${baseUrl}/${id}`, null),
      initialData: () => {
        const eventsList = queryClient.getQueryData(
          eventsListApi.getEventsListQueryOptions().queryKey,
        );
        const eventCach = eventsList?.find((u: IEvent) => u.id === +id );
        return eventCach;
      },
      initialDataUpdatedAt: () => {
        const state = queryClient.getQueryState(
          eventsListApi.getEventsListQueryOptions().queryKey,
        );
        return state?.dataUpdatedAt;
      },
      
    });
  },
};

export function useGetEvents() {
  return useQuery({
    ...eventsListApi.getEventsListQueryOptions(),
    enabled: !!localStorage.getItem("auth"),    
  });
}

export function useGetEventById(id: string) {
  return useQuery({
    ...eventByIdApi.getEventByIdQueryOptions(id),
    enabled: !!localStorage.getItem("auth") && !!id ,
  });
}

export function useGetEventByGroup(groupId: string) {
  return useQuery({
    ...eventsListByParentApi.getEventsByParentListQueryOptions(groupId),
    enabled: !!localStorage.getItem("auth") && !!groupId,
  });
}

export function useEventMutationEdit() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IEvent) => apiService.put(`${baseUrl}/${body.id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [eventsListApi.baseKey] });
      const message = "Событие обновлено";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
    
  });
}

export function useEventMutationСreate() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: Omit<IEvent, 'id'>) => apiService.post(`${baseUrl}/create`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [eventsListApi.baseKey] });
      const message = "Событие добавлено";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}

export function useEventMurationDelete() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: string) => apiService.delete(`${baseUrl}/${id}`, null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [eventsListApi.baseKey] });
      const message = "Событие удалено";
      dispatch(alertActions.success({ message, showAfterRedirect: true }));
    },
    onError: (err) => {
      if (typeof err === "string") dispatch(alertActions.error(err));
    },
  });
}
