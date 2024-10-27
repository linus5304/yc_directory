import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY_BY_AUTHOR } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupCardType } from "./startup-card";

async function UserStartups({ id }: { id: string }) {
  const startups = await client.fetch(STARTUPS_QUERY_BY_AUTHOR, { id });

  return (
    <div>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard post={startup} key={startup._id} />
        ))
      ) : (
        <p className="no-result">No startups</p>
      )}
    </div>
  );
}

export default UserStartups;
