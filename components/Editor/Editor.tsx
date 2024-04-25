import React, { useRef, useEffect, useState } from "react";

export default function Editor({ initialContent }) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

      // Import other tools...

      const tools = {
        header: {
          class: Header,
          inlineToolbar: ["link", "bold", "italic"],
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

      const editorInstance = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        placeholder: "Let`s write an awesome story!",
        inlineToolbar: true,
        tools,
        data: initialContent
          ? {
              time: initialContent.time,
              blocks: initialContent.block.blocks,
            }
          : ({} as any),
      });

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

  const save = async () => {
    try {
      setLoading(true);
      if (editorRef.current) {
        const outputData = await editorRef.current.save();
        // Save data to the database
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
