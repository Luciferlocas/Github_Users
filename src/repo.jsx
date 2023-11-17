import { useEffect } from "react";
import React, { useState } from "react";
import Loader from "./loader";
import Button from "./button";
import Pagination from "./pagination";

export default function Repo({ url }) {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const set = repos.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(repos.length / perPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const repodata = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setRepos(data);
      } catch (error) {
        console.log("Error");
      } finally {
        setIsLoading(false);
      }
    };

    repodata();
  }, [url]);

  const languages = repos.map((repo) => repo.language);
  const languageFrequencyMap = new Map();
  languages.forEach((language) => {
    if (language) {
      if (languageFrequencyMap.has(language)) {
        languageFrequencyMap.set(
          language,
          languageFrequencyMap.get(language) + 1
        );
      } else {
        languageFrequencyMap.set(language, 1);
      }
    }
  });
  let mostUsedLanguage;
  if (languageFrequencyMap.size > 0) {
    mostUsedLanguage = [...languageFrequencyMap.entries()].sort(
      (a, b) => b[1] - a[1]
    )[0][0];
  }
  globalThis.lang = `${mostUsedLanguage}`;
  return (
    <>
        <section>
          <div className="repos">
            <h1>Public Repos</h1>
          </div>
          {isLoading ? <Loader /> :
          set.map((repo) => (
            <>
              <div className="reponame">
                <div key={repo.id}>
                  <a target="_blank" href={repo.html_url}>
                   Name - {repo.name}
                  </a>
                </div>
                <div className="forks">
                  <Button value="Stars : " number={repo.stargazers_count} />
                  <Button value="Watcher : " number={repo.watchers_count} />
                  <Button value="Fork : " number={repo.forks_count} />
                </div>
                <div className="language">
                  Language : {repo.language || "Unknown"}
                </div>
              </div>
            </>
          ))}
          <Pagination page={page} func={handlePageChange}/>
        </section>
    </>
  );
}
