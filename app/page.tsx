import Editor from "@/components/Editor/Editor";

const Home = () => {
  return (
    <div className=" my-[50px] w-full">
      <h1 className="text-red-700 font-bold text-[30px] text-center">Unial Admin</h1>
      <div className="my-[50px]">
        <Editor/>
      </div>
    </div>
  );
};

export default Home;
