import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//@ts-ignore
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      headers.set("x-rapidapi-key", rapidApiKey);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params: any) =>
        `/summarize?url=${encodeURIComponent(params.url)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
