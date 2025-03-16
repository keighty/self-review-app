interface Props {
  isValid: boolean;
}

export default function SelfReviewSetup({ isValid }: Props) {
  return (
    <div class="border p-4 rounded-lg bg-gray-100">
      {isValid ? (
        <div class="flex items-center">
          <p class="text-green-600">Valid token available.</p>
        </div>
      ) : (
        <div>
          <h2 class="text-lg font-bold text-red-600">GitHub Token Required</h2>
          <p class="mt-2">
            To enable GitHub data access, you need to generate a **GitHub Personal Access Token (PAT)** 
            with the correct permissions.
          </p>
          <h3 class="mt-2 font-semibold">Steps to generate a GitHub token:</h3>
          <ol class="list-decimal ml-5 mt-2 space-y-2">
            <li>
              Go to <a href="https://github.com/settings/tokens" target="_blank" class="text-blue-600 underline">GitHub Developer Settings</a>.
            </li>
            <li>Click **"Generate new token"** (classic).</li>
            <li>
              Select **"repo"** and **"read:org"** permissions (minimum required).
            </li>
            <li>Copy the generated token.</li>
            <li>
              Save it in your `.env` file:
              <pre class="bg-gray-200 p-2 rounded mt-2">
SELF_REVIEW_GITHUB_PAT=your_token_here
              </pre>
            </li>
            <li>Restart the application after saving the `.env` file.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
