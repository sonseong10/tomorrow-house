import { useInputFile } from "../../../commons/ui/useUihook";
import React, { useCallback, useRef } from "react";
import Button from "./Button";
import InputText from "./InputText";
import type { FileType } from "../../../commons/ui/uiVo";
import type { IValid } from "../../../commons/ui/useValid";

export interface IInputFileProps {
  id?: string;
  /** 파일명 */
  filename: string;
  /** 파일형식 (jpg, png, gif...) */
  accept?: string;
  /** 멀티 아닐때 전달 받는 콜백(filename, filetype, imageData) */
  change?: (filename: string, filetype: string, imageData: string) => void;
  /** 멀티일때 전달받을 콜백 */
  changes?: (value: Array<FileType>) => void;
  buttonText?: string;
  type?: string;
  multiple?: boolean;
}

function InputFile(props: IInputFileProps): JSX.Element {
  const id = props.id === undefined ? "inputfile" : props.id;
  const inputfile = useRef<HTMLInputElement>(null);
  const getFileType = (file: File): Promise<FileType> => {
    return new Promise(res => {
      const fileType = file.type.split("/").pop();
      switch (fileType) {
        case "gif":
          {
            const reader = new FileReader();
            reader.onload = e => {
              res({
                filename: file.name,
                filetype: fileType,
                imageData: e.target?.result as string,
              } as FileType);
            };
            reader.readAsDataURL(file);
          }
          break;
        case "jpg":
        case "png":
        case "jpeg":
          {
            const image = new Image();
            const canvas = document.createElement("canvas");
            image.src = URL.createObjectURL(file);
            image.onload = () => {
              canvas.width = image.width;
              canvas.height = image.height;
              canvas
                .getContext("2d")
                ?.drawImage(image, 0, 0, image.width, image.height);
              const dataURL = canvas.toDataURL(file.type, 1);
              res({
                filename: file.name,
                filetype: fileType,
                imageData: dataURL,
              } as FileType);
            };
          }
          break;
        default:
          {
            res({ filename: file.name, filetype: fileType, file: file });
          }
          break;
      }
    });
  };
  const changeImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const dump: Array<Promise<FileType>> = [];
      for (let i = 0; i < files.length; i++) {
        dump.push(getFileType(files.item(i)!));
      }
      const temp = await Promise.all(dump);
      if (props.change) {
        props.change(temp[0].filename, temp[0].filetype!, temp[0].imageData!);
      }
      if (props.changes) {
        props.changes(temp);
      }
      e.target.value = "";
    }
  };
  const clickHandler = useCallback(() => {
    if (inputfile.current) {
      inputfile.current.click();
    }
  }, []);

  return (
    <>
      <input
        type="file"
        ref={inputfile}
        id={id}
        accept={props.accept ? props.accept : '.gif, .jpg, .png'}
        style={{visibility: 'hidden', width: '0px'}}
        onChange={changeImageFile}
        multiple={props.multiple ? props.multiple : false}
      />
      <InputText id="filetext" value={props.filename} disabled={true} />
      {props.type && props.type === 'ICON' ? (
        <Button
          title="등록"
          onClick={clickHandler}
          btnsize="xsm"
          iconname="Edit"
          iconposition="center"
          color="white"
          btntype="border"
          thin
        />
      ) : (
        <Button text={props.buttonText ? props.buttonText : '등록'} onClick={clickHandler} btnsize="xsm" />
      )}
    </>
  );
}
export default InputFile;

export interface IUiInputFileProps {
  id: string;
  init?: string;
  valid?: IValid<FileType>;
  accept?: string;
  buttonText?: string;
  type?: string;
}

/**
 * 리덕스 Ui 에 자동으로 연결하기 위한 컴포넌트
 * ui 는 멀티 제공 안함
 * @param props
 * @returns
 */
export function UiInputFile(props: IUiInputFileProps) {
  const { inputFileValue, changeValue } = useInputFile(
    props.id,
    props.valid as IValid<FileType | FileType[]>,
    props.init
  );
  const changes = (value: Array<FileType>) => {
    changeValue(value[0]);
  };
  return (
    <InputFile
      id={props.id}
      filename={inputFileValue.filename}
      accept={props.accept}
      buttonText={props.buttonText}
      type={props.type}
      changes={changes}
    />
  );
}
