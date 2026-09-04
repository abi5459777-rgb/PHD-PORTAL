import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('DSU Portal Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
          <div style={{ background: '#fff0f0', border: '1px solid #f5c6cb', borderRadius: 12, padding: 24, maxWidth: 600 }}>
            <h2 style={{ color: '#7B1E3A', margin: '0 0 8px' }}>Something went wrong</h2>
            <p style={{ color: '#555', margin: '0 0 12px', fontSize: 14 }}>
              The page encountered an error. Please refresh the page or navigate back.
            </p>
            <pre style={{ background: '#f8f8f8', padding: 12, borderRadius: 8, fontSize: 12, color: '#333', overflow: 'auto' }}>
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.href = '/dashboard'}
              style={{ marginTop: 16, padding: '8px 20px', background: '#7B1E3A', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
