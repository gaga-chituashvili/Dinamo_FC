import { api } from "@/src/lib/api";
import {
  DINAMO_TENANT,
  waitForProfileSession,
  type DinamoSessionUser,
} from "@/src/lib/identity-auth";

export interface RegisterApiPayload {
  email: string;
  password: string;
  name: string;
  tenantSlug: string;
  requestedRole?: string;
}

export interface RegisterApiResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

export interface LoginApiPayload {
  email: string;
  password: string;
  tenantSlug: string;
}

export interface LoginApiResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

type IdentityAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    role?: string;
  };
};

export const authApi = {
  async register(payload: RegisterApiPayload): Promise<RegisterApiResponse> {
    const response = await api<IdentityAuthResponse>("api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: "რეგისტრაცია წარმატებით დასრულდა.",
      user: response.user,
    };
  },

  async login(payload: LoginApiPayload): Promise<LoginApiResponse> {
    return api<LoginApiResponse>("api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async loginWithProfileSession(
    payload: LoginApiPayload,
  ): Promise<LoginApiResponse & { session: DinamoSessionUser | null }> {
    const response = await this.login(payload);
    const session = await waitForProfileSession(
      response.accessToken,
      payload.tenantSlug ?? DINAMO_TENANT,
    );
    return { ...response, session };
  },
};
