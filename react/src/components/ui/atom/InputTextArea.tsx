import type { IUseInputEventParam, IUseTextArea } from "../../../commons/hook/hookVo";
import useTextArea from "../../../commons/hook/useTextArea";
import { useInputText } from "../../../commons/ui/useUihook";
import type { IValid } from "../../../commons/ui/useValid";
import React, { type RefObject, useCallback, useEffect, useState } from "react";
import styled, { type CSSObject } from "styled-components";
import type { Size } from "../../../styles/stylesVo";

const TextArea = styled.textarea<{ size?: { width?: Size; height?: string } }>`
  padding: 10px;
  width: ${props =>
    props.size && props.size.width ? props.size.width : "100%"};
  height: ${props =>
    props.size && props.size.height ? props.size.height : "300px"};
  font: inherit;
  font-size: ${props => props.theme.fontSize.text.default};
  border: 1px solid var(--border-primary);
  border-radius: 4px;
  resize: none;
  box-sizing: border-box;
  &:focus {
    border-color: var(--border-focus);
  }

  /* &:hover {
    border-color: var(--border-hover);
  } */
  &:-moz-read-only {
    border-color: var(--primary);
    background-color: var(--bg-form);
    color: var(--font-primary);
  }
  &:read-only,
  &:disabled,
  &.is-disabled {
    border-color: var(--border-hover);
    background-color: var(--bg-table-head);
    color: var(--font-disabled);
    cursor: not-allowed;
  }
`;

interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  inputSize?: string;
  target?: RefObject<HTMLTextAreaElement>;
  refTarget?: RefObject<HTMLTextAreaElement>;
  valid?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    emoji?: boolean;
  };
  change?: (value: string, id?: string) => void;
  next?: (value: IUseInputEventParam) => void;
  checkValid?: (value: boolean) => void;
  size?: { width?: string; height?: string };
}

const InputTextArea = (props: ITextAreaProps): JSX.Element => {
  const [prev, setPrev] = useState<NodeJS.Timeout>();
  const stepChangeHandler = useCallback(
    (value: IUseInputEventParam) => {
      if (prev !== undefined) {
        clearTimeout(prev);
      }
      if (value.type === "next") {
        if (props.change) {
          props.change(value.value as string, value.id);
        }
      } else {
        const st = setTimeout(() => {
          if (props.change) {
            props.change(value.value as string, value.id);
          }
          setPrev(undefined);
        }, 300);
        setPrev(st);
      }
    },
    [prev]
  );
  const inputobj: IUseTextArea = useTextArea<HTMLTextAreaElement>({
    id: props.id,
    placeholder: props.placeholder,
    initalValue: props.value,
    target: props.target,
    onChangeHandler: stepChangeHandler,
    onNextHandler: props.next,
  });

  useEffect(() => {
    if (props.value !== inputobj.value) {
      if (inputobj.setValue) {
        inputobj.setValue(props.value as string);
      }
    }
  }, [props.value]);
  return (
    <TextArea
      ref={props.refTarget}
      disabled={props.disabled}
      id={inputobj.id}
      placeholder={inputobj.placeholder}
      defaultValue={inputobj.value}
      onChange={inputobj.onChange}
      onBlur={inputobj.onBlur}
      className={props.className}
      onKeyPress={inputobj.onKeyPress}
      readOnly={props.readOnly}
      style={props.style}
    />
  );
};

export default React.memo(InputTextArea);

interface IUiProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  init?: string;
  placeholder?: string;
  inputSize?: string;
  hidden?: boolean;
  valid?: IValid<string>;
  next?: (value?: string) => void;
  height?: number | string;
  style?: CSSObject;
}

export function UiInputTextArea(props: IUiProps): JSX.Element {
  const { inputTextValue, changeValue } = useInputText(
    props.id,
    props.valid,
    props.init
  );
  const nextHandler = (e: IUseInputEventParam) => {
    changeValue(e.value !== undefined ? e.value : "");
    if (props.next) {
      props.next(e.value);
    }
  };
  return (
    <InputTextArea
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      inputSize={props.inputSize}
      disabled={props.disabled}
      readOnly={props.readOnly}
      maxLength={props.maxLength}
      hidden={props.hidden}
      className={props.className}
      change={changeValue}
      next={nextHandler}
      style={props.style}
      value={inputTextValue ? inputTextValue : ""}
    />
  );
}
