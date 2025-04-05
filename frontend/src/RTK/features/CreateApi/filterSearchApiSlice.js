import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../store/backendApi"

export const filterApi = createApi({
  reducerPath: "filterApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }), // Change to your API
  endpoints: (builder) => ({
    getCategoryProducts: builder.query({
      query: (category) => `/product/category?category=${category}`
    }),
    getSearchedQuery : builder.query({
      query:(searchedQuery) => `/product/search?query=${searchedQuery}`
    })
  }),
});

export const { useGetCategoryProductsQuery, useGetSearchedQueryQuery } = filterApi;