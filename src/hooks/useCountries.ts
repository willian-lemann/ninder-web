/* eslint-disable react-hooks/rules-of-hooks */
import { api } from "@config/axios";
import axios from "axios";
import useSWR, { SWRResponse } from "swr";

interface Country {
  label: string;
  value: string;
}

const fetcher = (url: string) =>
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => response.data);

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
