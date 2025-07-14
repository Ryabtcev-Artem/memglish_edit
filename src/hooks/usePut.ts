import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import type {IPreviewNoID} from "../types/types.ts";


export default function usePut(url: string, queryKey: string) {
  const queryClient = useQueryClient()
  const mutationFn = async (newData: IPreviewNoID) => {
    const response = await axios.put(url, newData)
    return response.data
  }
  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [queryKey]})
  })
}