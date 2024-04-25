"use client"
import Editor from "@/components/Editor/Editor";
import { useEffect, useState } from "react";

const Home = () => {
   const [data, setData] = useState([]);
   const fetchData = async () => {
     try {
       const response = await fetch("/api/post", {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       });
       if (!response.ok) {
         throw new Error("Failed to fetch data");
       }
       const responseData = await response.json();
       console.log("responseData", responseData.results.rows);
       setData(responseData?.results?.rows);
     } catch (error) {
       console.error("Error fetching data:", error.message);
     }
   };

    useEffect(() => {
      fetchData();
    }, []);
  return (
    <div className="my-[50px] w-full">
      <h1 className="text-red-700 font-bold text-[30px] text-center">
        Unial Admin
      </h1>
      <div className="my-[50px]">
        <Editor />
      </div>
      <div className="my-[50px]">
        {/* Render your data here */}
        <ul>
          {data?.map((item, index) => (
            <>
              <li>id: {item?.id}</li>
              <li>Created At: {item?.created_at}</li>
              <li>{JSON.stringify(item?.block)}</li>
              {/* <ul>
                {item?.block?.blocks?.map((key, index) => (
                  <li key={index}>
                    <strong>{key}:</strong> {data[key]}
                  </li>
                ))}
              </ul> */}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
