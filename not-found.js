'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="screen">
      <div className="logo-container">
        <Image src="/images/logogenie.png" className="logo-top" alt="genie logo" width={50} height={50} />
      </div>

      <div className="center-text">
        <h1>404</h1>
        <h2>ไม่พบหน้าที่คุณค้นหา</h2>
        <button className="back-btn" onClick={() => router.push('/')}>
          กลับหน้าหลัก
                  </button>
        </div>

      <style jsx>{`
        @font-face {
          font-family: 'Cordiab';
          src: url('/fonts/Cordiab.ttf') format('truetype');
        }

        .screen {
          width: 100%;
          max-width: 430px;
          height: 100vh;
          height: 100dvh;
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
        }

        .center-text h1,
        .center-text h2 {
          font-size: clamp(28px, 7vw, 60px);
          margin: 0;
          line-height: 1.3;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .back-btn {
          background: transparent;
          border: 2px solid white;
          border-radius: 999px;
          color: white;
          font-size: clamp(16px, 3.5vw, 22px);
          padding: clamp(6px, 1.2vh, 10px) clamp(16px, 3.5vw, 25px);
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: clamp(20px, 4vh, 30px);
          font-family: 'Cordiab', sans-serif;
        }

        .back-btn:hover,
        .back-btn:active {
          background-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.03);
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
            margin-bottom: 0;
          }

          .back-btn {
            margin-top: clamp(15px, 3vh, 20px);
          }
        }
      `}</style>
    </div>
  )
} 