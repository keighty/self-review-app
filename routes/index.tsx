import { Handlers, PageProps } from "$fresh/server.ts";
import FetchPullRequests from "../islands/FetchPullRequests.tsx";
import SelfReviewSetup from "../islands/SelfReviewSetup.tsx";

export interface TokenStatus {
  isValid: boolean;
}

export const handler: Handlers<TokenStatus> = {
  async GET(_req, ctx) {
    const token = Deno.env.get("SELF_REVIEW_GITHUB_PAT") || null;
    let isValid = false;

    if (token) {
      try {
        const response = await fetch("https://api.github.com/user", {
          headers: { Authorization: `token ${token}` },
        });
        isValid = response.ok;
      } catch (error) {
        isValid = false;
      }
    }

    return ctx.render({ isValid });
  },
};

export default function Home(props: PageProps<TokenStatus>) {
  return (
    <div class="p-6 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Self-Review Generator</h1>
      <p class="mb-4">
        This tool helps you generate your self-review by pulling contribution
        data from GitHub. Enter your GitHub API key to get started.
      </p>
      <SelfReviewSetup isValid={props.data.isValid} />

      {props.data.isValid &&
        (
          <div>
            <p class="text-lg font-semibold mt-6 mb-4">Fetch Pull Requests</p>
            <p class="mb-4">
              Use the form below to fetch your pull requests within a specific
              time range.
            </p>
            <FetchPullRequests />
          </div>
        )}
    </div>
  );
}
