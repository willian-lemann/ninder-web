/* eslint-disable react-hooks/rules-of-hooks */
import { api } from "@config/axios";
import useSWR, { SWRResponse } from "swr";

interface Data {
  name: {
    common: string;
  };
}

interface Country {
  label: string;
  value: string;
}

const fetcher = async () => {
  const response = await api.get("/countries");
  return response.data;
};

export const useCountries = () => {
  const countriesData = useSWR<Data[]>("/countries", fetcher);

  const mappedCountries = countriesData.data?.map((country) => ({
    label: country.name.common,
    value: country.name.common,
  })) as Country[];

  console.log(mappedCountries);
  return {
    error: countriesData.error,
    mutate: countriesData.mutate,
    isLoading: !countriesData.data?.length,
    countries: mappedCountries,
    isValidating: countriesData.isValidating,
  };
};
