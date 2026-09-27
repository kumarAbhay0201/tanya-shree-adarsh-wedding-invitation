import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Send, Sparkles } from 'lucide-react';
import { events } from './weddingData';

export default function InvitationContent({ timeLeft, wishes, newWish, setNewWish, submitWish }) {
  return <main className="invitation visible">
    <section className="hero"><div className="hero-image" /><div className="hero-content"><p className="eyebrow">|| श्री गणेशाय नमः ||</p><h1>Tanya Shree<br /><em>&amp;</em><br />Adarsh Singh</h1><p className="quote">Two souls, one heart, entering into a sacred bond of love and togetherness.</p><div className="countdown">{[['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Mins', timeLeft.minutes], ['Secs', timeLeft.seconds]].map(([label, value]) => <div className="count" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></section>
    <ScratchDate />
    <section id="story" className="section story"><SectionTitle eyebrow="Eternal Bond">Our Story</SectionTitle><div className="story-grid"><figure className="feature-photo"><img src="/2.jpeg" alt="Couple portrait" /></figure><div className="story-copy"><h3>A Match Made in Heaven</h3><p>From quiet moments of shared laughter to building dreams together, our journey has been blessed with love, respect, and unconditional support.</p><p>With the divine blessings of our elders, we take this sacred step toward a new chapter of our lives, forever united in love and friendship.</p><div className="date-note"><Sparkles /><span><b>30th November 2026</b><small>The Sacred Union</small></span></div></div></div></section>
    <section className="section dark-band parichay-section"><SectionTitle eyebrow="With Blessings Of Elders">Vadhu - Var Parichay</SectionTitle><div className="parichay-card"><span className="parichay-flower top-left">❧</span><span className="parichay-flower top-right">❧</span><Person title="वधू परिचय" name="Tanya Shree" relation="D/o" parents="Dr. Sunita Singh & Shri. Dhirendra Kumar Mall" /><div className="parichay-divider"><span />&<span /></div><Person title="वर परिचय" name="Adarsh Singh" relation="S/o" parents="Smt. Meenakshi Singh & Dr. Ranjeet Singh" /><div className="parichay-blessing">सर्वे भवन्तु सुखिनः <em>May all be happy.</em></div><span className="parichay-flower bottom-left">❧</span><span className="parichay-flower bottom-right">❧</span></div></section>
    <section className="section"><SectionTitle eyebrow="Captured Memories">Moments Together</SectionTitle><div className="moments"><Photo src="/3.jpeg" alt="Couple memory one" label="A Beautiful Beginning" title="Together in Every Moment" /><Photo src="/4.jpeg" alt="Couple memory two" label="Joyful Celebrations" title="Laughter & Togetherness" /><Photo src="/5.jpeg" alt="Couple memory three" label="Cherished Memories" title="Two Hearts, One Journey" /><Photo src="/6.jpeg" alt="Couple memory four" label="With Love" title="Forever Starts Here" /></div></section>
    <section className="section events-section"><SectionTitle eyebrow="Celebration Schedule">Wedding Itinerary</SectionTitle><div className="event-list">{events.map((event) => <EventCard event={event} key={event.title} />)}</div></section>
    <section className="section dark-band venue"><SectionTitle eyebrow="Destination">The Wedding Venue</SectionTitle><div className="venue-box"><MapPin /><h3>Railway Club, Gorakhpur</h3><p>30th November 2026 · Monday · 7:00 PM Onwards</p><a className="gold-button" href="https://www.google.com/maps/search/?api=1&query=Railway+Club+Gorakhpur" target="_blank" rel="noreferrer"><Navigation /> Open in Google Maps</a></div></section>
    <section className="section guestbook"><SectionTitle eyebrow="Warm Wishes">Blessings &amp; Wishes</SectionTitle><form onSubmit={submitWish}><label>Your Name<input required value={newWish.name} onChange={(event) => setNewWish({ ...newWish, name: event.target.value })} placeholder="Enter your name" /></label><label>Your Blessings / Message<textarea required rows="3" value={newWish.message} onChange={(event) => setNewWish({ ...newWish, message: event.target.value })} placeholder="Write your heartfelt blessings..." /></label><button className="gold-button submit" type="submit"><Send /> Send Blessings</button></form><div className="wishes">{wishes.map((wish, index) => <article className="wish" key={`${wish.name}-${index}`}><div><h3>{wish.name}</h3><small>{wish.time}</small></div><p>{wish.message}</p></article>)}</div></section>
    <footer><p>We Look Forward To Celebrating With You!</p><small>|| श्री गणेशाय नमः ||</small></footer>
  </main>;
}

function SectionTitle({ eyebrow, children }) { return <div className="section-title"><span>{eyebrow}</span><h2>{children}</h2><i /></div>; }
function ScratchDate() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const strokesRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const bounds = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = bounds.width * ratio;
    canvas.height = bounds.height * ratio;
    const context = canvas.getContext('2d');
    context.scale(ratio, ratio);
    const foil = context.createLinearGradient(0, 0, bounds.width, bounds.height);
    foil.addColorStop(0, '#f2d58f');
    foil.addColorStop(.45, '#b98432');
    foil.addColorStop(1, '#f7e0a5');
    context.fillStyle = foil;
    context.fillRect(0, 0, bounds.width, bounds.height);
    context.fillStyle = 'rgba(52, 20, 17, .55)';
    context.font = '600 12px Manrope';
    context.textAlign = 'center';
    context.fillText('SCRATCH TO REVEAL', bounds.width / 2, bounds.height / 2);
    return () => context.clearRect(0, 0, bounds.width, bounds.height);
  }, []);

  const scratch = (event) => {
    if (revealed || event.buttons === 0) return;
    const canvas = canvasRef.current;
    const bounds = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(event.clientX - bounds.left, event.clientY - bounds.top, 16, 0, Math.PI * 2);
    context.fill();
    strokesRef.current += 1;
    if (strokesRef.current > 48) setRevealed(true);
  };

  return <section className="scratch-section"><div className="scratch-card"><p className="eyebrow">A Date To Remember</p><h2>Scratch To Reveal</h2><div className={`scratch-date ${revealed ? 'revealed' : ''}`}><strong>30th November 2026</strong><small>Monday · The Sacred Union</small><div className="scratch-rain">{revealed && Array.from({ length: 36 }, (_, index) => <i key={index} style={{ '--left': `${(index * 47) % 101}%`, '--delay': `${(index * 137) % 1100}ms`, '--size': `${.9 + ((index * 29) % 10) / 10}rem` }}>✿</i>)}</div><canvas ref={canvasRef} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); scratch(event); }} onPointerMove={scratch} aria-label="Scratch to reveal wedding date" /></div></div></section>;
}
function Person({ title, name, relation, parents }) { return <article className="person"><span className="person-title">{title}</span><h3>{name}</h3><p><b>{relation}:</b> {parents}</p><p className="person-residence">[ GORAKHPUR, UTTAR PRADESH ]</p></article>; }
function Photo({ src, alt, label, title }) { return <figure className="moment"><img src={src} alt={alt} /><figcaption><small>{label}</small><b>{title}</b></figcaption></figure>; }
function EventCard({ event }) { const Icon = event.icon; return <article className="event"><div className="event-visual"><span>{event.title}</span><img src={event.image} alt={`${event.title} decoration`} onLoad={(eventTarget) => { eventTarget.currentTarget.previousElementSibling.style.display = 'none'; }} onError={(eventTarget) => { eventTarget.currentTarget.style.display = 'none'; }} /></div><div className="event-icon"><Icon /></div><div className="event-copy"><h3>{event.title}</h3><p>{event.date} · {event.day} · {event.time}</p><p className="event-address">{event.address}</p></div><div className="dress"><small>Dress Code</small><span>{event.dress}</span></div></article>; }
