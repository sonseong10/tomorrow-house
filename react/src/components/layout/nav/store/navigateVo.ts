import type { ButtonIcon } from "../../../../commons/styles/ComponentsType";

export interface INavigatesVO {
  name: string;
  key?: string;
  id: TOP | LEFT | SEC | POPUP;
  router: string;
  match?: string;
  grade: number;
  disabled?: boolean;
  isActive?: boolean;
  icon?: string | ButtonIcon;
}

export enum GRADE {
  SYSTEM = 1,
  SUPER = 2,
  ROLE_CMS_AUTHOR = 4,
  ROLE_CMS_PARTNER = 8,
  NONE = 32,
}

export enum TOP {
  CMS = "cms",
  NONE = "none",
}

export enum LEFT {
  MANAGE = "manage",
  REGISTER = "register",
  LIST = "list",
  AD = "ad",
  CONTENTS = "contents",
  CAMPAIGN = "campaign",
  NONE = "none",
}

export enum SEC {
  SITE = "site",
  SETTING = "setting",
  CONDITION = "condition",
}

// NOTE: 필요한경우 추가
export enum POPUP {}

export function getRouter(id: TOP | LEFT | SEC | string): string;
export function getRouter(top: TOP, left: LEFT): string;
export function getRouter(a: TOP | LEFT | SEC | string, left?: LEFT): string {
  let vo: INavigatesVO | undefined;
  if (left) {
    vo = getRouteVo(a as TOP, left);
  } else {
    vo = getRouteVo(a);
  }
  if (vo !== undefined) {
    return vo.router;
  }
  return "/";
}

export function getRouteVo(
  id: TOP | LEFT | SEC | string
): INavigatesVO | undefined;
export function getRouteVo(top: TOP, left: LEFT): INavigatesVO | undefined;
export function getRouteVo(
  a: TOP | LEFT | SEC | string,
  left?: LEFT
): INavigatesVO | undefined {
  const itemAr = left === undefined ? a.split(".") : [a, left];
  const item = topList.filter(item => item.id === itemAr[0]);
  if (item.length > 0) {
    if (itemAr.length > 1) {
      const sub = leftList[item[0].id].filter(item => item.id === itemAr[1]);
      if (sub.length > 0) {
        return sub[0];
      } else {
        return item[0];
      }
    } else {
      return item[0];
    }
  } else {
    //
  }
  return;
}

export const mainList: Array<string> = [
  "관리자",
  "ROLE_CMS_PARTNER",
  "ROLE_CMS_AUTHOR",
];
const GradeList = [
  GRADE.SYSTEM + GRADE.SUPER,
  GRADE.SYSTEM + GRADE.SUPER + GRADE.ROLE_CMS_PARTNER + GRADE.ROLE_CMS_AUTHOR,
  GRADE.SYSTEM + GRADE.SUPER + GRADE.ROLE_CMS_PARTNER,
  GRADE.SYSTEM + GRADE.SUPER + GRADE.ROLE_CMS_AUTHOR,
];
export const topList: Array<INavigatesVO> = [
  {
    name: "ALL",
    id: TOP.CMS,
    router: "/admin/cms/contents/manage",
    grade: GradeList[1],
  },
];
export const leftList: { [key: string]: Array<INavigatesVO> } = {
  [TOP.CMS]: [
    {
      name: "인사이트",
      id: LEFT.MANAGE,
      grade: GradeList[2],
      router: "/admin/cms/insight/manage",
      icon: "Insight",
    },
    {
      name: "콘텐츠 관리",
      id: LEFT.MANAGE,
      grade: GradeList[1],
      router: "/admin/cms/contents/manage",
      icon: "NavContents",
    },
    {
      name: "카테고리 관리",
      id: LEFT.CAMPAIGN,
      grade: GradeList[2],
      router: "/admin/cms/category/manage",
      icon: "NavCategory",
    },
  ],
};

export const secList: { [key: string]: Array<INavigatesVO> } = {};

export const popupList: Array<INavigatesVO> = [];
