import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <section className="mt-16 w-full max-w-lx">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={(e) => handlerSubmit(e)}
        >
          <img
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            className="url_input peer"
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            value={""}
            required
            placeholder="Enter the URL"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
      </div>
    </section>
  );
};

export default Demo;
