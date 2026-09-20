import { useCallback, useEffect, useRef, useState } from 'react'
import { isAxiosError } from 'axios'

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Why a submission failed, in terms the UI can word for a customer.
 * - `network`: no response at all (offline, server down, blocked)
 * - `timeout`: no answer within `SUBMISSION_TIMEOUT_MS`
 * - `rate-limit`: HTTP 429
 * - `rejected`: HTTP 4xx other than 429 — the server refused the content
 * - `server`: HTTP 5xx
 * - `unknown`: anything that is not an HTTP error
 */
export type SubmissionErrorKind = 'network' | 'timeout' | 'rate-limit' | 'rejected' | 'server' | 'unknown'

export const SUBMISSION_TIMEOUT_MS = 15_000

function classifyError(error: unknown): SubmissionErrorKind {
  if (!isAxiosError(error)) return 'unknown'
  if (!error.response) return 'network'
  const { status } = error.response
  if (status === 429) return 'rate-limit'
  if (status >= 500) return 'server'
  if (status >= 400) return 'rejected'
  return 'unknown'
}

/**
 * Lifecycle for a form that sends one request: `idle → submitting → success | error`.
 *
 * - A ref guards against a second call while one is in flight. State alone
 *   cannot: two clicks inside the same render both see `status === 'idle'`.
 * - The request gets an `AbortSignal` that fires after `SUBMISSION_TIMEOUT_MS`
 *   and when the component unmounts, so a closed dialog never updates state.
 * - `submit` resolves to `true` on success and never throws.
 */
export function useFormSubmission() {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorKind, setErrorKind] = useState<SubmissionErrorKind | null>(null)
  const inFlightRef = useRef(false)
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => () => controllerRef.current?.abort(), [])

  const submit = useCallback(async (send: (signal: AbortSignal) => Promise<unknown>): Promise<boolean> => {
    if (inFlightRef.current) return false
    inFlightRef.current = true

    const controller = new AbortController()
    controllerRef.current = controller
    let timedOut = false
    const timer = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, SUBMISSION_TIMEOUT_MS)

    setStatus('submitting')
    setErrorKind(null)

    try {
      await send(controller.signal)
      setStatus('success')
      return true
    } catch (error) {
      // Aborted by unmount, not by the timeout: nobody is listening any more.
      if (controller.signal.aborted && !timedOut) return false
      setErrorKind(timedOut ? 'timeout' : classifyError(error))
      setStatus('error')
      return false
    } finally {
      window.clearTimeout(timer)
      inFlightRef.current = false
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setErrorKind(null)
  }, [])

  return { status, errorKind, isSubmitting: status === 'submitting', submit, reset }
}
