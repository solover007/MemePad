import { IMetaData, TokenListing } from "./types";
import useSWR, { mutate } from "swr";

// TODO: use env
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
// const BASE_API_URL = "http://localhost:8090";

export async function doRequest(
  url: string,
  config: RequestInit,
  noError?: boolean,
) {
  // @ts-ignore
  config.cache = "no-cache";
  config.credentials = "include";

  const resp = await fetch(BASE_API_URL + url, config);
  if (resp.status >= 400 && !noError) {
    let body: any;
    try {
      body = await resp.json();
    } catch (e) {
      throw new Error("API request failed");
    }

    if (body.error) {
      throw new Error(body.error);
    }
    if (body.message) {
      throw new Error(body.message);
    }
    throw new Error("API request failed");
  }

  return resp;
}

export async function doGetRequest(
  url: string,
  authHeader?: string,
  noError?: boolean,
) {
  const headers: { Authorization?: string } = {};
  if (authHeader) {
    headers.Authorization = authHeader;
  }

  return doRequest(url, { method: "GET", headers }, noError);
}

export async function doPostRequest(url: string, body: any, noError?: boolean) {
  return doRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
    noError,
  );
}

export async function doPutRequest(url: string, body: any): Promise<any> {
  return doRequest(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function doDeleteRequest(url: string, body?: any): Promise<any> {
  return doRequest(url, {
    method: "DELETE",
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function returnJSONAndStatus(resp: Response) {
  return {
    data: await resp.json(),
    status: resp.status,
  };
}

const _useSWR = <T>(url: string, dataFilter?: (data: any) => T) => {
  const { data, error } = useSWR<T>(url, async (url: string) => {
    const resp = await doGetRequest(url);
    return resp.json();
  });
  const refresh = () => mutate(url);

  if (!dataFilter) {
    dataFilter = (data: any) => data;
  }

  return {
    data: dataFilter(data),
    isLoading: !error && !data,
    isError: error,
    refresh,
  };
};

export async function createTokenListing(listing: TokenListing) {
  const resp = await doPostRequest("/api/listings/new", listing, true);
  return returnJSONAndStatus(resp);
}

export async function getTokenListings(): Promise<TokenListing[]> {
  const resp = await doGetRequest("/api/listings");
  return resp?.json();
}

// File upload function
export async function uploadFile(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const config: RequestInit = {
    method: "POST",
    body: formData,
  };

  const resp = await doRequest("/api/listings/upload", config);
  const data = await resp?.json();
  return data;
}

export async function uploadArweave(
  metadata: IMetaData,
): Promise<{ url: string }> {
  const resp = await doPostRequest("/api/listings/upload-arweave", metadata);
  const data = await resp?.json();
  return data;
}

export interface ILoginFlowRequest {
  wallet: string;
  referral?: string;
}

export async function newLoginFlow(
  data: ILoginFlowRequest,
): Promise<{ challenge: string }> {
  const resp = await doPostRequest("/api/auth/login/new", data);
  return resp?.json();
}

export interface IValidateLoginFlowRequest {
  wallet: string;
  signature: string;
  challenge: string;
}

export async function validateLoginFlow(
  data: IValidateLoginFlowRequest,
): Promise<{ success: boolean; error?: string }> {
  const resp = await doPostRequest("/api/auth/login/validate", data);
  return { ...(await resp?.json()), success: resp.status === 200 };
}

export interface IUser {
  id: number;
  wallet: string;
  code: string;
  emailConnected: boolean;
  referralCode: string;
  referralBonus: number;
  usedReferralCode: string;
  email: string;
  referralCount: number;
  admin?: boolean;
}

export interface IBuyLog {
  id?: number;
  user_id?: number;
  listing_id: number;
  token: string;
  amount: number;
  pur_amount: number;
  claimed_amount: number;
  created_at: string;
};

export async function createBuyLog(log: IBuyLog) {
  const resp = await doPostRequest("/api/buylog/", log);
  return returnJSONAndStatus(resp);
}

export function useBuyLogs() {
  return _useSWR<IBuyLog[]>("/api/buylog/");
}

export function useUser() {
  return _useSWR<IUser>("/api/auth/user");
}

export function useTokenListings() {
  return _useSWR<TokenListing[]>("/api/listings");
}
