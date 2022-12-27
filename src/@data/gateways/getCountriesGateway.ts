import axios from "axios";

export async function getCountriesGateway() {
  return await axios("https://restcountries.com/v3.1/all");
}
