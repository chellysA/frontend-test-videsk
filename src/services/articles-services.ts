import { env } from "../constants/env";

const getArticles = async () => {
  try {
    const response = await fetch(`${env.BASE_URL}/articles`);
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
