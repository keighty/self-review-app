import { config } from "https://deno.land/x/dotenv/mod.ts";

const GITHUB_API_URL = "https://api.github.com/graphql";

// Load environment variables
config();
const GITHUB_PAT = Deno.env.get("SELF_REVIEW_GITHUB_PAT");

if (!GITHUB_PAT) {
  throw new Error("Missing GitHub Personal Access Token (SELF_REVIEW_GITHUB_PAT) in .env file");
}

/**
 * Fetch merged pull requests for the authenticated user within a date range.
 * @param startDate - Start date (YYYY-MM-DD)
 * @param endDate - End date (YYYY-MM-DD)
 * @returns An array of merged pull requests.
 */
export async function fetchMergedPullRequests(startDate: string, endDate: string) {
  const query = `
    query {
      viewer {
        login
        pullRequests(
          first: 100,
          states: MERGED,
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            id
            title
            url
            mergedAt
            repository {
              nameWithOwner
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GITHUB_PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  // Check if errors exist in the response
  if (result.errors) {
    console.error("GitHub API Error:", result.errors);
    throw new Error(`GitHub API Error: ${JSON.stringify(result.errors)}`);
  }

  if (!result.data || !result.data.viewer) {
    throw new Error("GitHub API response does not contain 'viewer'. Check token permissions.");
  }

  // Filter PRs within the date range
  return result.data.viewer.pullRequests.nodes.filter((pr: any) =>
    pr.mergedAt >= `${startDate}T00:00:00Z` && pr.mergedAt <= `${endDate}T23:59:59Z`
  );
}

/**
 * API route handler for fetching merged PRs.
 */
export async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { startDate, endDate } = await req.json();
    if (!startDate || !endDate) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const pullRequests = await fetchMergedPullRequests(startDate, endDate);
    return new Response(JSON.stringify(pullRequests), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Handler error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
