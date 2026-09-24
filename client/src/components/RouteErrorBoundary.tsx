import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { PhoneIcon } from './icons/PhoneIcon'
import { BUSINESS } from '../data/business'

// Every route is lazy. When a route's chunk fails to load — typically a visitor
// who still has the old index.html open right after a deploy — React throws
// for the nearest error boundary. Without one the whole app unmounted to an
// empty page. This fallback deliberately avoids PublicHeader and other lazy
// code, since that may be exactly what failed; the shared .bb-hero classes are
// in the global stylesheet and always available.

type BoundaryProps = { children: ReactNode; resetKey: string }
type BoundaryState = { error: Error | null }

class RouteErrorBoundaryInner extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route failed to render:', error, info.componentStack)
  }

  componentDidUpdate(previous: BoundaryProps) {
    // Navigating elsewhere gives the next route a fresh chance.
    if (this.state.error && previous.resetKey !== this.props.resetKey) this.setState({ error: null })
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <main id="main-content">
        <section className="bb-hero" aria-labelledby="route-error-title">
          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Något gick fel</p>
              <h1 className="bb-h1" id="route-error-title">
                <span>Sidan kunde inte</span>
                <span className="bb-accent">laddas</span>
              </h1>
              <p>
                Det kan bero på en tillfällig störning eller på att webbplatsen precis har uppdaterats. Ladda om sidan och försök igen.
              </p>
              <div className="bb-hero__actions">
                <button type="button" className="bb-btn bb-btn--teal" onClick={() => window.location.reload()}>
                  Ladda om sidan
                </button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon aria-hidden="true" />
                  <span>Ring oss nu</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export function RouteErrorBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return <RouteErrorBoundaryInner resetKey={pathname}>{children}</RouteErrorBoundaryInner>
}
