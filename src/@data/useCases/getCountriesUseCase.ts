import { getCountriesGateway } from "@data/gateways/getCountriesGateway";

interface Country {
  name: {
    common: string;
  };
}

export async function getCountriesUseCase() {
  const response = await getCountriesGateway();

  const countries = response.data as Country[];

  const mappedCountries = countries.map((country) => country.name.common);

  const orderedCountries = mappedCountries.sort();

  return orderedCountries;
}
