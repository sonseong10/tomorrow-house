import moment, { type MomentInput } from "moment";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useCalender } from "../../../commons/layers/store/layerHook";
import { Input } from "../../../styles/components";
import { isFullDate } from "../../../commons/utils";
import { useInputText } from "../../../commons/ui/useUihook";
import type { IValid } from "../../../commons/ui/useValid";
import SVG from "../../../commons/styles/svgIcon";

const DatePicker = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 0;
  border-color: var(--border-primary);
  height: 36px;
  width: 135px;
  border: 0;
  position: relative;
`;

const DatePickerInput = styled(Input)`
  width: 100% !important;
  &:focus {
    border-color: var(--border-focus);
    & + span {
      background-image: url(${SVG.DatePicker("#3e3f40")});
    }
  }
`;

const DatePickerIcon = styled.span`
  background-image: url(${SVG.DatePicker("#515355")});
  position: absolute;
  display: inline-block;
  top: 50%;
  right: 8px;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 0;
  background-position: 0 0;
`;

interface IInputDateProps {
  value?: string;
  disableCondition?: IDisableCondition;
  change?: (date: string) => Promise<void> | void;
}

interface IDisableCondition {
  baseDate?: string;
  directionType?: "before" | "after";
  calc?: {
    calcType: "day" | "month" | "year";
    calcNum: number;
  };
}

function hasDate(time: Date | string | undefined): string {
  return time ? moment(time).format("YYYY-MM-DD") : "연도.월.일";
}

function InputDate(props: IInputDateProps): JSX.Element {
  const { open, close } = useCalender<{
    currentDate: Date;
    disableCondition?: IDisableCondition;
  }>();
  const [value, setValue] = useState(hasDate(props.value));
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const onKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      if (isFullDate(value)) {
        setValue(value);
        if (props.change) {
          props.change(hasDate(value));
        }
      } else {
        setValue(hasDate(props.value));
      }
      (document.activeElement as HTMLElement).blur();
      close();
    }
  };
  const clickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const date = await open(
      {
        currentDate: props.value ? new Date(hasDate(props.value)) : new Date(),
        disableCondition: props.disableCondition,
      },
      e
    );

    if (date) {
      const time = moment(date as MomentInput).format("YYYY-MM-DD");
      if (props.change) {
        props.change(time);
      }
      setValue(time);
    }
  };
  useEffect(() => {
    if (value !== props.value) {
      setValue(hasDate(props.value));
    }
  }, [props.value, props.disableCondition]);
  return (
    <DatePicker>
      <DatePickerInput
        type="text"
        onChange={changeHandler}
        onKeyPress={onKeyPress}
        value={value}
        onClick={clickHandler}
      />
      <DatePickerIcon />
    </DatePicker>
  );
}
export default React.memo(InputDate);

interface IUiInputDateProps {
  id: string;
  init?: string;
  disableCondition?: IDisableCondition;
  valid?: IValid<string>;
  change?: (date?: string) => Promise<void> | void;
}

export function UiInputDate(props: IUiInputDateProps): JSX.Element {
  const { inputTextValue, changeValue } = useInputText(
    props.id,
    props.valid,
    props.init,
    props.change
  );
  return (
    <InputDate
      change={changeValue}
      value={inputTextValue ? inputTextValue : ""}
      disableCondition={props.disableCondition}
    />
  );
}
