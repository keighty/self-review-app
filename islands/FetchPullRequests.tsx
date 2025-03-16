import { useState } from "preact/hooks";
import { RenderPullRequests } from "../components/RenderPullRequests.tsx";

export default function FetchPullRequests({ token }: { token?: string }) {
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prCount, setPrCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prArray, setPrArray] = useState<any[]>([]);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPrCount(null);

    try {
      const response = await fetch("/api/fetchFromGithub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate: beginDate, endDate }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch PRs: ${response.statusText}`);
      }

      const data = await response.json();
      setPrArray(data);
      setPrCount(data.length);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

    const removePullRequest = (id: number) => {
    setPrArray((prevPRs) => prevPRs.filter((pr) => pr.id !== id));
  };

  return (
    <>
      <div class="p-4 bg-white shadow-md rounded-lg">
        {token && (
          <p class="mb-4 text-gray-700">
            Your GitHub token will be used to fetch pull request data within the
            specified time range.
          </p>
        )}
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label for="beginDate" class="block font-medium text-gray-700">
              Begin Date
            </label>
            <input
              id="beginDate"
              type="date"
              class="w-full p-2 border rounded"
              value={beginDate}
              onChange={(e) => setBeginDate(e.currentTarget.value)}
            />
          </div>
          <div>
            <label for="endDate" class="block font-medium text-gray-700">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              class="w-full p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.currentTarget.value)}
            />
          </div>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={!beginDate || !endDate || loading}
          >
            {loading ? "Fetching..." : "Fetch Pull Requests"}
          </button>
        </form>

        {error && <p class="mt-4 text-red-600">{error}</p>}
        {prCount !== null && !error && (
          <p class="mt-4 text-green-700">
            Fetched {prCount} merged pull requests.
          </p>
        )}
      </div>
      {prCount !== null && !error && <RenderPullRequests prArray={prArray} removePullRequest={removePullRequest} />}
    </>
  );
}
