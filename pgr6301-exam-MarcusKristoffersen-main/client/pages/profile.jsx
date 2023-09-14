import { useLoading } from "../useLoading";
import { Link } from "react-router-dom";
import { FrontPageArticleCard } from "./frontPageArticleCard";
import React, { useContext } from "react";
import { ArticlesApiContext } from "../articlesApiContext";

export function Profile({ user }) {
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
      <div id={"userinfo"}>
        <div>
          <h1>Profile for {user.google.name}</h1>
        </div>
        <div>
          <h1>{user.google.email}</h1>
        </div>
        <div>
          <img src={user.google.picture} alt={"Profile picture"} />
        </div>
      </div>
      <div id={"profile_links"}>
        <div>
          <Link to={"/articles"}>Les artikler</Link>
        </div>
        <div>
          <Link to={"/articles/new"}>Legg til artikkel</Link>
        </div>
      </div>
      {data.map((article) => (
        <FrontPageArticleCard key={article.topic} article={article} />
      ))}
    </div>
  );
}
