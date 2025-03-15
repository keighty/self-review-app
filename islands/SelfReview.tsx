import { useState } from "preact/hooks";

export default function SelfReview({ githubPat }: { githubPat: string }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [patToken, setPatToken] = useState(githubPat);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Welcome to your self review!
      </h1>
      <p className="text-gray-700 mb-4">
        This tool will help you gather insights from your contributions over a selected time period.
        You'll enter a date range and a GitHub personal access token (PAT) to fetch relevant data.
      </p>

      <div className="mb-6">
        <label className="block font-medium mb-1">Review Period</label>
        <div className="flex space-x-4">
          <input
            type="date"
            className="border rounded px-3 py-2 w-1/2"
            value={startDate}
            onInput={(e) => setStartDate(e.currentTarget.value)}
            placeholder="Start Date"
          />
          <input
            type="date"
            className="border rounded px-3 py-2 w-1/2"
            value={endDate}
            onInput={(e) => setEndDate(e.currentTarget.value)}
            placeholder="End Date"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">
          You will need a GitHub personal access token (PAT) to fetch data. Follow
          <a
            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            these instructions
          </a> to create one. Be sure to grant it only the necessary permissions to pull data from
          repositories relevant to your self-review.
        </p>
        <input
          type="password"
          className="border rounded px-3 py-2 w-full"
          value={patToken}
          onInput={(e) => setPatToken(e.currentTarget.value)}
          placeholder="Enter your GitHub PAT token"
        />
      </div>
    </div>
  );
}
