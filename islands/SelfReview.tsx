// Import Fresh framework components
import { useState } from "preact/hooks";

// Main App Component
export default function App() {
  const [apiKeys, setApiKeys] = useState({ github: "", jira: "", linear: "" });
  const [step, setStep] = useState(1);
  
  function handleApiKeyChange(service: string, value: string) {
    setApiKeys(prev => ({ ...prev, [service]: value }));
  }
  
  return (
    <div class="p-6 max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Self-Review Generator</h1>
      {step === 1 && (
        <div>
          <h2 class="text-lg font-semibold">Enter API Keys</h2>
          <label class="block mt-4">
            GitHub API Key:
            <input type="text" class="border p-2 w-full" value={apiKeys.github} 
              onInput={(e) => handleApiKeyChange("github", e.currentTarget.value)} />
          </label>
          <label class="block mt-2">
            Jira API Key:
            <input type="text" class="border p-2 w-full" value={apiKeys.jira} 
              onInput={(e) => handleApiKeyChange("jira", e.currentTarget.value)} />
          </label>
          <label class="block mt-2">
            Linear API Key:
            <input type="text" class="border p-2 w-full" value={apiKeys.linear} 
              onInput={(e) => handleApiKeyChange("linear", e.currentTarget.value)} />
          </label>
          <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={() => setStep(2)}>
            Continue
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 class="text-lg font-semibold">Fetching Contributions...</h2>
          <p class="mt-2">Coming soon: Fetching GitHub, Jira, and Linear data.</p>
        </div>
      )}
    </div>
  );
}
