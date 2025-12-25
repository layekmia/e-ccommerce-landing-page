'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'

/**
 * Client-side hook to fetch product data from Sanity
 */
export function useProduct() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await fetch('/api/product')
        
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [])

  return { product, loading, error }
}

