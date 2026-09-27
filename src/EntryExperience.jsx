import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { openingMessages } from './weddingData';

export default function EntryExperience({
  isOpen,
  openInvitation,
  introHold,
  openingSequence,
  typedOpeningMessage,
  entryVideo,
  closingEntryVideo,
  entryVideoRef,
  finishEntryVideo
}) {
  return <>
    {introHold && <div className="intro-hold" aria-hidden="true" />}
    {openingSequence && <OpeningSequence message={typedOpeningMessage} />}
    {entryVideo && <div className={`entry-video-screen${closingEntryVideo ? ' closing' : ''}`}><video ref={entryVideoRef} src="/entry02.mp4" autoPlay muted playsInline onEnded={finishEntryVideo} /><div className="entry-video-wine" /><RosePetalRain /></div>}
    {!isOpen && <div className="cover"><div className="cover-image" /><div className="cover-content"><div className="seal"><img src="/ganpatiji.png" alt="Golden Ganapati" /></div><p className="eyebrow">|| श्री गणेशाय नमः ||</p><h1>Tanya Shree<br /><em>Weds</em><br />Adarsh Singh</h1><p className="cover-subtitle">TOGETHER WITH THEIR FAMILIES</p><button className="gold-button" onClick={openInvitation}>Tap To Open <Heart /></button></div></div>}
  </>;
}

function OpeningSequence({ message }) {
  return <div className="opening-sequence" role="dialog" aria-label="Ganesh Sanskrit shloka"><div className="opening-glow" /><div className="opening-content"><Sparkles className="opening-sparkle" /><p className="opening-message"><span>{message.split('\n').map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span></p><small>शुभारम्भ</small></div></div>;
}

function RosePetalRain() {
  const petals = Array.from({ length: 42 }, (_, index) => index);
  return <div className="rose-petal-rain" aria-hidden="true">{petals.map((petal) => <i key={petal} style={{ '--left': `${(petal * 37) % 100}%`, '--delay': `${(petal % 14) * -0.55}s`, '--duration': `${3.8 + (petal % 7) * .45}s`, '--drift': `${-3 + (petal % 9)}rem` }}>❀</i>)}</div>;
}
