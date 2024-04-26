"use client"
import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import type { OutputData } from "@editorjs/editorjs";
import Editor from "../../Editor";

const meta: Meta<typeof Editor> = {
  title: "Components/Editor",
  component: Editor,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Editor>;

export const Default: Story = {
  render: (args) => {
    const [data, setData] = useState<OutputData>();

    return <Editor {...args} data={data} onChange={setData} />;
  },
  args: {
    holder: "editorjs",
  } as any,
};
