"use server";

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.openformat.tech/v1",
  headers: {
    "x-api-key": process.env.OPENFORMAT_API_KEY,
  },
});

export async function getUserProfile(user: string): Promise<Profile | null | unknown> {
  if (!process.env.OPENFORMAT_API_KEY && !process.env.OPENFORMAT_DAPP_ID) {
    return null;
  }

  try {
    const params = new URLSearchParams();
    params.set("chain", "arbitrum-sepolia");
    params.set("user_id", user);

    if (process.env.OPENFORMAT_DAPP_ID) {
      params.set("app_id", process.env.OPENFORMAT_DAPP_ID as string);
    }

    const res = await apiClient.get(`/profile?${params.toString()}`);

    return res.data;
  } catch (error: unknown) {
    console.error(error);
    return error;
  }
}
