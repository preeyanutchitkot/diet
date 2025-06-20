'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const [textFade, setTextFade] = useState(false)
  const [micPermission, setMicPermission] = useState(false)

  useEffect(() => {
    // Check and request microphone permission when component mounts
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      })
      .then(stream => {
        stream.getTracks().forEach(track => track.stop())
        setMicPermission(true)
        localStorage.setItem('micPermissionGranted', 'true')
      })
      .catch(() => {
        setMicPermission(false)
        localStorage.setItem('micPermissionGranted', 'false')
      })
    }
  }, [])

  const handleClick = () => {
    setTextFade(true)
    setTimeout(() => {
      router.push('/start')
    }, 800)
  }

  return (
    <div className="screen">
      <div className={`content-wrapper ${textFade ? 'fade-out' : ''}`}>
        <div className="logo-container">
          <Image src="/images/logogenie.png" className="logo-top" alt="genie logo" width={50} height={50} />
        </div>

        <div className="center-text">
          <h1>&ldquo;พื้นที่ตรงนี้&rdquo;</h1>
          <h2>อนุญาตให้คุณพัง</h2>
          <p>&ldquo;บนบทเพลงซาบซึ้ง...สำหรับหัวใจที่อ่อนล้าเท่านั้น&rdquo;</p>
        </div>
        
        <div className="button-container">
          <button className="touch-btn" onClick={handleClick}>แตะเบา ๆ</button>
          <Image 
            src="/images/triangle_1.png" 
            alt="triangle logo" 
            width={30} 
            height={30} 
            className="triangle-logo"
          />
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: white;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          min-height: 100dvh;
        }
      `}</style>

      <style jsx>{`
        @font-face {
          font-family: 'Cordiab';
          src: url('/fonts/Cordiab.ttf') format('truetype');
        }

        .screen {
          width: 100%;
          max-width: 430px;
          height: 100vh;
          height: 100dvh; /* For mobile browsers */
          background: url('/images/klear_opening.jpg') no-repeat center center;
          background-size: cover;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(20px, 4vh, 30px) clamp(15px, 5vw, 20px);
          text-align: center;
          color: white;
          font-family: 'Cordiab', sans-serif;
          margin: auto;
          transition: opacity 1s ease-out;
          position: relative;
          overflow: hidden;
        }

        .logo-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(8px, 2vh, 10px);
          margin-top: clamp(10px, 3vh, 20px);
        }

        .logo-top {
          width: clamp(40px, 8vw, 50px);
          opacity: 0.8;
        }

        .center-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: clamp(0px, 2vh, 10px);
          margin-bottom: clamp(15px, 4vh, 30px);
          padding: 0 clamp(10px, 3vw, 20px);
          transform: translateY(-15%);
          transition: opacity 0.8s ease-out;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          transition: all 0.8s ease-out;
        }

        .content-wrapper.fade-out {
          opacity: 0;
          transform: scale(0.95);
        }

        .center-text h1,
        .center-text h2 {
          font-size: clamp(28px, 7vw, 60px);
          margin: 0;
          line-height: 1.3;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .center-text p {
          font-size: clamp(14px, 3.5vw, 18px);
          opacity: 0.9;
          margin-top: clamp(8px, 2vh, 10px);
          max-width: 280px;
          line-height: 1.4;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto;
          transform: translateY(clamp(-120%, -20vh, -80%));
          gap: clamp(30px, 5vh, 50px);
        }

        .touch-btn {
          background: transparent;
          border: clamp(1px, 0.2vw, 2px) solid white;
          border-radius: 999px;
          color: white;
          font-size: clamp(16px, 3vw, 24px);
          padding: clamp(8px, 1.5vh, 12px) clamp(20px, 4vw, 32px);
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: clamp(36px, 6vh, 48px);
          min-width: clamp(120px, 20vw, 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          background-color: rgba(255, 255, 255, 0.1);
        }

        .touch-btn:hover,
        .touch-btn:active {
          background-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.03);
        }

        .triangle-logo {
          position: fixed;
          bottom: -1.5%;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(20px, 4vw, 30px);
          height: auto;
          opacity: 0.8;
          z-index: 10;
        }

        /* Landscape mode */
        @media (max-height: 480px) and (orientation: landscape) {
          .screen {
            padding: clamp(10px, 2vh, 15px);
            justify-content: center;
            gap: 10px;
          }

          .logo-container {
            margin-top: 0;
          }

          .center-text {
            transform: translateY(-10%);
            margin-top: 0;
            margin-bottom: clamp(8px, 2vh, 15px);
          }

          .center-text h1,
          .center-text h2 {
            font-size: clamp(24px, 5vw, 32px);
          }

          .center-text p {
            font-size: clamp(12px, 2.5vw, 16px);
            margin-top: 5px;
          }

          .button-container {
            transform: translateY(clamp(-100%, -15vh, -70%));
            gap: clamp(20px, 4vh, 40px);
          }

          .button-logo {
            width: clamp(18px, 4vw, 22px);
          }

          .touch-btn {
            font-size: clamp(14px, 2.5vw, 20px);
            padding: clamp(6px, 1vh, 10px) clamp(16px, 3vw, 24px);
            min-height: clamp(32px, 5vh, 40px);
          }

          .triangle-logo {
            bottom: -1.2%;
            width: clamp(18px, 3.5vw, 25px);
          }
        }

        /* Small devices */
        @media (max-width: 360px) {
          .screen {
            padding: 15px clamp(10px, 3vw, 15px);
          }

          .center-text {
            transform: translateY(-12%);
          }

          .center-text h1,
          .center-text h2 {
            font-size: clamp(26px, 6vw, 32px);
          }

          .button-container {
            transform: translateY(clamp(-110%, -18vh, -75%));
            gap: clamp(25px, 4.5vh, 45px);
          }

          .touch-btn {
            font-size: clamp(15px, 2.8vw, 22px);
            padding: clamp(7px, 1.2vh, 11px) clamp(18px, 3.5vw, 28px);
            min-height: clamp(34px, 5.5vh, 44px);
          }

          .triangle-logo {
            bottom: -1.3%;
            width: clamp(19px, 3.8vw, 28px);
          }
        }

        /* Extra large devices */
        @media (min-width: 1200px) {
          .button-container {
            transform: translateY(clamp(-130%, -22vh, -85%));
            gap: clamp(35px, 5.5vh, 55px);
          }

          .touch-btn {
            font-size: clamp(18px, 3.2vw, 26px);
            padding: clamp(9px, 1.8vh, 13px) clamp(22px, 4.5vw, 36px);
            min-height: clamp(38px, 6.5vh, 52px);
          }

          .triangle-logo {
            bottom: -1.8%;
            width: clamp(22px, 4.2vw, 32px);
          }
        }
      `}</style>
    </div>
  )
}