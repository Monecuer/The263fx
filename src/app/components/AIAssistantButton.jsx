export default function AIAssistant() {
  // ... your existing state and logic

  return (
    <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-md text-black">
      <h2 className="text-xl font-bold mb-4 text-center">Ask The263Fx AI</h2>
      <textarea
        className="w-full p-3 border rounded mb-4 focus:outline-blue-500"
        rows={4}
        placeholder="Ask anything about Forex, trading psychology, or The263Fx methods..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={askAI}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>

      {/* Chat response container */}
      {response && (
        <div
          className="mt-6 p-4 bg-gray-100 rounded border border-gray-300 text-gray-900 whitespace-pre-wrap max-h-48 overflow-y-auto"
          style={{ fontSize: '1rem', lineHeight: '1.5' }}
        >
          {response}
        </div>
      )}
    </div>
  );
}
