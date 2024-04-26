import React, { useEffect, useRef, useState } from "react";

export interface ButtonTitleProps {
  data: { title: string; color: string };
  onDataChange: (arg: { title: string; color: string }) => void;
  readOnly?: boolean;
}

export const ButtonTitle = ({
  data,
  onDataChange,
  readOnly,
}: ButtonTitleProps) => {
  const [title, setTitle] = useState(data.title);
  const [color, setColor] = useState(data.color);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    onDataChange({ title: newTitle, color });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    onDataChange({ title, color: newColor });
  };

  const textRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [title]);

  useEffect(() => {
    setTitle(data.title);
    setColor(data.color);
  }, [data.title, data.color]);

  return (
    <div className={"flex gap-x-2 w-full flex-col"}>
      <textarea
        ref={textRef}
        className={
          "bg-transparent border-0 focus:outline-none text-md grow-1 w-full h-auto"
        }
        style={{
          height: "auto",
          resize: "none",
        }}
        value={title}
        onChange={handleTitleChange}
        readOnly={readOnly}
        placeholder="Main Button Title"
        onInput={adjustTextareaHeight}
      />
      <div className="flex items-center gap-[10px] mb-4">
        <span className="text-[10px] mb-2">Button Color</span>
        <input
          type="color"
          name="color"
          id="color"
          value={color}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};
