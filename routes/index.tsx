import { Handlers, PageProps } from "$fresh/server.ts";
import SelfReview from "../islands/SelfReview.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    const githubPat = Deno.env.get("SELF_REVIEW_GITHUB_PAT") || "";
    return ctx.render({ githubPat });
  },
};

export default function SelfReviewPage(props: PageProps<{ githubPat: string }>) {
  return <SelfReview githubPat={props.data.githubPat} />;
}
