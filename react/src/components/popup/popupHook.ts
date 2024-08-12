import {rdxPopupOpen} from '../../commons/popup/store/popupR';
import {ButtonState} from '../../commons/popup/store/absPopupVo';
import {useDispatch} from 'react-redux';
import {PopupType} from './PopupType';
import {useAbsAlert, useAbsConfirm} from '../../commons/popup/store/absPopupHook';
import {
  AlertPopupButtonGroup,
  ConfirmPopupButtonGroup,
  DeletePopupButtonGroup,
  type IconPopupProps,
} from './components/IconPopup';
import Button from '../../components/ui/atom/Button';

/**
 * Popup 컴포넌트 callBack type
 * @property {boolean} state 팝업버튼 리턴값 {보통: 0: 취소, 1: 성공, 1이상: 커스텀}
 * @property {U} Generic Type 외부에서 넘겨받는타입 {@link https://www.typescriptlang.org/ko/docs/handbook/2/generics.html}
 */
export interface IProductCallBack<U> {
  state: boolean;
  list: Array<U>;
}
const commonButton = {
  color: 'primary',
  btnsize: 'md',
  ellipsis: true,
  maxWidth: '125px',
};

/**
 * window.alert()용 어드민 레이어팝업
 * @deprecated width 팝업사이즈 겟샵에서 사용을 위해 사용중인 수정예정
 */
export function useAlert(width?: string | number) {
  const {alert} = useAbsAlert(Button, width);
  return alert;
}

/**
 * window.confirm()용 어드민 레이어팝업
 */
export function useConfirm() {
  const {confirm} = useAbsConfirm(Button);
  return confirm;
}

/**
 * 이미지(썸네일, 이미지tag) 크게보기용 레이어팝업
 */
export function useImagePopup() {
  const dispatch = useDispatch();
  const image = async <T>(data?: T, callBack?: () => void) => {
    dispatch(
      rdxPopupOpen({
        type: PopupType.IMAGE,
        title: '이미지 미리보기',
        data,
        isClose: true,
        callBack: callBack,
      }),
    );
  };
  return image;
}

/**
 * 팝업에서 Grid 사용을위해
 */
export function useGridPopup() {
  const dispatch = useDispatch();
  const GridPopup = async <T>(data?: T, title?: string, callBack?: () => void) => {
    dispatch(
      rdxPopupOpen({
        width: 540,
        type: PopupType.GRID,
        title: title,
        data,
        // isClose: true,
        callBack: callBack,
        buttonComponent: Button,
        buttons: [{...commonButton, text: '확인', state: ButtonState.OK}],
      }),
    );
  };

  return GridPopup;
}

/**
 * Icon을 사용한 레이어팝업 (타입별 버튼컴포넌트 디자인이 다름)
 */
export function useIConPopup() {
  const dispatch = useDispatch();
  const IconPopup = async (
    buttonType: 'alert' | 'confirm' | 'delete' = 'alert',
    data?: IconPopupProps,
    title?: string,
    callBack?: (v?: ButtonState) => void,
  ) => {
    const ButtonComponent = () => {
      switch (buttonType) {
        case 'delete':
          return DeletePopupButtonGroup;
        case 'confirm':
          return ConfirmPopupButtonGroup;
        case 'alert':
        default:
          return AlertPopupButtonGroup;
      }
    };

    dispatch(
      rdxPopupOpen({
        width: 400,
        type: PopupType.ICON,
        title: title,
        data,
        callBack: callBack,
        buttonWrapper: ButtonComponent(),
      }),
    );
  };

  return IconPopup;
}


