import { useState, useEffect, useRef, useCallback } from 'react'

interface UseRealTimeDataOptions {
  refreshInterval?: number // in milliseconds
  enabled?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  retryCount?: number
  retryDelay?: number
}

interface RealTimeDataState<T> {
  data: T | null
  loading: boolean
  isUpdating: boolean // New state to track background updates
  error: string | null
  lastUpdated: string | null
  isStale: boolean
}

export function useRealTimeData<T>(
  url: string,
  options: UseRealTimeDataOptions = {}
): RealTimeDataState<T> & {
  refetch: () => Promise<void>
  updateData: (newData: T) => void
} {
  const {
    refreshInterval = 30000, // 30 seconds default
    enabled = true,
    onSuccess,
    onError,
    retryCount = 3,
    retryDelay = 1000
  } = options

  const [state, setState] = useState<RealTimeDataState<T>>({
    data: null,
    loading: true,
    isUpdating: false,
    error: null,
    lastUpdated: null,
    isStale: false
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentRetryCount = useRef(0)
  const isMountedRef = useRef(true)
  const isInitialLoad = useRef(true)

  // Detect if user is on mobile for optimized refresh intervals
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  // Adjust refresh interval for mobile users (less frequent to save battery)
  const adjustedRefreshInterval = isMobile ? refreshInterval * 2 : refreshInterval

  const fetchData = useCallback(async () => {
    if (!enabled) return

    try {
      // Only show loading spinner on initial load, use isUpdating for background updates
      setState(prev => ({ 
        ...prev, 
        loading: isInitialLoad.current, 
        isUpdating: !isInitialLoad.current,
        error: null 
      }))

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (!isMountedRef.current) return

      const newData = result.success ? result.data : result
      
      setState(prev => ({
        ...prev,
        data: newData,
        loading: false,
        isUpdating: false,
        error: null,
        lastUpdated: new Date().toISOString(),
        isStale: false
      }))

      currentRetryCount.current = 0
      isInitialLoad.current = false
      onSuccess?.(newData)

    } catch (error) {
      if (!isMountedRef.current) return

      console.error(`Error fetching data from ${url}:`, error)
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      setState(prev => ({
        ...prev,
        loading: false,
        isUpdating: false,
        error: errorMessage,
        isStale: true
      }))

      onError?.(error instanceof Error ? error : new Error(errorMessage))

      // Retry logic
      if (currentRetryCount.current < retryCount) {
        currentRetryCount.current++
        retryTimeoutRef.current = setTimeout(() => {
          fetchData()
        }, retryDelay * currentRetryCount.current)
      }
    }
  }, [url, enabled, onSuccess, onError, retryCount, retryDelay])

  // Manual refetch function
  const refetch = useCallback(async () => {
    currentRetryCount.current = 0
    await fetchData()
  }, [fetchData])

  // Update data manually (for optimistic updates)
  const updateData = useCallback((newData: T) => {
    setState(prev => ({
      ...prev,
      data: newData,
      lastUpdated: new Date().toISOString(),
      isStale: false
    }))
  }, [])

  // Check if data is stale based on last update time
  const checkStaleData = useCallback(() => {
    if (!state.lastUpdated) return

    const lastUpdate = new Date(state.lastUpdated)
    const now = new Date()
    const timeDiff = now.getTime() - lastUpdate.getTime()
    
    // Consider data stale if older than 2x refresh interval
    if (timeDiff > adjustedRefreshInterval * 2) {
      setState(prev => ({ ...prev, isStale: true }))
    }
  }, [state.lastUpdated, adjustedRefreshInterval])

  // Setup automatic refresh
  useEffect(() => {
    if (!enabled) return

    // Initial fetch
    fetchData()

    // Setup interval for automatic refresh
    intervalRef.current = setInterval(() => {
      fetchData()
    }, adjustedRefreshInterval)

    // Setup stale data check
    const staleCheckInterval = setInterval(checkStaleData, 5000) // Check every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      clearInterval(staleCheckInterval)
    }
  }, [enabled, fetchData, adjustedRefreshInterval, checkStaleData])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  // Pause updates when page is not visible (mobile optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause updates when page is hidden
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      } else {
        // Resume updates when page becomes visible
        if (enabled) {
          fetchData() // Fetch fresh data
          intervalRef.current = setInterval(fetchData, adjustedRefreshInterval)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [enabled, fetchData, adjustedRefreshInterval])

  return {
    ...state,
    refetch,
    updateData
  }
} 