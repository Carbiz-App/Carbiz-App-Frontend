import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca3,flags"
    );
    const result = await response.json();

    const countries = result?.map((country: any) => ({
      label: country?.name?.common,
      value: country?.name?.common,
      country_code: country?.cca3,
      key: country?.cca3,
      flag: country?.flags?.png, // Fixed from flag.png to flags.png
    }));

    return countries.sort((a: any, b: any) => a.label.localeCompare(b.label));
  } catch (error: any) {
    console.error(error?.message);
    return [];
  }
};

export const getCities = async (country?: string) => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      }
    );

    const result = await response.json();

    const cities = result?.data?.map((city: any) => ({
      label: city,
      value: city,
      country: country,
      key: city,
    }));

    return cities.sort((a: any, b: any) => a.label.localeCompare(b.label));
  } catch (error: any) {
    console.error(error?.message);
    return [];
  }
};
