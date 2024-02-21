/**
 * 통합AD어드민 권한정보
 */
export enum Grade {
  /** 소유자 */
  SYSTEM = "SYSTEM",
  /** 관리자&개발자 */
  SUPER = "SUPER",
  /** PP */
  ROLE_CMS_PARTNER = "ROLE_CMS_PARTNER",
  /** AUTHOR */
  ROLE_CMS_AUTHOR = "ROLE_CMS_AUTHOR",
}

/**
 * 로그인통신 params
 */
export interface ILoginFetc {
  email: string;
  password: string;
  login_type: string;
}

/**
 * 로그인통신 response
 */
export interface IResLogin {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

/**
 * 토근통신 response
 */
export interface ITokenInfo {
  user_name: string;
  user_authority: Grade;
  reference_id: number;
  channel_code: string;
  email: string;
  valid: boolean;
  author_id?: number | null;
}
