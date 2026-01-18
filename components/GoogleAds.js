import { useEffect } from 'react'

// Google AdSense 廣告組件
export default function GoogleAds({ adSlot, adFormat = 'auto', fullWidthResponsive = true }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className="my-4 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1485399275405167" // Google AdSense 發布商 ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}

// 預設廣告欄位組件
export function HeaderAd() {
  return <GoogleAds adSlot="1234567890" adFormat="horizontal" />
}

export function SidebarAd() {
  return <GoogleAds adSlot="0987654321" adFormat="rectangle" />
}

export function FooterAd() {
  return <GoogleAds adSlot="1122334455" adFormat="horizontal" />
}

export function InArticleAd() {
  return <GoogleAds adSlot="5566778899" adFormat="fluid" />
}
