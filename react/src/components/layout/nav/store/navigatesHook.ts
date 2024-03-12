import { useDispatch } from "react-redux";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useSelectorEq } from "../../../../commons/store/common";
import { rdxIsLeft, rdxMain } from "./navigatesR";
import { GRADE, type INavigatesVO, mainList } from "./navigateVo";
import type { IState } from "../../../../store/modules";

/**
 * 권한별 메뉴활성화 Hook
 */
export const useMain = () => {
  const { mainSelected } = useSelectorEq((state: IState) => ({
    mainSelected: state.navigates.mainSelected,
  }));
  const dispatch = useDispatch();
  const setMain = async (selected: number) => {
    dispatch(rdxMain({ grade: selected }));
  };
  const selectedMain = () => {
    switch (mainSelected) {
      case GRADE.SYSTEM:
      case GRADE.SUPER:
        return mainList[0];
      case GRADE.ROLE_CMS_PARTNER:
        return mainList[1];
      case GRADE.ROLE_CMS_AUTHOR:
        return mainList[2];
    }
    return "";
  };
  return { selectedMain, setMain };
};

/**
 * 상단 네비게이션정보 반환
 */
export const useTop = () => {
  const { topList } = useSelectorEq((state: IState) => ({
    topList: state?.navigates?.topList,
  }));
  return { topList };
};

/**
 * 상단 네비게이션 라우터이동 evnet함수
 */
export const useTopSelected = () => {
  const location = useLocation();
  return () => {
    const path = location.pathname.split("/");
    return path[2];
  };
};

/**
 * 상단 네비게이션 active 설정함수
 */
export const useSetTopSelected = () => {
  const navigate = useNavigate();
  const setTop = async (selected: INavigatesVO) => {
    navigate(selected.router);
  };
  return { setTop };
};

/**
 * 1deps 네비게이션 정보와 evnet함수
 */
export const useLeft = () => {
  const { isLeft } = useSelectorEq((state: IState) => ({
    isLeft: state.navigates?.isLeft,
  }));
  const dispatch = useDispatch();
  const activeLeft = async (active: boolean) => {
    dispatch(rdxIsLeft(active));
  };
  return { isLeft, activeLeft };
};

/**
 * 1deps 네비게이션 정보 반환
 */
export const useLeftList = () => {
  const { leftList } = useSelectorEq((state: IState) => ({
    leftList: state.navigates.leftList,
  }));
  return { leftList };
};

/**
 * 1deps 네비게이션 active설정과 router이동 event
 */
export const useLeftSelected = () => {
  const navigate = useNavigate();
  const getLeftSelected = (item: INavigatesVO) => {
    const matched = useMatch(item.match ? item.match : item.router);
    return matched;
  };
  const setLeft = async (selected: INavigatesVO) => {
    if (!selected.disabled) {
      navigate(selected.router);
    }
  };
  return { getLeftSelected, setLeft };
};

/**
 * 2deps 네비게이션 정보 반환
 */
export const useSecList = (id: string) => {
  const { secList } = useSelectorEq((state: IState) => ({
    secList: state.navigates.secList[id] as INavigatesVO[] | undefined,
  }));
  return secList;
};

/**
 * 2deps 네비게이션 active설정과 router이동 event
 */
export const useSecSelected = () => {
  const navigate = useNavigate();
  const getSecSelected = (router: string) => {
    const matched = useMatch(router);
    return matched;
  };
  const setSec = async (selected: INavigatesVO) => {
    if (!selected.disabled) {
      navigate(selected.router);
    }
  };
  return { getSecSelected, setSec };
};
