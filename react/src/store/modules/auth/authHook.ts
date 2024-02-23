import { useApi } from "../common";
import { useNavigate } from "react-router";

import { apiGtokenInfo, apiPlogin } from "./authR";

import type { IState } from "..";
import { Grade } from "./authVo";
import { removeSession } from "../../../commons/storage/storageHook";
import { useSelectorEq } from "../../../commons/store/common";
export interface IUseAuthReturn {
  isLogin: boolean;
  name?: string;
  grade?: Grade;
  // company_id?: number;
  reference_id?: number;
  login: (id: string, pwd: string) => Promise<number>;
  logout: () => void;
  getToken: (route?: boolean) => Promise<void>;
  errorMessage?: string;
}

/**
 * user 정보 통신 훅 설정
 */
const useAuth = () => {
  // 화면상에 표시될 값 설정
  const { isLogin, name, grade, reference_id } = useSelectorEq(
    (state: IState) => state.auth
  );
  const navigate = useNavigate();
  const { apiResult } = useApi();
  /**
   * 로그인함수: apiPlogin 를 호출해서 pending, fulfilled, rejected 가 실행되게 처리
   */
  const login = async (id: string, pwd: string): Promise<number> => {
    const res = await apiResult(apiPlogin, {
      email: id,
      password: pwd,
    });
    if (res) {
      switch (res.code) {
        case 0:
        case 200:
          getToken();
          return res.code === 0 ? 200 : res.code;
        default:
          return res.code;
      }
    } else {
      return 999;
    }
  };

  const getToken = async (route?: boolean): Promise<void> => {
    const res = await apiResult(apiGtokenInfo);
    if (res) {
      switch (res.code) {
        case 200:
          if (!route) {
            switch (res.content?.user_authority) {
              case Grade.SYSTEM:
              case Grade.SUPER:
                // navigate(getRouter(TOP.ORDER, LEFT.MANAGE));
                break;
              // case Grade.VIEWUS:
              // navigate(getRouter(TOP.ORDER, LEFT.MANAGE));
              // break;
              case Grade.ROLE_CMS_AUTHOR:
              case Grade.ROLE_CMS_PARTNER:
                navigate("/admin/cms/contents/manage");
                break;
            }
          }
          break;
        default:
          navigate("/");
          break;
      }
    }
  };

  /**
   * 로그아웃기능
   */
  const logout = async (): Promise<void> => {
    removeSession("access_token");
    navigate("/");
  };

  return {
    name,
    grade,
    isLogin,
    reference_id,
    login,
    logout,
    getToken,
  };
};

export default useAuth;
