"use client"
import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";

export default function ComponentTable({ setInitialContent }: { setInitialContent?:any}) {
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
    <div>
      <div className="overflow-y-auto">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-surface ">
              <thead className="border-b border-neutral-200 font-medium ">
                <tr>
                  <th scope="col" className="px-5 py-4">
                    #
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Component Name
                  </th>

                  <th scope="col" className="px-5 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <>
                  {data?.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {item?.id}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          {item?.block?.componentName}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 flex">
                          <button onClick={() => setInitialContent(item)}>
                            <CiEdit className="text-primary text-xl" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
