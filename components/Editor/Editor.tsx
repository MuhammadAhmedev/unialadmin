"use client"
import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";

// Import Editor.js tools dynamically
const importTools = async () => {
  const Header = (await import("@editorjs/header")).default;
  const Table = (await import("@editorjs/table")).default;
  const List = (await import("@editorjs/list")).default;
  const LinkTool = (await import("@editorjs/link")).default;
  const RawTool = (await import("@editorjs/raw")).default;
  const SimpleImage = (await import("@editorjs/simple-image")).default;
  const Checklist = (await import("@editorjs/checklist")).default;
  const Embed = (await import("@editorjs/embed")).default;
  const Quote = (await import("@editorjs/quote")).default;
  const Paragraph = (await import("@editorjs/paragraph")).default;
  const ImageTool = (await import("@editorjs/image")).default;

  return {
    header: {
      class: Header,
      inlineToolbar: ["marker", "link", "bold", "italic"],
    },
    table: Table,
    list: List,
    linkTool: LinkTool,
    raw: RawTool,
    image: SimpleImage,
    checklist: { class: Checklist, inlineToolbar: true },
    embed: Embed,
    quote: Quote,
    paragraph: { class: Paragraph, inlineToolbar: true },
  };
};

export default function Editor() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const initializeEditor = async () => {
      const tools = await importTools();

      const editorInstance = new EditorJS({
        holder: "editorjs-container", // Unique ID for the container element
        autofocus: true,
        placeholder: "Let`s write an awesome story!",
        inlineToolbar: true, // Enable inline toolbar
        tools,
      });

      editorRef.current = editorInstance;
      setEditorLoaded(true);
    };

    if (typeof window !== "undefined" && !editorLoaded) {
      initializeEditor();
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [editorLoaded]);

  const save = async () => {
    if (editorLoaded && editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        console.log("outputData", outputData);
      } catch (error) {
        console.error("Error while saving editor content:", error);
      }
    }
  };

  return (
    <div className="flex justify-center flex-col mx-auto w-[70%]">
      <div
        id="editorjs-container"
        className=" min-h-[50vh] min-w-[80%] border-[1px] rounded-md"
        style={{border:"1px solid lightgray", borderRadius:"10px", padding:"20px"}}
      />
      <div className="flex justify-center my-[20px]">
        <button
          onClick={save}
          className="bg-red-700 px-8 cursor-pointer py-3 w-fit rounded-[10px] text-white font-bold text-[14px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
