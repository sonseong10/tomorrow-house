import { createAppThunk, type IRes } from "../common";
import { returnRes } from "../../../commons/store/common";
import {
  Grade,
  type ILoginFetc,
  type IResLogin,
  type ITokenInfo,
} from "./authVo";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeSession, setSession } from "../../../commons/storage/storageHook";
import Http, { HttpR } from "../../../commons/Http";
import { rdxMain } from "../../../components/layout/nav/store/navigatesR";
import { GRADE } from "../../../components/layout/nav/store/navigateVo";
/** 리덕스 스토어 이름 설정*/
const name = "login";

/**
 * 저장될 유저 정보 인터페이스 설정
 */
export interface IAuth {
  isLogin: boolean;
  name?: string;
  grade?: Grade;
  reference_id?: number;
  channel_code?: string;
  email?: string;
  author_id?: number | null;
}

/**
 * CSR 에서 로그인을 위한 서버통신 액션 함수
 * 비동기 함수를 생성 pending, fulfilled, rejected 를 실행되게
 */
export const apiPlogin = createAppThunk<IResLogin, ILoginFetc>(
  `${name}/apiPlogin`,
  async params => {
    const res = await HttpR.post<IRes<IResLogin>>(`api/auth/token`, params);
    if (res.data.content) {
      setSession("access_token", res.data.content.data.access_token);
    }
    return returnRes();
  }
);

export const apiGtokenInfo = createAppThunk<ITokenInfo>(
  `${name}/apiGtokenInfo`,
  async (_, thunkApi) => {
    const res = await Http.get<IRes<ITokenInfo>>(`detail-token`);
    if (res.data.content) {
      thunkApi.dispatch(rdxTokenInfo(res.data.content));
      switch (res.data.content.user_authority) {
        case Grade.SYSTEM:
          thunkApi.dispatch(rdxMain({ grade: GRADE.SYSTEM }));
          break;
        case Grade.SUPER:
          thunkApi.dispatch(rdxMain({ grade: GRADE.SUPER }));
          break;
        case Grade.ROLE_CMS_PARTNER:
          thunkApi.dispatch(
            rdxMain({
              grade: GRADE.ROLE_CMS_PARTNER,
              reference_id: res.data.content.reference_id,
            })
          );
          break;
        case Grade.ROLE_CMS_AUTHOR:
          thunkApi.dispatch(
            rdxMain({
              grade: GRADE.ROLE_CMS_AUTHOR,
              reference_id: res.data.content.reference_id,
            })
          );
          break;
      }
    }
    return res.data;
  }
);

/**
 * 로그아웃 통신
 */
export const apiPloutout = createAppThunk<undefined>(
  `${name}/apiPloutout`,
  async () => {
    const res = await Http.post<IRes<undefined>>(`auth/sign-out`);
    if (res.data.code >= 0) {
      removeSession("access_token");
      removeSession("refresh_token");
    }
    return returnRes();
  }
);

/**
 * 리덕스 스토어 data 를 관리하는 reducer 설정
 */
const loginSlice = createSlice({
  name,
  initialState: { isLogin: false } as IAuth,
  reducers: {
    rdxTokenInfo(state: IAuth, action: PayloadAction<ITokenInfo>) {
      state.name = action.payload.user_name;
      state.email = action.payload.email;
      state.reference_id = action.payload.reference_id;
      state.grade = action.payload.user_authority;
      state.channel_code = action.payload.channel_code;
      state.author_id = action.payload.author_id;
    },
    rdxSetLoginState(state: IAuth, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
  extraReducers: builder => {
    // pending 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신하기전 호출되는 함수
    builder.addCase(apiPlogin.pending, (state: IAuth) => {
      return { ...state };
    });
    // fulfilled 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신후 성공 하면 호출되는 함수
    builder.addCase(apiPlogin.fulfilled, (state: IAuth, { payload }) => {
      switch (payload.code) {
        case 200:
          if (payload.content) {
            state.isLogin = true;
          } else {
            state.isLogin = false;
          }
          break;
        default:
          // 통신 실패?
          break;
      }
    });
  },
});
export const { rdxTokenInfo, rdxSetLoginState } = loginSlice.actions;
// data 를 관리하는 reducer 기본 반환 설정
export default loginSlice.reducer;
