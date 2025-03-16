import { useState } from "preact/hooks";

export default function SelfReview({ githubPat }: { githubPat: string }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [patToken, setPatToken] = useState(githubPat);
  const [validationMessage, setValidationMessage] = useState("");
  const [pullRequests, setPullRequests] = useState<any[]>([]);
  const [fetchMessage, setFetchMessage] = useState("");

  const validateToken = async () => {
    if (!patToken) {
      setValidationMessage("Please enter a GitHub PAT token.");
      return;
    }
    
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${patToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });
      
      if (response.ok) {
        setValidationMessage("✅ Token is valid!");
      } else {
        setValidationMessage("❌ Invalid token or insufficient permissions.");
      }
    } catch (error) {
      setValidationMessage("❌ Error validating token.");
    }
  };

  const fetchPullRequests = async () => {
    if (!patToken || !startDate || !endDate) return;
    
    try {
      // Fetch authenticated user's GitHub username
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${patToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!userResponse.ok) {
        setFetchMessage("❌ Failed to fetch user data. Check token permissions.");
        return;
      }

      const userData = await userResponse.json();
      const username = userData.login;

      // Query to fetch PRs that were created within the date range and are now closed
      const query = `is:pr author:${username} created:${startDate}..${endDate}`;
      const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100`;

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${patToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      const data = await response.json();
      if (data.items) {
        setPullRequests(data.items);
        setFetchMessage(`✅ Found ${data.items.length} pull requests.`);
      } else {
        setFetchMessage("❌ No pull requests found or an error occurred.");
      }
    } catch (error) {
      setFetchMessage("❌ Error fetching pull requests.");
    }
  };

  const removePullRequest = (id: number) => {
    setPullRequests(pullRequests.filter(pr => pr.id !== id));
  };

  const saveData = () => {
    const fileName = `self_review_${startDate}_to_${endDate}.json`;
    const json = JSON.stringify(pullRequests, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

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
        <input
          type="password"
          className="border rounded px-3 py-2 w-full"
          value={patToken}
          onInput={(e) => setPatToken(e.currentTarget.value)}
          placeholder="Enter your GitHub PAT token"
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={validateToken}
        >
          Validate Access
        </button>
        <button
          className="mt-2 ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={fetchPullRequests}
        >
          Fetch Pull Requests
        </button>
        {fetchMessage && <p className="mt-2 text-sm font-medium">{fetchMessage}</p>}
        {validationMessage && <p className="mt-2 text-sm font-medium">{validationMessage}</p>}
      </div>
    </div>
  );
}
