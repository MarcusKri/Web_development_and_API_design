import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";
import { ListArticles } from "./pages/listArticles";
import { AddNewArticle } from "./pages/addNewArticle";
import React, { useContext } from "react";

import "./application.css";
import { LoginPage } from "./pages/loginPage";
import { useLoading } from "./useLoading";
import { ArticlesApiContext } from "./articlesApiContext";
import { Profile } from "./pages/profile";
import { NewArticleUpdate } from "./pages/newArticleUpdate";

function UserActions({ user }) {
  if (!user || Object.keys(user).length === 0) {
    return <Link to={"/login"}>Login</Link>;
  }

  return (
    <>
      <Link to={"/profile"}>
        {user.google.name ? `Profil: ${user.google.name},` : "Profile"}
        <br />
        Les artikler,
        <br />
        Legg til artikkel
      </Link>
      <Link to={"/login/endsession"}>Logg ut</Link>
    </>
  );
}

export function Application() {
  const { fetchLogin } = useContext(ArticlesApiContext);
  const { data, error, loading, reload } = useLoading(fetchLogin);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <BrowserRouter>
      <header>
        <div>
          <Link to={"/"}>
            <h3>NewsPageByMarcus</h3>
          </Link>
          <Link to={"articles/update"}>Live nyheter</Link>
        </div>
        <div className="menu-divider" />
        <UserActions user={data?.user} />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/articles/update/"} element={<NewArticleUpdate />} />
          <Route path={"/articles"} element={<ListArticles />} />
          <Route path={"/articles/new"} element={<AddNewArticle />} />
          <Route
            path={"/login/*"}
            element={<LoginPage config={data.config} reload={reload} />}
          />
          <Route path={"/profile"} element={<Profile user={data?.user} />} />
          <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
