// File: app/ErrorBoundary.tsx
'use client'
import React, { Component, ErrorInfo, ReactNode } from 'react';
import Error from '@/app/errors/error';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <Error error={this.state.error!} reset={this.resetError} />;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;