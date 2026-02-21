export interface UserStoreModel {
  user_id: string;
  token: string;
  refreshToken: string | undefined;
  exp?: number;
  roles?: string[];
  entity_id: string | null;
  profile: string;
}

export interface hasuraToken {
  'x-hasura-default-role': string;
  'x-hasura-user-id': string;
  'x-hasura-allowed-roles': string[];
  'x-hasura-entity-id': string | undefined;
}

export interface CustomAppToken {
  user_id: string;
  exp: number;
  refreshToken: string;
  entity_id: string | null;
  scope: string[];
  'https://hasura.io/jwt/claims': hasuraToken;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface LoginErrorResponse {
      message: string;
}

export interface LoginParams {
  username: string;
  password: string;
}
