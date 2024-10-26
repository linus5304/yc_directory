import { StartupCardType } from "@/components/startup-card";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

export const experimental_ppr = true;
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await client.fetch<StartupCardType>(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  return (
    <>
      <h1 className="text-3xl">{post.title}</h1>
    </>
  );
}

export default Page;
