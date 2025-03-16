import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const startDate = url.searchParams.get("start");
    const endDate = url.searchParams.get("end");

    if (!token || !startDate || !endDate) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
    }

    try {
      const githubUsername = await getGitHubUsername(token);
      const pullRequests = await fetchPullRequests(githubUsername, token, startDate, endDate);
      const reviewsCount = await countPRReviews(githubUsername, token, startDate, endDate);
      const commentsCount = await countPRComments(githubUsername, token, startDate, endDate);

      const groupedData = groupByMonth({ pullRequests, reviewsCount, commentsCount });

      return new Response(JSON.stringify(groupedData), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  },
};

async function getGitHubUsername(token: string): Promise<string> {
  const response = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch GitHub username");
  const data = await response.json();
  return data.login;
}

async function fetchPullRequests(username: string, token: string, start: string, end: string) {
  const url = `https://api.github.com/search/issues?q=author:${username}+type:pr+created:${start}..${end}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch PRs");
  const data = await response.json();
  return data.items || [];
}

async function countPRReviews(username: string, token: string, start: string, end: string): Promise<number> {
  const url = `https://api.github.com/search/issues?q=reviewed-by:${username}+type:pr+updated:${start}..${end}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to count PR reviews");
  const data = await response.json();
  return data.total_count;
}

async function countPRComments(username: string, token: string, start: string, end: string): Promise<number> {
  const url = `https://api.github.com/search/issues?q=commenter:${username}+type:pr+updated:${start}..${end}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to count PR comments");
  const data = await response.json();
  return data.total_count;
}

function groupByMonth(data: { pullRequests: any[]; reviewsCount: number; commentsCount: number }) {
  const grouped: Record<string, any> = {};

  data.pullRequests.forEach((pr) => {
    const month = pr.created_at.substring(0, 7);
    if (!grouped[month]) grouped[month] = { prs: [], reviews: 0, comments: 0 };
    grouped[month].prs.push(pr);
  });

  Object.keys(grouped).forEach((month) => {
    grouped[month].reviews = data.reviewsCount;
    grouped[month].comments = data.commentsCount;
  });

  return grouped;
}
