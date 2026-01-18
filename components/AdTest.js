import { useEffect, useState } from 'react'

const AdTest = () => {
  const [adStatus, setAdStatus] = useState({
    scriptLoaded: false,
    adsbygoogle: false,
    environment: process.env.NODE_ENV,
  })

  useEffect(() => {
    const checkAdSense = () => {
      setAdStatus({
        scriptLoaded: !!document.querySelector('script[src*="adsbygoogle.js"]'),
        adsbygoogle: !!(window.adsbygoogle && window.adsbygoogle.loaded),
        environment: process.env.NODE_ENV,
      })
    }

    checkAdSense()
    const timer = setInterval(checkAdSense, 1000)
    return () => clearInterval(timer)
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="border-2 border-dashed border-yellow-400 bg-yellow-50 p-4 text-center">
        <h3 className="font-bold text-yellow-800">廣告測試區域 (開發環境)</h3>
        <div className="mt-2 text-sm text-yellow-700">
          <p>環境: {adStatus.environment}</p>
          <p>AdSense 腳本: {adStatus.scriptLoaded ? '✅ 已載入' : '❌ 未載入'}</p>
          <p>AdsByGoogle: {adStatus.adsbygoogle ? '✅ 就緒' : '⏳ 載入中'}</p>
          <p className="mt-2 font-semibold">廣告只在生產環境顯示</p>
        </div>
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-slot="5544332211"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

export default AdTest
