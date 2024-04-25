"use client"
import React, { useRef, useEffect, useState } from "react";

export default function Editor() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false)

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const RawTool = (await import("@editorjs/raw")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;
    const Checklist = (await import("@editorjs/checklist")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Quote = (await import("@editorjs/quote")).default;
  
      const tools = {
        header: {
          class: Header,
          inlineToolbar: [ "link", "bold", "italic"],
        },
        table: Table,
        list: List,
        linkTool: LinkTool,
        raw: RawTool,
        image: SimpleImage,
        checklist: { class: Checklist, inlineToolbar: true },
        embed: Embed,
        quote: Quote,
      };

  if (!editorRef.current) {
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      placeholder: "Let`s write an awesome story!",
      inlineToolbar: true,
      tools,
    });
    editorRef.current = editor; 
  } // setEditorLoaded(true);
    // editorRef.current = editorInstance;
  };

   useEffect(() => {
     const init = async () => {
       await initializeEditor();
     };
     if (editorLoaded) {
       init();
       return () => {
         if (editorRef.current) {
           editorRef.current.destroy();
         }
       };
     }
   }, [editorLoaded]);

  useEffect(()=>{
 if (typeof window !== "undefined") {
   setEditorLoaded(true);
 }
  },[])

 

  // useEffect(() => {

  //   if (typeof window !== "undefined" && !editorLoaded) {
  //     setEditorLoaded(true)
  //   }

  //   return () => {
  //     if (editorRef.current && editorRef.current.destroy) {
  //       editorRef.current.destroy();
  //     }
  //   };
  // }, [editorLoaded]);



const save = async () => {
  try {
    setLoading(true)
    if (editorRef.current) {
      editorRef.current.save().then(async (outputData) => {
        // Define the callback function as async
        console.log("outputData", outputData);
        try {
          const saveInDb = await fetch("/api/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(outputData),
          });
          console.log("Save In DB Response:", saveInDb);
        } catch (error) {
          console.error(
            "Error while saving editor content to the database:",
            error
          );
        }
      });
    } else {
      console.log("Editor is not initialized");
    }
  } catch (error) {
    console.error("Error while saving editor content:", error);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex justify-center flex-col mx-auto w-[70%]">
      <div
        id="editorjs"
        className="min-h-[50vh] min-w-[80%] border-[1px] rounded-md"
        style={{ border: "1px solid lightgray", padding: "20px" }}
      />
      <div className="flex justify-center my-[20px]">
        <button
          onClick={save}
          disabled={loading}
          className="bg-red-700 px-8 cursor-pointer py-3 w-fit rounded-[10px] text-white font-bold text-[14px]"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
