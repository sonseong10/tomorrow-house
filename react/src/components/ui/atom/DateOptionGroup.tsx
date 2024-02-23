import { UiType } from "../../../commons/ui/uiVo";
import { useInputValue, useSetRadio, useUiAction } from "../../../commons/ui/useUihook";
import type { IValid } from "../../../commons/ui/useValid";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { DateGroup } from "../../../styles/components";
import InputDate, { UiInputDate } from "./InputDate";
import RadioGroup, { type IRadioItem, UiRadioGroup } from "./RadioGroup";
import { UiDateOptionGroupType } from "../uiVo";

interface IDateOptionGroupProps {
  start?: string;
  end?: string;
  onlyDate?: boolean;
  disableCondition?: {
    start?: {
      baseDate?: string;
      directionType: "before" | "after";
      calc?: {
        calcType: "day" | "month" | "year";
        calcNum: number;
      };
    };
    end?: {
      baseDate?: string;
      directionType: "before" | "after";
      calc?: {
        calcType: "day" | "month" | "year";
        calcNum: number;
      };
    };
  };
  list?: Array<IRadioItem>;
  change?: (start?: string, end?: string) => void;
  name?: string;
}

const DateList: Array<IRadioItem> = [
  { id: "today", text: "오늘" },
  { id: "yesterday", text: "어제" },
  { id: "threeday", text: "3일" },
  { id: "sevenday", text: "7일" },
  { id: "month", text: "1개월" },
  { id: "threemonth", text: "3개월" },
];

function DateOptionGroup(props: IDateOptionGroupProps): JSX.Element {
  const [radio, setRadio] = useState<number | undefined>(undefined);
  const [start, setStart] = useState<string | undefined>(props.start);
  const [end, setEnd] = useState<string | undefined>(props.end);
  const inputDateStartHandler = useCallback(
    (select: string) => {
      setRadio(undefined);
      setStart(select);
      if (props.change) {
        props.change(select, end);
      }
    },
    [start, end, props.disableCondition]
  );
  const inputDateEndHandler = useCallback(
    (select: string) => {
      setRadio(undefined);
      setEnd(select);

      if (props.change) {
        props.change(start, select);
      }
    },
    [start, end, props.disableCondition]
  );
  const radioSelectHandler = useCallback((select: number) => {
    const temp = new Date();
    switch (select) {
      case 1:
        temp.setDate(temp.getDate() - 1);
        break;
      case 2:
        temp.setDate(temp.getDate() - 3);
        break;
      case 3:
        temp.setDate(temp.getDate() - 7);
        break;
      case 4:
        temp.setMonth(temp.getMonth() - 1);
        break;
      case 5:
        temp.setMonth(temp.getMonth() - 3);
        break;
    }
    const tempE = moment(new Date()).format("YYYY-MM-DD");
    const tempS = moment(temp).format("YYYY-MM-DD");
    setEnd(tempE);
    setStart(tempS);
    if (props.change) {
      props.change(tempS, tempE);
    }
    setRadio(select);
  }, []);
  useEffect(() => {
    if (props.start !== start) {
      setStart(props.start);
      setRadio(undefined);
    }

    if (props.end !== end) {
      setEnd(props.end);
      setRadio(undefined);
    }
  }, [props.start, props.end, props.disableCondition]);
  return (
    <>
      <DateGroup>
        <InputDate
          value={start}
          disableCondition={props.disableCondition?.start}
          change={inputDateStartHandler}
        />
        <span>-</span>
        <InputDate
          value={end}
          disableCondition={
            props.disableCondition
              ? { ...props.disableCondition?.end, baseDate: start }
              : undefined
          }
          change={inputDateEndHandler}
        />
      </DateGroup>
      {props.onlyDate ? (
        <></>
      ) : (
        <RadioGroup
          data={DateList}
          type="button"
          name={props.name ? `termdte_${props.name}` : "termdate"}
          selected={radio}
          change={radioSelectHandler}
        />
      )}
    </>
  );
}

export default React.memo(DateOptionGroup);

interface IUiDateOptionGroupProps {
  id: string;
  onlyDate?: boolean;
  list?: Array<IRadioItem>;
  dataInit?: { start?: string; end?: string };
  disableCondition?: {
    start?: {
      baseDate?: string;
      directionType: "before" | "after";
      calc?: {
        calcType: "day" | "month" | "year";
        calcNum: number;
      };
    };
    end?: {
      baseDate?: string;
      directionType: "before" | "after";
      calc?: {
        calcType: "day" | "month" | "year";
        calcNum: number;
      };
    };
  };
  name?: string;
  callback?: (select: string | number) => {
    startDate: string;
    endDate: string;
  };
  valid?: IValid<string>;
}

export function UiDateOptionGroup(props: IUiDateOptionGroupProps): JSX.Element {
  const { add, commit } = useUiAction();
  const startValue = useInputValue(props.id + UiDateOptionGroupType.Start);
  const radio = useSetRadio(props.id + UiDateOptionGroupType.Radio);
  const inputDateStartHandler = () => {
    radio.changeValue("");
  };
  const inputDateEndHandler = () => {
    radio.changeValue("");
  };
  const radioSelectHandler = (select?: string | number) => {
    if (select !== undefined) {
      let tempE: string;
      let tempS: string;
      const temp = new Date();

      if (props.callback) {
        const { startDate, endDate } = props.callback(select);
        tempE = endDate;
        tempS = startDate;
      } else {
        switch (select) {
          case 1:
            temp.setDate(temp.getDate() - 1);
            break;
          case 2:
            temp.setDate(temp.getDate() - 3);
            break;
          case 3:
            temp.setDate(temp.getDate() - 7);
            break;
          case 4:
            temp.setMonth(temp.getMonth() - 1);
            break;
          case 5:
            temp.setMonth(temp.getMonth() - 3);
            break;
        }
        tempE = moment().format("YYYY-MM-DD");
        tempS = moment(temp).format("YYYY-MM-DD");
      }
      add(UiType.INPUT_TEXT, props.id + UiDateOptionGroupType.Start, tempS);
      add(UiType.INPUT_TEXT, props.id + UiDateOptionGroupType.End, tempE);
      commit();
    }
  };
  return (
    <>
      <DateGroup>
        <UiInputDate
          id={props.id + UiDateOptionGroupType.Start}
          disableCondition={props.disableCondition?.start}
          change={inputDateStartHandler}
          init={props.dataInit?.start}
        />
        <span>-</span>
        <UiInputDate
          id={props.id + UiDateOptionGroupType.End}
          disableCondition={
            props.disableCondition
              ? {
                  ...props.disableCondition?.end,
                  baseDate: startValue.inputTextValue,
                }
              : undefined
          }
          change={inputDateEndHandler}
          init={props.dataInit?.end}
        />
        {props.onlyDate || (
          <UiRadioGroup
            data={props.list ? props.list : DateList}
            type="button"
            name={props.id + UiDateOptionGroupType.Radio}
            change={radioSelectHandler}
          />
        )}
      </DateGroup>
    </>
  );
}
