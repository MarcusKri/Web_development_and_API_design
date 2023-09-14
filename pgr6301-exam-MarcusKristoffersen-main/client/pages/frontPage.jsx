import React, { useContext } from "react";
import { ArticlesApiContext } from "../articlesApiContext";
import { useLoading } from "../useLoading";
import { FrontPageArticleCard } from "./frontPageArticleCard";

export function FrontPage() {
  const { listArticles } = useContext(ArticlesApiContext);
  const { loading, error, data } = useLoading(listArticles);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <p id="front-page-p">Login for å lese artikler og legge til artikler</p>
      {data.map((article) => (
        <FrontPageArticleCard key={article.topic} article={article} />
      ))}
    </div>
  );
}
