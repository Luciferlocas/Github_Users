import { useEffect } from "react";
import React, { useState } from "react";
import Loader from "./loader";
import Button from "./button";

export default function Repo({ url }) {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  let count = 1;
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
          {isLoading && <Loader />}
          {repos.map((repo) => (
            <>
              <div className="reponame">
                <div key={repo.id}>
                  <a target="_blank" href={repo.html_url}>
                    {count++} - {repo.name}
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
          
        </section>
    </>
  );
}
