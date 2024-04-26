import React, { useRef, useEffect, useState } from "react";
import TitleTool from "./tools/BigTitle/TitleTool";
import ButtonTool from "./tools/Button/ButtonTool";
import { Input } from "../ui/input";

export default function Editor({
  initialContent,
  data,
  onChange,
}: {
  initialContent?: any;
  data?: any;
  onChange?: any;
}) {
  console.log("initialContent", initialContent);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [componentName, setComponentName] = useState("");

  useEffect(() => {
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
        header: Header,
        table: Table,
        list: List,
        linkTool: LinkTool,
        raw: RawTool,
        image: SimpleImage,
        checklist: Checklist,
        embed: Embed,
        quote: {
          class: Quote,
          config: {
            quotePlaceholder: "Quote here...",
            captionPlaceholder: "Author...",
          },
        },
        maintitle: TitleTool,
        buttonTool: ButtonTool,
      };

      const editorInstance = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        placeholder: "Let`s write an awesome story!",
        inlineToolbar: true,
        tools,
        data: initialContent
          ? {
              time: initialContent.block.time,
              blocks: initialContent.block.editorData.blocks,
            }
          : ({} as any),
      } as any);

      editorRef.current = editorInstance;
      setEditorLoaded(true);
      
    };

    initializeEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [initialContent]);

  useEffect(() => {
    if (initialContent) {
      setComponentName(initialContent.block?.componentName || "");
    }
  }, [initialContent]);

  const save = async () => {
    try {
      setLoading(true);
      if (editorRef.current) {
        const outputData = await editorRef.current.save();
        const dataToSave = {
          componentName,
          editorData: outputData,
        };
        console.log("outputData", dataToSave);
        try {
          const saveInDb = await fetch("/api/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSave),
          });
          console.log("Save In DB Response:", saveInDb);
        } catch (error) {
          console.error(
            "Error while saving editor content to the database:",
            error
          );
        }
      } else {
        console.log("Editor is not initialized");
      }
    } catch (error) {
      console.error("Error while saving editor content:", error);
    } finally {
      setLoading(false);
    }
  };

  const UpdateData = async () => {
     try {
       setLoading(true);
       if (editorRef.current) {
         const outputData = await editorRef.current.save();
         const dataToSave = {
           componentName,
           editorData: outputData,
         };
         console.log("outputData", dataToSave);
         try {
           const UpdateInDb = await fetch("/api/post", {
             method: "PUT",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               block: dataToSave,
               id: initialContent.id,
             }),
           });
           console.log("Update Data In DB Response:", UpdateInDb);
         } catch (error) {
           console.error(
             "Error while Updateing editor content to the database:",
             error
           );
         }
       } else {
         console.log("Editor is not initialized");
       }
     } catch (error) {
       console.error("Error while Updting editor content:", error);
     } finally {
       setLoading(false);
     }
  }

  return (
    <>
      <div className="my-[50px] flex justify-center items-center">
        <Input
          className="w-[50%]  rounded-[10px]"
          placeholder="Enter your component name"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
        />
      </div>
      <div className="flex justify-center flex-col mx-auto w-[70%]">
        <div
          id="editorjs"
          className="min-h-[50vh] min-w-[80%] border-[1px] rounded-md"
          style={{ border: "1px solid lightgray", padding: "20px" }}
        />
        <div className="flex justify-center my-[20px]">
          {initialContent ? (
            <button
              onClick={UpdateData}
              disabled={loading}
              className="bg-red-700 px-8 cursor-pointer py-3 w-fit rounded-[10px] text-white font-bold text-[14px]"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          ) : (
            <button
              onClick={save}
              disabled={loading}
              className="bg-red-700 px-8 cursor-pointer py-3 w-fit rounded-[10px] text-white font-bold text-[14px]"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
