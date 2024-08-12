import type {
  IUseInput,
  IUseInputEventParam,
  InputType,
} from "../../../commons/hook/hookVo";
import useInput from "../../../commons/hook/useInput";
import { useInputText } from "../../../commons/ui/useUihook";
import { type IValid, useValid } from "../../../commons/ui/useValid";
import React, { type RefObject, useEffect, useState } from "react";
import { Input } from "../../../styles/components";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: InputType;
  placeholder?: string;
  value?: string;
  inputSize?: string;
  hidden?: boolean;
  target?: RefObject<HTMLInputElement>;
  refTarget?: RefObject<HTMLInputElement>;
  isPrice?: boolean;
  change?: (value: string, id?: string) => void;
  next?: (value: string) => void;
}

// TODO: InputText type에 text 디폴트로 설정 필요

function InputText(props: IProps): JSX.Element {
  const [prev, setPrev] = useState<number>();

  const test = (value?: string) => {
    if (value) {
      return props.isPrice
        ? Number(value.replaceAll(",", "")).toLocaleString().toString()
        : value;
    } else {
      return "";
    }
  };

  const stepChangeHandler = (value: IUseInputEventParam) => {
    if (prev !== undefined) {
      clearTimeout(prev);
    }
    if (value.type === "next") {
      if (props.change) {
        props.change(value.value as string, value.id);
      }
      if (props.next) {
        props.next(value.value as string);
      }
    } else {
      const st = setTimeout(() => {
        if (props.change) {
          if (props.isPrice !== undefined && props.isPrice) {
            props.change((value.value as string).replaceAll(",", ""), value.id);
          } else {
            props.change(value.value as string, value.id);
          }
        }
        setPrev(undefined);
      }, 300);
      setPrev(st);
    }
  };
  const inputobj: IUseInput = useInput<HTMLInputElement>({
    id: props.id,
    type: props.type,
    placeholder: props.placeholder,
    initalValue: props.value,
    target: props.target,
    onChangeHandler: stepChangeHandler,
    onNextHandler: stepChangeHandler,
  });

  useEffect(() => {
    if (test(props.value) !== test(inputobj.value)) {
      if (inputobj.setValue) {
        inputobj.setValue(props.value as string);
      }
    }
  }, [props.value]);

  return (
    <Input
      ref={props.refTarget}
      disabled={props.disabled}
      id={inputobj.id ? inputobj.id : props.id}
      type={inputobj.type}
      placeholder={inputobj.placeholder}
      value={inputobj.value ? test(inputobj.value) : inputobj.value}
      onChange={inputobj.onChange}
      onBlur={inputobj.onBlur}
      className={props.className}
      onKeyPress={inputobj.onKeyPress}
      readOnly={props.readOnly}
      inputSize={props.inputSize}
      maxLength={props.maxLength}
      hidden={props.hidden}
      onWheel={e => e.currentTarget.blur()}
    />
  );
}
export default React.memo(InputText);

interface IValidProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: InputType;
  placeholder?: string;
  value?: string;
  inputSize?: string;
  target?: RefObject<HTMLInputElement>;
  refTarget?: RefObject<HTMLInputElement>;
  change?: (value: string, id?: string) => void;
  next?: (value: string) => void;
  autocomplete?: string;
  valid?: IValid<string>;
  checkValid?: (value: boolean) => void;
}

export function ValidInputText(props: IValidProps): JSX.Element {
  const { validValue, changeValue } = useValid(
    props.id ? props.id : `InputText${Math.random()}`,
    props.valid,
    (value?: string) => {
      if (props.change) {
        props.change(value!, props.id);
      }
      if (props.checkValid) {
        props.checkValid(validValue!);
      }
    },
    props.value
  );
  return (
    <InputText
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      target={props.target}
      refTarget={props.refTarget}
      inputSize={props.inputSize}
      disabled={props.disabled}
      readOnly={props.readOnly}
      maxLength={props.maxLength}
      className={props.className}
      change={changeValue}
      value={props.value}
    />
  );
}

export interface IUiProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: InputType;
  init?: string;
  placeholder?: string;
  target?: RefObject<HTMLInputElement>;
  refTarget?: RefObject<HTMLInputElement>;
  inputSize?: string;
  hidden?: boolean;
  valid?: IValid<string>;
  isPrice?: boolean;
  next?: (value?: string) => void;
  onchange?: (value?: string) => void;
}

export function UiInputText(props: IUiProps): JSX.Element {
  const { inputTextValue, changeValue } = useInputText(
    props.id,
    props.valid,
    props.init
  );
  const nextHandler = (value: string) => {
    changeValue(value);
    if (props.next) {
      props.next(value);
    }
    if (props.onchange) {
      props.onchange(value);
    }
  };

  const inputChange = (value: string) => {
    changeValue(props.isPrice ? value.replaceAll(",", "") : value);
    if (props.onchange) {
      props.onchange(value);
    }
  };

  return (
    <InputText
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      target={props.target}
      refTarget={props.refTarget}
      inputSize={props.inputSize}
      disabled={props.disabled}
      readOnly={props.readOnly}
      maxLength={props.maxLength}
      hidden={props.hidden}
      className={props.className}
      change={inputChange}
      next={nextHandler}
      value={inputTextValue ? inputTextValue : ""}
      isPrice={props.isPrice}
    />
  );
}
