import { env } from "../constants/env";

const getUserById = async (id: string) => {
  try {
    const response = await fetch(`${env.BASE_URL}/users/${id}`);
    return response.json();
  } catch (error) {
    throw new Error(error as string);
  }
};

export default {
  getUserById,
};
