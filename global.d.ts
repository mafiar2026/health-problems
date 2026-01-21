// types/window.d.ts or globals.d.ts
export {}

declare global {
  interface Window {
    fbq: {
      (cmd: 'init', pixelId: string): void
      (cmd: 'track', eventName: string, params?: Record<string, unknown>): void
      (cmd: 'trackSingle', pixelId: string, eventName: string, params?: Record<string, unknown>): void
    }
    ttq: {
      track: (eventName: string, params?: Record<string, unknown>) => void
      page: () => void
      identify: (params?: Record<string, unknown>) => void
      // Add other methods if needed
    }
  }
}
