/* eslint-disable react-hooks/rules-of-hooks */
import { api } from "@config/axios";
import useSWR, { SWRResponse } from "swr";

interface Country {
  label: string;
  value: string;
}

const fetcher = async () => {
  const response = await api.get("/countries");
  return response.data;
};

export const useCountries = () => {
  const countriesData = useSWR<string[]>("/countries", fetcher);

  const mappedCountries = countriesData.data?.map((country) => ({
    label: country,
    value: country,
  })) as Country[];

  return {
    error: countriesData.error,
    mutate: countriesData.mutate,
    isLoading: !countriesData.data?.length,
    countries: mappedCountries,
    isValidating: countriesData.isValidating,
  };
};
