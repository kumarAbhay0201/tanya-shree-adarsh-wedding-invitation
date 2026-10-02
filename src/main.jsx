import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';
import {
  Volume2, VolumeX
} from 'lucide-react';
import EntryExperience from './EntryExperience';
import InvitationContent from './InvitationContent';
import { events, initialWishes, openingMessages } from './weddingData';
import './styles.css';

function countdown() {
  const distance = new Date('2026-11-30T19:00:00').getTime() - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };
}

function SectionTitle({ eyebrow, children }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{children}</h2><i /></div>;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [openingSequence, setOpeningSequence] = useState(false);
  const [openingMessage, setOpeningMessage] = useState(0);
  const [typedOpeningMessage, setTypedOpeningMessage] = useState('');
  const [introHold, setIntroHold] = useState(false);
  const [entryVideo, setEntryVideo] = useState(false);
  const [closingEntryVideo, setClosingEntryVideo] = useState(false);
  const [celebrationBurst, setCelebrationBurst] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(countdown);
  const [wishes, setWishes] = useState(initialWishes);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const audioRef = useRef(null);
  const entryVideoRef = useRef(null);
  const introDelayRef = useRef(null);
  const celebrationTriggeredRef = useRef(false);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(countdown()), 1000);
    return () => {
      window.clearInterval(interval);
      if (introDelayRef.current) window.clearTimeout(introDelayRef.current);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1
    });
    let frameId;
    const animate = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(animate);
    };
    frameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = introHold || openingSequence || entryVideo ? 'hidden' : '';
    if (!openingSequence) return undefined;
    setOpeningMessage(0);
    return () => {
      if (!entryVideo) document.body.style.overflow = '';
    };
  }, [introHold, openingSequence, entryVideo]);

  useEffect(() => {
    if (!entryVideo) return undefined;
    const playVideo = () => entryVideoRef.current?.play().catch(() => {});
    playVideo();
    return () => document.body.style.overflow = '';
  }, [entryVideo]);

  useEffect(() => {
    if (!openingSequence) return undefined;
    const message = openingMessages[openingMessage];
    let characterIndex = 0;
    setTypedOpeningMessage('');
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setTypedOpeningMessage(message.slice(0, characterIndex));
      if (characterIndex >= message.length) window.clearInterval(typingTimer);
    }, 12000 / message.length);
    return () => window.clearInterval(typingTimer);
  }, [openingMessage, openingSequence]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const audioTimer = window.setInterval(() => {
      if (!celebrationTriggeredRef.current && audioRef.current?.currentTime >= 67) {
        celebrationTriggeredRef.current = true;
        setCelebrationBurst(true);
        window.setTimeout(() => setCelebrationBurst(false), 30000);
      }
    }, 250);
    return () => window.clearInterval(audioTimer);
  }, [isPlaying]);

  const openInvitation = () => {
    setIsOpen(true);
    setIntroComplete(false);
    setIntroHold(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 12;
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        const fadeTimer = window.setInterval(() => {
          if (!audioRef.current) return;
          audioRef.current.volume = Math.min(audioRef.current.volume + 0.08, 1);
          if (audioRef.current.volume >= 1) window.clearInterval(fadeTimer);
        }, 160);
      }).catch(() => setIsPlaying(false));
    }
    introDelayRef.current = window.setTimeout(() => {
      setIntroHold(false);
      setOpeningSequence(true);
      setEntryVideo(true);
    }, 3000);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const finishEntryVideo = () => {
    setClosingEntryVideo(true);
    setOpeningSequence(false);
    window.setTimeout(() => {
      setEntryVideo(false);
      setClosingEntryVideo(false);
      setIntroComplete(true);
    }, 1400);
  };

  const submitWish = (event) => {
    event.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;
    setWishes([{ ...newWish, time: 'Just now' }, ...wishes]);
    setNewWish({ name: '', message: '' });
  };

  return (
    <div className="app-shell">
      <audio ref={audioRef} loop src="/shubh_din.mp3" />
      {isOpen && introComplete && <button className="audio-toggle" onClick={toggleAudio} aria-label="Toggle background music">{isPlaying ? <Volume2 /> : <VolumeX />}</button>}
      <EntryExperience isOpen={isOpen} openInvitation={openInvitation} introHold={introHold} openingSequence={openingSequence} typedOpeningMessage={typedOpeningMessage} entryVideo={entryVideo} closingEntryVideo={closingEntryVideo} entryVideoRef={entryVideoRef} finishEntryVideo={finishEntryVideo} />
      {celebrationBurst && <CelebrationBurst />}

      {isOpen && introComplete && <InvitationContent timeLeft={timeLeft} wishes={wishes} newWish={newWish} setNewWish={setNewWish} submitWish={submitWish} />}
    </div>
  );
}

function CelebrationBurst() {
  const sparks = Array.from({ length: 72 }, (_, index) => index);
  const hearts = Array.from({ length: 120 }, (_, index) => index);
  return <div className="celebration-burst" aria-hidden="true"><div className="love-rain">{hearts.map((heart) => <span key={heart} style={{ '--left': `${(heart * 73 + 11) % 103}%`, '--delay': `${(heart * 137) % 4200}ms`, '--fall': `${6.5 + ((heart * 29) % 35) / 10}s`, '--drift': `${-12 + ((heart * 47) % 25)}vw`, '--size': `${.8 + ((heart * 31) % 15) / 10}rem`, '--rotation': `${-240 + ((heart * 61) % 480)}deg` }}>♥</span>)}</div><div className="firework left">{sparks.map((spark) => <i key={`left-${spark}`} style={{ '--delay': `${spark * 10}ms`, '--angle': `${spark * 5}deg`, '--distance': `${10 + (spark % 8) * 2.2}rem` }} />)}</div><div className="firework right">{sparks.map((spark) => <i key={`right-${spark}`} style={{ '--delay': `${spark * 10}ms`, '--angle': `${spark * 5}deg`, '--distance': `${10 + (spark % 8) * 2.2}rem` }} />)}</div></div>;
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Analytics />
  </>
);
