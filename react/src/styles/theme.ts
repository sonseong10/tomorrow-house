import baseStyled from 'styled-components';
import {commonFonts, commonColors, commonHoverColors, commonDisabledColors} from '../commons/styles/commonTheme';

/**
 * common에서 사용하는 테마 외의 값이 있을 경우 추가
 */
const addFamily = {
  family: {
    ...commonFonts.family,
    title: `'NotoSans', Arial, sans-serif`,
  },
};

const fonts = {
  ...commonFonts,
  ...addFamily,
};

const colors = {
  ...commonColors,
  primary: '#35C5F0',
  btnPrimary: '#35C5F0',
};

const hoverColors = {
  ...commonHoverColors,
  btnPrimaryHover: `${colors.btnPrimary}99`,
};

const disabledColors = {
  ...commonDisabledColors,
  btnPrimaryDisabled: `${colors.btnPrimary}40`,
};

const lightColors = {
  ...colors,
  ...hoverColors,
  ...disabledColors,
};

const darkColors = {
  ...colors,
  ...hoverColors,
  ...disabledColors,
  bodyBackground: '#121212',
  fontPrimary: '#fff',
};

/**
 * 테마 반환
 */

const defaultTheme = {
  fontFamily: fonts.family,
  fontSize: fonts.size,
  fontWeight: fonts.weight,
};

export const lightTheme = {
  ...defaultTheme,
  colors: lightColors,
};

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: darkColors,
};

/**
 * 테마 타입 설정
 */
export type Theme = typeof lightTheme;
export const styled = baseStyled;
