import AbsPopup from "../../../commons/popup/display/AbsPopup";
import { useClosePopup, usePopupData } from "../../../commons/popup/store/absPopupHook";
import { ButtonState } from "../../../commons/popup/store/absPopupVo";
import SVG from "../../../commons/styles/svgIcon";
import type { ButtonIcon } from "../../../commons/styles/ComponentsType";
import { ElementGroup, Text, Title } from "../../../styles/components";
import { styled } from "../../../styles/theme";
import { PopupType } from "../PopupType";
import Button from "../../../components/ui/atom/Button";

export type IconPopupProps = {
  iconType: ButtonIcon;
  iconColor: string;
  title?: string;
  desc?: string;
};

const ButtonGroupWrapper = styled(ElementGroup.Row)`
  width: 100%;
  justify-content: center;
  padding: 6px;

  button {
    flex: 1;
    margin: 0;
    font-weight: 400;
  }
`;

export function DeletePopupButtonGroup(): JSX.Element {
  const {close} = useClosePopup(PopupType.ICON);
  return (
    <ButtonGroupWrapper>
      <Button text="취소" btntype="ghost" color="gray" btnsize="md" onClick={() => close(ButtonState.NO)} />
      <Button text="삭제하기" btntype="ghost" color="negative" btnsize="md" onClick={() => close(ButtonState.OK)} />
    </ButtonGroupWrapper>
  );
}

export function ConfirmPopupButtonGroup(): JSX.Element {
  const {close} = useClosePopup(PopupType.ICON);
  return (
    <ButtonGroupWrapper>
      <Button text="취소" btntype="ghost" color="gray" btnsize="md" onClick={() => close(ButtonState.NO)} />
      <Button text="확인" btntype="ghost" color="dark" btnsize="md" onClick={() => close(ButtonState.OK)} />
    </ButtonGroupWrapper>
  );
}

export function AlertPopupButtonGroup(): JSX.Element {
  const {close} = useClosePopup(PopupType.ICON);
  return (
    <ButtonGroupWrapper>
      <Button text="확인" btntype="ghost" color="dark" btnsize="md" onClick={() => close(ButtonState.OK)} />
    </ButtonGroupWrapper>
  );
}

export function ConfrimPopupButtonGroup(): JSX.Element {
  const {close} = useClosePopup(PopupType.ICON);
  return (
    <ButtonGroupWrapper>
      <Button text="취소" btntype="ghost" btnsize="md" onClick={() => close(ButtonState.NO)} />
      <Button text="삭제하기" btntype="ghost" color="negative" btnsize="md" onClick={() => close(ButtonState.OK)} />
    </ButtonGroupWrapper>
  );
}

const Icon = styled.div<{name?: string; color?: string}>`
  margin-bottom: 18px;
  width: 100px;
  height: 100px;
  background: ${(props: {name: string; color: string | undefined}) =>
    props.name && props.color ? `url(${SVG[props.name as ButtonIcon](props.color)}) no-repeat center` : ''};
  background-size: 68%;
  border: 4px solid ${(props: {color: string}) => (props.color ? props.color : '#000')};
  border-radius: 50px;
`;

function IconPopup(): JSX.Element {
  const { popupDo } = usePopupData<IconPopupProps>(PopupType.ICON);
  return (
    <AbsPopup type={PopupType.ICON} borderShape={4}>
      <ElementGroup.Col flexcontent="center">
        <Icon name={popupDo.data?.iconType} color={popupDo.data?.iconColor} />
        {popupDo.data?.title && (
          <Title align="center" size="sm">
            {popupDo.data.title
              .replace(/<br(.*?)\/>/gims, `<br/>`)
              .split('<br/>')
              .map((line, idx) => {
                return (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                );
              })}
          </Title>
        )}
        {popupDo.data?.desc && (
          <Text align="center" color="description">
            {popupDo.data.desc
              .replace(/<br(.*?)\/>/gims, `<br/>`)
              .split('<br/>')
              .map((line, idx) => {
                return (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                );
              })}
          </Text>
        )}
      </ElementGroup.Col>
    </AbsPopup>
  );
}

export default IconPopup;
