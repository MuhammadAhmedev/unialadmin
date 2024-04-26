"use client";
import { CustomTool } from "../BigTitle/GenericTool";
import { ButtonTitle } from "./Button";

const ButtonTool = CustomTool.createTool(
  // ⬇️ Here is the component that will be used as the custom "tool" / "block" inside EditorJS.
  ButtonTitle,
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" style={{ cursor: "pointer" }}> <rect width="30" height="30" rx="6" fill="gray" stroke="#4CAF50" strokeWidth="2" /> <path d="M10 10h10v10H10z" fill="white" /></svg>',
    title: "Main Button",
  }
);

export default ButtonTool;
