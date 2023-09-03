import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WorldCaseResponse {
  // WorldCase endpoint
  cases: number;
  deaths: number;
  recovered: number;
}

interface CountrySpecificResponse {
  //CountrySpecific endpoint
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
}

interface GraptDataResponse {
  // GraptData endpoint
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://disease.sh/v3/covid-19/",
  }),
  endpoints: (builder) => ({
    WorldCase: builder.query<WorldCaseResponse, void>({
      query: () => ({
        url: "all",
        method: "GET",
      }),
    }),
    CountrySpecific: builder.query<CountrySpecificResponse, void>({
      query: () => ({
        url: "countries",
        method: "GET",
      }),
    }),
    GraptData: builder.query<GraptDataResponse, void>({
      query: () => ({
        url: "historical/all?lastDays=all",
        method: "GET",
      }),
    }),
  }),
});

export const { useWorldCaseQuery, useCountrySpecificQuery, useGraptDataQuery } =
  postApi;
