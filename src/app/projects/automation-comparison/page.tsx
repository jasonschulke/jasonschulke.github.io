'use client'

import { useEffect } from 'react'

export default function AutomationComparison() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="fixed inset-0">
      <div
        data-fillout-id="cCt3xvAeAmus"
        data-fillout-embed-type="fullscreen"
        data-fillout-inherit-parameters
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
