import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    margin: '2rem',
                    backgroundColor: '#FEF2F2',
                    border: '2px solid #EF4444',
                    borderRadius: '12px',
                    fontFamily: 'monospace'
                }}>
                    <h2 style={{ color: '#DC2626', marginBottom: '1rem' }}>Something went wrong</h2>
                    <p style={{ color: '#991B1B', marginBottom: '1rem' }}>
                        <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                    </p>
                    <details style={{ color: '#7F1D1D' }}>
                        <summary>Stack Trace</summary>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </details>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#DC2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Data & Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
