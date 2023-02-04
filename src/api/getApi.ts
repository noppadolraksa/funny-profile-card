import axios, { AxiosResponse } from "axios";

export async function getApi<T>(path: string): Promise<AxiosResponse<T>> {
  const res = await axios
    .get<T, AxiosResponse>(path)
    .then((res) => {
      // handle success
      return res;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      return error;
    });
  return res;
}
