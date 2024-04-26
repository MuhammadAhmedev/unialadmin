"use client"
import React, { useEffect, useRef } from "react";
import type { OutputData, ToolConstructable } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";
import TitleTool from "./TitleTool";
import { ButtonTitle } from "../Button/Button";
// import QuestionTool from "@/modules/Editor/tools/QuestionTool/TextsQuestionTool";
// import DisplayImageTool from "@/modules/Editor/tools/DisplayImageTool/DisplayImageTool";

const tools: { [toolName: string]: ToolConstructable } = {
  titleTool: TitleTool as unknown as ToolConstructable,
  buttonTool: ButtonTitle as unknown as ToolConstructable,
//   displayImageTool: DisplayImageTool as unknown as ToolConstructable,
//   imagesQuestionTool: ImagesQuestionTool as unknown as ToolConstructable,
//   textsQuestionTool: TextsQuestionTool as unknown as ToolConstructable,
};

export interface EditorBlockProps {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
}

const EditorBlock = ({ data, onChange, holder }: EditorBlockProps) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        holder,
        tools,
        data,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <div
      id={holder}
      className={"!mb-0 bg-gray-100 h-full !p-2 overflow-x-auto"}
    />
  );
};

export default EditorBlock;
