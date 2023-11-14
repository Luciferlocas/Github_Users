import { useEffect } from "react";
import React, { useState } from "react";

export default function Orgs({ orgs }) {
  const [orgsData, setOrgsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const orgData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(orgs);
        const data = await res.json();
        setOrgsData(data);
      } catch (error) {
        console.log("No orgs found");
      } finally {
        setIsLoading(false);
      }
    };

    orgData();
  }, [orgs]);

  let count = 1;
  return (
    <>
      {!isLoading && <section>
        <div className="repos">
          <h1>Organisations</h1>
        </div>
        {isLoading && <Loader />}
        {orgsData.length !== 0 ? orgsData.map((org) => (
          <div className="orgname">
            <div key={org.id}>
              <a href={org.html_url}>
                {count++} - {org.login}
              </a>
            </div>
          </div>
        )) : <div className="msg">"No Organization Found...🥲"</div>}
      </section>}
    </>
  );
}
