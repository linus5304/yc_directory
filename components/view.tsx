import React from "react";
import Ping from "./ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEW_QUERY } from "@/sanity/lib/queries";

async function View({ id }: { id: string }) {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEW_QUERY, { id });

  // TODO: update the number of views

  return (
    <div className="view-container">
      <div className="absolute -top-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalViews} </span>
      </p>
    </div>
  );
}

export default View;
