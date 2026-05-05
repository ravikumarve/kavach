export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Kavach</h1>
          <p className="text-muted-foreground mb-8">
            AI-powered legal document engine for India
          </p>
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <ul className="text-left space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Backend API server running on port 8000
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Frontend Next.js application running on port 3000
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">⏳</span>
                Authentication system implementation
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">⏳</span>
                Document generation features
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">⏳</span>
                Dashboard and UI components
              </li>
            </ul>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Status:</strong> Phase 1 - Foundation & Setup in progress
              </p>
              <p className="text-sm mt-2">
                <strong>Progress:</strong> Backend structure created, frontend structure created
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
