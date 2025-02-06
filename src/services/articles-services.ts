import { env } from "../constants/env";
import queryString from "query-string";

interface IParams {
  search?: string;
  order?: string;
}

const getArticles = async (params: IParams = {}) => {
  try {
    const paramsString = queryString.stringify(
      {
        ...params,
        orderby: "publishedAt",
      },
      {
        skipEmptyString: true,
      }
    );

    const response = await fetch(`${env.BASE_URL}/articles?${paramsString}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error as any);
  }
};

export default {
  getArticles,
};
