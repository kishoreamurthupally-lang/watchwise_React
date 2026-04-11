import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
    scroll-behavior: smooth;
  }

  :root {
    --red: #e50914;
    --red-dim: rgba(229,9,20,0.15);
    --bg: #0a0a0a;
    --text: #fff;
    --muted: #666;
    --gold: #f5c518;
  }

  body { 
    background: var(--bg); 
    color: var(--text); 
    font-family: 'DM Sans', sans-serif; 
  }

  /* ═══ NAVBAR ═══ */
  .intro-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
  }

  @media (min-width: 768px) {
    .intro-nav {
      padding: 20px 60px;
    }
  }

  .intro-nav.scrolled {
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(20px);
    padding: 12px 20px;
    border-bottom: 1px solid #1a1a1a;
  }

  @media (min-width: 768px) {
    .intro-nav.scrolled {
      padding: 14px 60px;
    }
  }

  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 3px;
    color: #fff;
  }

  @media (min-width: 768px) {
    .nav-logo {
      font-size: 28px;
      letter-spacing: 4px;
    }
  }

  .nav-logo span { color: var(--red); }

  .nav-btn {
    padding: 8px 20px;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 50px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 20px rgba(229,9,20,0.4);
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    .nav-btn {
      padding: 10px 28px;
      font-size: 16px;
      letter-spacing: 2px;
    }
  }

  .nav-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(229,9,20,0.6); }

  /* ═══ HERO ═══ */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 80px 20px 60px;
  }

  .hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.25;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(10,10,10,0.95) 0%,
      rgba(229,9,20,0.08) 50%,
      rgba(10,10,10,0.9) 100%
    );
  }

  .hero-overlay-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 150px;
    background: linear-gradient(to top, var(--bg), transparent);
  }

  @media (min-width: 768px) {
    .hero-overlay-bottom {
      height: 300px;
    }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 900px;
    width: 100%;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(229,9,20,0.12);
    border: 1px solid rgba(229,9,20,0.3);
    border-radius: 50px;
    padding: 5px 16px;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 24px;
    animation: fadeDown 0.8s ease both;
  }

  @media (min-width: 768px) {
    .hero-badge {
      gap: 8px;
      padding: 6px 20px;
      font-size: 12px;
      letter-spacing: 2px;
      margin-bottom: 32px;
    }
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    letter-spacing: 4px;
    line-height: 1.1;
    margin-bottom: 20px;
    animation: fadeUp 0.8s 0.2s ease both;
  }

  @media (min-width: 480px) {
    .hero-title {
      font-size: 56px;
      letter-spacing: 5px;
    }
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: clamp(64px, 10vw, 140px);
      letter-spacing: 8px;
      margin-bottom: 32px;
    }
  }

  .hero-title .line2 { color: var(--red); display: block; }

  .hero-sub {
    font-size: 14px;
    color: #aaa;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto 32px;
    animation: fadeUp 0.8s 0.4s ease both;
    font-weight: 300;
    padding: 0 10px;
  }

  @media (min-width: 768px) {
    .hero-sub {
      font-size: clamp(15px, 2vw, 20px);
      line-height: 1.7;
      margin: 0 auto 48px;
    }
  }

  .hero-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeUp 0.8s 0.6s ease both;
  }

  .btn-enter {
    padding: 12px 28px;
    background: linear-gradient(135deg, #e50914, #ff2d20);
    color: #fff;
    border: none;
    border-radius: 50px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 8px 32px rgba(229,9,20,0.5);
  }

  @media (min-width: 768px) {
    .btn-enter {
      padding: 16px 48px;
      font-size: 20px;
      letter-spacing: 3px;
    }
  }

  .btn-enter:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 16px 48px rgba(229,9,20,0.7); }

  .btn-outline {
    padding: 12px 28px;
    background: transparent;
    color: #fff;
    border: 1.5px solid #333;
    border-radius: 50px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
  }

  @media (min-width: 768px) {
    .btn-outline {
      padding: 16px 48px;
      font-size: 20px;
      letter-spacing: 3px;
    }
  }

  .btn-outline:hover { border-color: #fff; transform: translateY(-3px); }

  .scroll-hint {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #444;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    animation: bounce 2s infinite;
    z-index: 2;
  }

  @media (min-width: 768px) {
    .scroll-hint {
      bottom: 40px;
      font-size: 11px;
      letter-spacing: 2px;
      gap: 8px;
    }
  }

  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--red), transparent);
  }

  @media (min-width: 768px) {
    .scroll-line {
      height: 60px;
    }
  }

  @keyframes bounce {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(10px); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ═══ STATS SECTION ═══ */
  .stats-section {
    padding: 40px 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
    background: #111;
    border-top: 1px solid #1a1a1a;
    border-bottom: 1px solid #1a1a1a;
  }

  @media (min-width: 640px) {
    .stats-section {
      grid-template-columns: repeat(4, 1fr);
      padding: 60px 40px;
    }
  }

  @media (min-width: 768px) {
    .stats-section {
      padding: 80px 60px;
    }
  }

  .stat-item {
    text-align: center;
    padding: 24px 12px;
    border-right: none;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }

  @media (min-width: 640px) {
    .stat-item {
      border-right: 1px solid #1a1a1a;
      padding: 40px 20px;
    }
    .stat-item:last-child { border-right: none; }
  }

  .stat-item.visible { opacity: 1; transform: translateY(0); }

  .stat-number {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40px;
    letter-spacing: 2px;
    color: var(--red);
    line-height: 1;
    margin-bottom: 6px;
  }

  @media (min-width: 768px) {
    .stat-number {
      font-size: 64px;
      margin-bottom: 8px;
    }
  }

  .stat-label { 
    font-size: 10px; 
    color: var(--muted); 
    letter-spacing: 1.5px; 
    text-transform: uppercase; 
  }

  @media (min-width: 768px) {
    .stat-label {
      font-size: 12px;
      letter-spacing: 2px;
    }
  }

  /* ═══ FEATURES SECTION ═══ */
  .features-section {
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .features-section {
      padding: 120px 60px;
    }
  }

  .section-header {
    text-align: center;
    margin-bottom: 40px;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }

  @media (min-width: 768px) {
    .section-header {
      margin-bottom: 80px;
    }
  }

  .section-header.visible { opacity: 1; transform: translateY(0); }

  .section-tag {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 12px;
    display: block;
  }

  @media (min-width: 768px) {
    .section-tag {
      font-size: 11px;
      letter-spacing: 4px;
      margin-bottom: 16px;
    }
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    letter-spacing: 3px;
    line-height: 1.2;
    color: #fff;
  }

  @media (min-width: 480px) {
    .section-title {
      font-size: 40px;
      letter-spacing: 3.5px;
    }
  }

  @media (min-width: 768px) {
    .section-title {
      font-size: clamp(40px, 6vw, 72px);
      letter-spacing: 4px;
    }
  }

  .section-title span { color: var(--red); }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 640px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 22px;
    }
  }

  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
  }

  .feature-card {
    background: #111;
    border: 1px solid #1a1a1a;
    border-radius: 20px;
    padding: 28px 20px;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.7s ease;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .feature-card {
      padding: 40px 32px;
    }
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--red), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .feature-card:hover::before { opacity: 1; }
  .feature-card:hover { border-color: #2a2a2a; transform: translateY(-8px) !important; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
  .feature-card.visible { opacity: 1; transform: translateY(0); }

  .feature-icon {
    font-size: 36px;
    margin-bottom: 16px;
    display: block;
  }

  @media (min-width: 768px) {
    .feature-icon {
      font-size: 48px;
      margin-bottom: 20px;
    }
  }

  .feature-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 1.5px;
    color: #fff;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    .feature-title {
      font-size: 24px;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
  }

  .feature-desc { 
    font-size: 13px; 
    color: var(--muted); 
    line-height: 1.6; 
  }

  @media (min-width: 768px) {
    .feature-desc {
      font-size: 14px;
      line-height: 1.8;
    }
  }

  /* ═══ MOVIES SHOWCASE ═══ */
  .showcase-section {
    padding: 60px 0;
    overflow: hidden;
    background: #0d0d0d;
  }

  @media (min-width: 768px) {
    .showcase-section {
      padding: 120px 0;
    }
  }

  .showcase-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 0 20px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  @media (min-width: 768px) {
    .showcase-header {
      margin-bottom: 60px;
      padding: 0 60px;
    }
  }

  .showcase-header.visible { opacity: 1; transform: translateY(0); }

  /* Infinite scroll strips */
  .strip-wrap { overflow: hidden; margin-bottom: 16px; }

  @media (min-width: 768px) {
    .strip-wrap {
      margin-bottom: 20px;
    }
  }

  .strip {
    display: flex;
    gap: 12px;
    animation: scrollLeft 30s linear infinite;
    width: max-content;
  }

  @media (min-width: 768px) {
    .strip {
      gap: 20px;
    }
  }

  .strip.reverse { animation: scrollRight 35s linear infinite; }

  @keyframes scrollLeft {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  @keyframes scrollRight {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }

  .strip-poster {
    width: 100px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid #1a1a1a;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  @media (min-width: 480px) {
    .strip-poster {
      width: 130px;
      height: 195px;
    }
  }

  @media (min-width: 768px) {
    .strip-poster {
      width: 160px;
      height: 240px;
      border-radius: 12px;
    }
  }

  .strip-poster:hover {
    transform: scale(1.08) translateY(-8px);
    box-shadow: 0 20px 40px rgba(229,9,20,0.3);
    z-index: 10;
    position: relative;
  }

  /* ═══ HOW IT WORKS ═══ */
  .how-section {
    padding: 60px 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .how-section {
      padding: 120px 60px;
    }
  }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 40px;
  }

  @media (min-width: 768px) {
    .steps-list {
      margin-top: 80px;
    }
  }

  .step-row {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 20px;
    align-items: start;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.7s ease;
    padding-bottom: 30px;
    position: relative;
  }

  @media (min-width: 768px) {
    .step-row {
      grid-template-columns: 80px 1fr;
      gap: 32px;
      padding-bottom: 48px;
    }
  }

  .step-row::before {
    content: '';
    position: absolute;
    left: 29px;
    top: 50px;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--red), transparent);
  }

  @media (min-width: 768px) {
    .step-row::before {
      left: 39px;
      top: 60px;
    }
  }

  .step-row:last-child::before { display: none; }
  .step-row.visible { opacity: 1; transform: translateX(0); }

  .step-num-big {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--red-dim);
    border: 2px solid var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    color: var(--red);
    flex-shrink: 0;
    box-shadow: 0 0 30px rgba(229,9,20,0.2);
  }

  @media (min-width: 768px) {
    .step-num-big {
      width: 80px;
      height: 80px;
      font-size: 32px;
    }
  }

  .step-content { padding-top: 8px; }

  @media (min-width: 768px) {
    .step-content {
      padding-top: 16px;
    }
  }

  .step-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 1.5px;
    color: #fff;
    margin-bottom: 6px;
  }

  @media (min-width: 768px) {
    .step-title {
      font-size: 28px;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
  }

  .step-desc { 
    font-size: 13px; 
    color: var(--muted); 
    line-height: 1.6; 
  }

  @media (min-width: 768px) {
    .step-desc {
      font-size: 15px;
      line-height: 1.7;
    }
  }

  /* ═══ CTA SECTION ═══ */
  .cta-section {
    padding: 80px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .cta-section {
      padding: 160px 60px;
    }
  }

  .cta-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(229,9,20,0.15) 0%, transparent 70%);
  }

  .cta-content { position: relative; z-index: 1; }

  .cta-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 4px;
    line-height: 1.2;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }

  @media (min-width: 480px) {
    .cta-title {
      font-size: 48px;
      letter-spacing: 5px;
    }
  }

  @media (min-width: 768px) {
    .cta-title {
      font-size: clamp(48px, 8vw, 100px);
      letter-spacing: 6px;
      margin-bottom: 24px;
    }
  }

  .cta-title.visible { opacity: 1; transform: translateY(0); }
  .cta-title span { color: var(--red); }

  .cta-sub {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 32px;
    opacity: 0;
    transition: all 0.8s 0.2s ease;
    padding: 0 10px;
  }

  @media (min-width: 768px) {
    .cta-sub {
      font-size: 18px;
      margin-bottom: 48px;
    }
  }

  .cta-sub.visible { opacity: 1; }

  .cta-btn {
    padding: 14px 40px;
    background: linear-gradient(135deg, #e50914, #ff2d20);
    color: #fff;
    border: none;
    border-radius: 50px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 8px 40px rgba(229,9,20,0.5);
    opacity: 0;
    transform: translateY(20px);
  }

  @media (min-width: 768px) {
    .cta-btn {
      padding: 20px 80px;
      font-size: 24px;
      letter-spacing: 4px;
    }
  }

  .cta-btn.visible { opacity: 1; transform: translateY(0); }
  .cta-btn:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 16px 60px rgba(229,9,20,0.7); }

  /* ═══ FOOTER ═══ */
  .intro-footer {
    padding: 24px 20px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    text-align: center;
  }

  @media (min-width: 768px) {
    .intro-footer {
      padding: 40px 60px;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      gap: 0;
    }
  }

  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 2.5px;
  }

  @media (min-width: 768px) {
    .footer-logo {
      font-size: 22px;
      letter-spacing: 3px;
    }
  }

  .footer-logo span { color: var(--red); }
  .footer-text { font-size: 11px; color: var(--muted); }

  @media (min-width: 768px) {
    .footer-text {
      font-size: 12px;
    }
  }
`;

// 🎬 Movie posters for showcase strips
const POSTERS_ROW1 = [
  "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  "https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  "https://image.tmdb.org/t/p/w300/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  "https://image.tmdb.org/t/p/w300/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "https://image.tmdb.org/t/p/w300/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  "https://image.tmdb.org/t/p/w300/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
];

const POSTERS_ROW2 = [
  "https://image.tmdb.org/t/p/w300/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  "https://image.tmdb.org/t/p/w300/qNBAXBIQlnOThrVvA6mA2B5ggkR.jpg",
  "https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  "https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  "https://image.tmdb.org/t/p/w300/nkayOAUBUu4mMvyNf9iHSUiPjF1.jpg",
  "https://image.tmdb.org/t/p/w300/a0NLxi8oBMkSNvjn4a7fjXRFqRh.jpg",
  "https://image.tmdb.org/t/p/w300/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
  "https://image.tmdb.org/t/p/w300/vfzE3pjE5G7G7kcZWrA3fnbZo7V.jpg",
];

const FEATURES = [
  { icon: "🎬", title: "Vast Movie Library", desc: "Browse hundreds of movies across every genre — from timeless classics to the latest blockbusters." },
  { icon: "⭐", title: "Rate & Recommend", desc: "Share your thoughts with the community. Rate movies on a 10-star scale and write detailed reviews." },
  { icon: "🔐", title: "Secure Authentication", desc: "Login with Google in one click or register with OTP email verification. Your data is always protected." },
  { icon: "▶️", title: "Instant Trailers", desc: "Watch YouTube trailers directly inside the app without leaving the page." },
  { icon: "🔍", title: "Smart Search", desc: "Search by title, genre, director or actor. Filter by genre chips to narrow down your choices." },
  { icon: "👑", title: "Admin Dashboard", desc: "Full CRUD control for administrators — add, edit, and manage the entire library with ease." },
];

const STEPS = [
  { num: "01", title: "Create Your Account", desc: "Register with your email and OTP verification, or sign in instantly with your Google account." },
  { num: "02", title: "Explore the Library", desc: "Browse our curated movie collection. Use search and genre filters to find exactly what you're looking for." },
  { num: "03", title: "Watch Trailers", desc: "Click any movie to see full details and watch the official trailer embedded right in the app." },
  { num: "04", title: "Share Your Thoughts", desc: "Rate movies and write reviews. Your recommendations help the entire community discover great films." },
];

// Custom hook for scroll animation
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(
      ".stat-item, .section-header, .feature-card, .showcase-header, .step-row, .cta-title, .cta-sub, .cta-btn"
    ).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Animated counter
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 25);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function IntroPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Duplicate posters for infinite loop
  const row1 = [...POSTERS_ROW1, ...POSTERS_ROW1];
  const row2 = [...POSTERS_ROW2, ...POSTERS_ROW2];

  return (
    <>
      <style>{styles}</style>

      {/* ── NAVBAR ── */}
      <nav className={`intro-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">WATCH<span>WISE</span></div>
        <button className="nav-btn" onClick={() => navigate("/login")}>
          GET STARTED
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline
          src="https://www.w3schools.com/html/mov_bbb.mp4" />
        <div className="hero-overlay" />
        <div className="hero-overlay-bottom" />

        <div className="hero-content">
          <div className="hero-badge">
            🎬 &nbsp; The Ultimate Movie Experience
          </div>
          <h1 className="hero-title">
            DISCOVER
            <span className="line2">YOUR CINEMA</span>
          </h1>
          <p className="hero-sub">
            Explore thousands of movies, watch trailers, rate your favourites
            and share recommendations with a community of film lovers.
          </p>
          <div className="hero-buttons">
            <button className="btn-enter" onClick={() => navigate("/login")}>
              🚀 ENTER WATCHWISE
            </button>
            <button className="btn-outline"
              onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
              LEARN MORE ↓
            </button>
          </div>
        </div>

        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        {[
          { n: 500, s: "+", label: "Movies" },
          { n: 50, s: "+", label: "Genres" },
          { n: 10, s: "K+", label: "Reviews" },
          { n: 99, s: "%", label: "Satisfaction" },
        ].map((s, i) => (
          <div className="stat-item" key={i}
            style={{ transitionDelay: `${i * 0.15}s` }}>
            <div className="stat-number">
              <Counter target={s.n} suffix={s.s} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div className="section-header">
          <span className="section-tag">Why WatchWise</span>
          <h2 className="section-title">
            EVERYTHING YOU<br /><span>NEED</span>
          </h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i}
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="feature-icon">{f.icon}</span>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section className="showcase-section">
        <div className="showcase-header">
          <span className="section-tag">Our Collection</span>
          <h2 className="section-title">
            BROWSE THE<br /><span>LIBRARY</span>
          </h2>
        </div>

        <div className="strip-wrap">
          <div className="strip">
            {row1.map((src, i) => (
              <img key={i} className="strip-poster" src={src}
                alt="movie" onError={e => e.target.style.display = "none"} />
            ))}
          </div>
        </div>

        <div className="strip-wrap">
          <div className="strip reverse">
            {row2.map((src, i) => (
              <img key={i} className="strip-poster" src={src}
                alt="movie" onError={e => e.target.style.display = "none"} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">
            HOW IT<br /><span>WORKS</span>
          </h2>
        </div>
        <div className="steps-list">
          {STEPS.map((s, i) => (
            <div className="step-row" key={i}
              style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="step-num-big">{s.num}</div>
              <div className="step-content">
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-content">
          <h2 className="cta-title">
            READY TO<br /><span>WATCH?</span>
          </h2>
          <p className="cta-sub">
            Join WatchWise today. It's free, fast and built for film lovers.
          </p>
          <button className="cta-btn" onClick={() => navigate("/login")}>
            🎬 START WATCHING NOW
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="intro-footer">
        <div className="footer-logo">WATCH<span>WISE</span></div>
        <div className="footer-text">© 2026 WatchWise · Built with ❤️ for cinema lovers</div>
      </footer>
    </>
  );
}

export default IntroPage;