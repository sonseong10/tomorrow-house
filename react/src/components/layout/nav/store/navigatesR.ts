import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  GRADE,
  type INavigatesVO,
  leftList,
  secList,
  topList,
} from "./navigateVo";

/** 리덕스 스토어 이름 */
const name = "navigates";

/**
 * 리덕스 스토어 변수들
 */
export interface INavigates {
  isLeft: boolean;
  mainSelected: number;
  topList: Array<INavigatesVO>;
  leftList: { [key: string]: Array<INavigatesVO> };
  secList: { [key: string]: Array<INavigatesVO> };
  topSelected: INavigatesVO;
  leftSelected: INavigatesVO;
  secSelected?: INavigatesVO;
}

/**
 * data 를 관리하는 reducer 설정
 */
const navigatesSlice = createSlice({
  name,
  initialState: {
    mainSelected: GRADE.NONE,
    isLeft: true,
    topList: topList,
    leftList: leftList,
    secList: secList,
  } as INavigates,
  reducers: {
    rdxMain(
      state: INavigates,
      action: PayloadAction<{ grade: number; reference_id?: number }>
    ) {
      state.mainSelected = action.payload.grade;

      state.topList = topList.filter(item => item.grade & action.payload.grade);
      for (const key in leftList) {
        state.leftList[key] = leftList[key].filter(
          item => item.grade & action.payload.grade
        );
      }
      for (const key in secList) {
        state.secList[key] = secList[key].filter(
          item => item.grade & action.payload.grade
        );
      }
    },
    rdxIsLeft(state: INavigates, action: PayloadAction<boolean>) {
      state.isLeft = action.payload;
    },
  },
});

/**
 * CSR 에서 쓰는 액션들
 */
export const { rdxMain, rdxIsLeft } = navigatesSlice.actions;
// data 를 관리하는 reducer 기본 반환 설정
export default navigatesSlice.reducer;
