"use client"
import React, { useEffect, useRef } from "react";

export interface TitleInputProps {
  data: Record<string, string>;
  onDataChange: (arg: Record<string, string>) => void;
  readOnly?: boolean;
}

export const TitleInput = ({
  data,
  onDataChange,
  readOnly,
}: TitleInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newData = {
      title: event.target.value,
    };
    onDataChange(newData);
  };

  const textRef = useRef<HTMLTextAreaElement>(null); // Set up useRef with proper type

  const adjustTextareaHeight = () => {
    const textarea = textRef.current; // Access current value of the ref
    if (textarea) {
      textarea.style.height = ""; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Call function to adjust textarea height
  }, [data.title]);

  return (
    <div className={"flex gap-x-2 w-full"}>
      <textarea
        ref={textRef} // Assign the ref to the textarea element
        className={
          "bg-transparent border-0 focus:outline-none text-xl grow-1 w-full h-auto"
        }
        style={{
          height: "auto", 
          resize: "none", 
        }}
        value={data.title} 
        onChange={handleChange}
        readOnly={readOnly}
        placeholder="Main Title"
        onInput={adjustTextareaHeight} 
      />
    </div>
  );
};
