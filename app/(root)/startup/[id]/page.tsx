import { StartupCardType } from "@/components/startup-card";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";

const md = markdownit();

export const experimental_ppr = true;
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await client.fetch<StartupCardType>(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();

  const parseContent = md.render(post.pitch ?? "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          className="w-full h-auto rounded-xl"
          alt="thumbnail"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image ?? ""}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg w-24 h-24"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-20-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parseContent ? (
            <>
              <article
                dangerouslySetInnerHTML={{ __html: parseContent }}
                className="prose max-w-4xl font-work-sans break-all"
              />
            </>
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />
        {/* TODO selected start up */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
}

export default Page;
