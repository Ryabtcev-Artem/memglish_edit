import {useQuery} from "@tanstack/react-query";
import axios from "axios";


export default function useGet(url: string, queryKey: string) {
  async function getPreviews() {
    const response = await axios.get(url)
    return response.data
  }

  const {data: previews, isLoading, isError, error} = useQuery({
    queryKey: [queryKey],
    queryFn: getPreviews,
  })
  return {previews, isLoading, isError, error}
}