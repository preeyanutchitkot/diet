'use client'
import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import './globals.css'
import AudioPlayer from './components/AudioPlayer'

export default function RootLayout({ children }) {
  const rainSoundRef = useRef(null)
  const guitarSoundRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const pathname = usePathname()
  const lastPathRef = useRef(pathname)

  const fadeOutRain = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    if (rainSoundRef.current && rainSoundRef.current.volume > 0) {
      fadeIntervalRef.current = setInterval(() => {
        if (rainSoundRef.current) {
          if (rainSoundRef.current.volume > 0.01) {
            rainSoundRef.current.volume = Math.max(0, rainSoundRef.current.volume - 0.02)
          } else {
            clearInterval(fadeIntervalRef.current)
            rainSoundRef.current.pause()
            rainSoundRef.current.volume = 0.3 // รีเซ็ตกลับไปที่ค่าเดิม
          }
        }
      }, 50)
    }
  }

  useEffect(() => {
    // สร้าง Audio objects ทันทีเมื่อ component mount
    if (!rainSoundRef.current) {
      const rainAudio = new Audio('/sound/soft-rain.mp3')
      rainAudio.loop = true
      rainAudio.volume = 0.3
      rainSoundRef.current = rainAudio
    }

    if (!guitarSoundRef.current) {
      const guitarAudio = new Audio('/sound/05_Stem_Acoustic GTR (2).wav')
      guitarAudio.loop = true
      guitarAudio.volume = 0.3
      guitarAudio.currentTime = 36
      guitarSoundRef.current = guitarAudio
    }

    const shouldPlayRain = [
      '/in-the-dark',
      '/numbness',
      '/invisible-weight',
      '/silence-screams',
      '/tears-inside',
      '/if-you-knew',
      '/i-miss-myself',
      '/holding-on',
      '/days-blur',
      '/burnout',
      '/clouded-mind',
      '/almost-gone',
      '/tell',
      '/space-to-fall',
      '/quiet-crash',
      '/mask-on',
      '/please-dont-ask',
      '/permission-to-break',
      '/heavy-light',
      '/voices-inside',
      '/deep-breath'
    ].includes(pathname)

    const shouldPlayGuitar = [
      '/deep-breath',
      '/gentle-reminder',
      '/fragile-heart',
      '/not-okay',
      '/letters-to-me',
      '/found-light',
      '/tiny-hope',
      '/step-by-step',
    ].includes(pathname)

    // Handle rain sound
    if (pathname === '/deep-breath' && rainSoundRef.current) {
      fadeOutRain()
    } else if (shouldPlayRain && rainSoundRef.current) {
      rainSoundRef.current.volume = 0.3 // รีเซ็ตเสียงกลับเป็นค่าปกติ
      rainSoundRef.current.muted = true
      const playRainPromise = rainSoundRef.current.play()
      if (playRainPromise !== undefined) {
        playRainPromise.then(() => {
          rainSoundRef.current.muted = false
        }).catch(error => {
          console.warn('Rain autoplay failed:', error)
        })
      }
    } else if (rainSoundRef.current) {
      rainSoundRef.current.pause()
    }

    // Handle guitar sound
    if (shouldPlayGuitar && guitarSoundRef.current) {
      const wasPlayingGuitar = [
        '/deep-breath',
        '/gentle-reminder',
        '/fragile-heart',
        '/not-okay',
        '/letters-to-me',
        '/found-light',
        '/tiny-hope',
        '/step-by-step',
      ].includes(lastPathRef.current)

      if (!wasPlayingGuitar) {
        guitarSoundRef.current.currentTime = 36
      }

      const playGuitarPromise = guitarSoundRef.current.play()
      if (playGuitarPromise !== undefined) {
        playGuitarPromise.catch(error => {
          console.warn('Guitar autoplay failed:', error)
        })
      }
    } else if (guitarSoundRef.current) {
      guitarSoundRef.current.pause()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        rainSoundRef.current?.pause()
        guitarSoundRef.current?.pause()
      } else {
        if (shouldPlayRain && rainSoundRef.current) {
          rainSoundRef.current.muted = true
          const playRainPromise = rainSoundRef.current.play()
          if (playRainPromise !== undefined) {
            playRainPromise.then(() => {
              rainSoundRef.current.muted = false
            }).catch(() => {})
          }
        }
        if (shouldPlayGuitar && guitarSoundRef.current) {
          guitarSoundRef.current.play().catch(() => {})
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // อัพเดท lastPath
    lastPathRef.current = pathname

    // Cleanup function
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [pathname])

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      if (rainSoundRef.current) {
        rainSoundRef.current.pause()
        rainSoundRef.current = null
      }
      if (guitarSoundRef.current) {
        guitarSoundRef.current.pause()
        guitarSoundRef.current = null
      }
    }
  }, [])

  return (
    <html lang="th">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <AudioPlayer />
        {children}
      </body>
    </html>
  )
}
