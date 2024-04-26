"use client"
import { CustomTool } from "./GenericTool";
import { TitleInput } from "./TitleInput";

const TitleTool = CustomTool.createTool(
  // ⬇️ Here is the component that will be used as the custom "tool" / "block" inside EditorJS.
  TitleInput,
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 10l3-1v10M3 5v7m0 0v7m0-7h8m0-7v7m0 0v7"/></svg>',
    title: "Main Title",
  }
);

export default TitleTool;
