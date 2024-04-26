"use client"
import ComponentTable from "@/components/ComponentTable/ComponentTable";
import Editor from "@/components/Editor/Editor";
import {  useState } from "react";

const Home = () => {
    const [initialContent, setInitialContent] = useState(null);
  return (
    <div className="my-[50px] w-full">
      <h1 className=" font-bold text-[30px] text-center">Unial Admin</h1>
      <div className="my-[50px]">
        <Editor initialContent={initialContent} />
      </div>
      <div className="my-[50px]">
        <ComponentTable setInitialContent={setInitialContent} />
      </div>
    </div>
  );
};

export default Home;
