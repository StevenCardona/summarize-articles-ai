import { useState, useEffect } from "react";
//@ts-ignore
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import type { ArticleDTO } from "../lib/types";

const Demo = () => {
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [article, setArticle] = useState<ArticleDTO>({} as ArticleDTO);
  const [copied, setCopied] = useState("");
  const [allArticles, setAllArticles] = useState<ArticleDTO[]>([]);

  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem("articles");

    if (articlesFromLocalStorage) {
      let allArticlesSaved = JSON.parse(articlesFromLocalStorage);
      setAllArticles(allArticlesSaved);
    }
  }, []);

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await getSummary({ url: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data?.summary };
      setArticle(newArticle);
      setAllArticles([newArticle, ...allArticles]);

      localStorage.setItem(
        "articles",
        JSON.stringify([newArticle, ...allArticles])
      );
    }
  };

  const handleCopy = (copiedUrl: string) => {
    setCopied(copiedUrl);
    navigator.clipboard.writeText(copiedUrl);
    setTimeout(() => setCopied(""), 200);
  };

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
            value={article.url}
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

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div
              className="link_card"
              key={index}
              onClick={() => setArticle(article)}
            >
              <div className="copy_btn">
                <img
                  src={copied == article.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                  onClick={() => handleCopy(article.url)}
                />
              </div>
              <p className="flex-1 font-medium truncate text-gray-500 ">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-center">
            Well, that wasn't supposed to happen... <br></br>{" "}
            <span className="text-gray-700 font-normal">
              {
                //@ts-ignore
                error?.data?.error
              }
            </span>{" "}
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
