import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export default function (url: string, queryKey: string){
  async function deleteData(){
    const response = await axios.delete(url)
    return response.data
  }
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [queryKey]})
  })
}