import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, PictureInPicture2, RotateCcw, RotateCw, LoaderCircle } from 'lucide-react';
import { safeLocalStorageGet, safeLocalStorageSet } from '@/lib/storage';

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
function timeLabel(seconds) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}
function storedNumber(key, fallback, min, max) {
  const saved = safeLocalStorageGet(key);
  const value = saved == null ? fallback : Number(saved);
  return Number.isFinite(value) ? clamp(value, min, max) : fallback;
}

export default function VideoPlayer({ src, poster, title = 'Feet Klaw preview' }) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const previousVolume = useRef(0.8);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(() => storedNumber('fk_video_volume', 0.8, 0, 1));
  const [rate, setRate] = useState(() => {
    const saved = storedNumber('fk_video_rate', 1, 0.5, 2);
    return RATES.includes(saved) ? saved : 1;
  });
  const [fullscreen, setFullscreen] = useState(false);
  const [pip, setPip] = useState(false);
  const [canPip, setCanPip] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    setCanPip(!!document.pictureInPictureEnabled && typeof video.requestPictureInPicture === 'function');
    setCanFullscreen(typeof frameRef.current?.requestFullscreen === 'function' || typeof video.webkitEnterFullscreen === 'function');
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === frameRef.current);
    const enterPip = () => setPip(true);
    const leavePip = () => setPip(false);
    document.addEventListener('fullscreenchange', syncFullscreen);
    video.addEventListener('enterpictureinpicture', enterPip);
    video.addEventListener('leavepictureinpicture', leavePip);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen);
      video.removeEventListener('enterpictureinpicture', enterPip);
      video.removeEventListener('leavepictureinpicture', leavePip);
      video.pause();
      if (document.pictureInPictureElement === video) document.exitPictureInPicture().catch(() => {});
    };
  }, []);
  useEffect(() => {
    if (videoRef.current) { videoRef.current.volume = volume; videoRef.current.muted = volume === 0; }
    if (volume > 0) previousVolume.current = volume;
    safeLocalStorageSet('fk_video_volume', String(volume));
  }, [volume]);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
    safeLocalStorageSet('fk_video_rate', String(rate));
  }, [rate]);

  const syncTime = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    if (video.buffered.length) setBuffered(video.buffered.end(video.buffered.length - 1));
  };
  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    setNotice('');
    if (!video.paused) { video.pause(); return; }
    if (video.ended) video.currentTime = 0;
    try { await video.play(); } catch { setNotice('Playback could not start. Please try again.'); }
  };
  const seekTo = (seconds) => {
    if (!videoRef.current || !duration) return;
    videoRef.current.currentTime = clamp(seconds, 0, duration);
    syncTime();
  };
  const toggleMute = () => setVolume(volume > 0 ? 0 : previousVolume.current || 0.8);
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement === frameRef.current) await document.exitFullscreen();
      else if (frameRef.current?.requestFullscreen) await frameRef.current.requestFullscreen();
      else videoRef.current?.webkitEnterFullscreen?.();
    } catch { setNotice('Full screen is not available in this browser.'); }
  };
  const togglePip = async () => {
    if (!canPip || !duration) return;
    try {
      if (document.pictureInPictureElement === videoRef.current) await document.exitPictureInPicture();
      else await videoRef.current.requestPictureInPicture();
    } catch { setNotice('Picture-in-Picture is not available right now.'); }
  };
  const handleKeys = (event) => {
    if (event.target.closest('input, select, button, a') || event.ctrlKey || event.metaKey || event.altKey) return;
    const actions = {
      ' ': togglePlay, k: togglePlay, m: toggleMute, f: toggleFullscreen, p: togglePip,
      arrowleft: () => seekTo(currentTime - 5), arrowright: () => seekTo(currentTime + 5),
      arrowup: () => setVolume(clamp(volume + 0.1, 0, 1)), arrowdown: () => setVolume(clamp(volume - 0.1, 0, 1)),
      home: () => seekTo(0), end: () => seekTo(duration),
    };
    const action = actions[event.key.toLowerCase()];
    if (action) { event.preventDefault(); action(); }
  };
  const played = duration ? currentTime / duration * 100 : 0;
  const loaded = duration ? buffered / duration * 100 : 0;
  const iconProps = { size: 18, 'aria-hidden': true };

  return (
    <div ref={frameRef} className="fk-video-player" tabIndex={0} onKeyDown={handleKeys}
      role="region" aria-label={`${title} player`} data-testid="video-player">
      <div className="fk-video-screen">
        <video ref={videoRef} src={src} poster={poster} preload="metadata" playsInline
          aria-label={title} controlsList="nodownload" onClick={togglePlay}
          onLoadedMetadata={syncTime} onDurationChange={syncTime} onTimeUpdate={syncTime} onProgress={syncTime}
          onPlay={() => { setPlaying(true); setEnded(false); setError(''); }}
          onPause={() => { setPlaying(false); setWaiting(false); }}
          onWaiting={() => setWaiting(true)} onPlaying={() => setWaiting(false)}
          onCanPlay={() => setWaiting(false)} onEnded={() => { setEnded(true); setPlaying(false); }}
          onError={() => { setWaiting(false); setError('The preview could not load. Check your connection and try again.'); }}
          data-testid="preview-video" />
        <span className="fk-video-label">FEET KLAW · PREVIEW</span>
        {!playing && !error && <button type="button" className="fk-video-play" onClick={togglePlay} aria-label={ended ? 'Replay preview' : 'Play preview'}>{ended ? <RotateCcw size={30} aria-hidden="true" /> : <Play size={30} fill="currentColor" aria-hidden="true" />}</button>}
        {waiting && playing && <div className="fk-video-loading" role="status"><LoaderCircle className="animate-spin" aria-hidden="true" /><span className="sr-only">Buffering preview</span></div>}
        {error && <div className="fk-video-error" role="alert"><p>{error}</p><button type="button" className="fk-button" onClick={() => { setError(''); videoRef.current?.load(); }}>Try again</button></div>}
      </div>
      <div className="fk-video-toolbar">
        <label className="sr-only" htmlFor="fk-preview-seek">Video position</label>
        <input id="fk-preview-seek" className="fk-video-seek" type="range" min="0" max={duration || 1} step="0.1"
          value={Math.min(currentTime, duration || 1)} disabled={!duration} onChange={(event) => seekTo(Number(event.target.value))}
          aria-valuetext={`${timeLabel(currentTime)} of ${timeLabel(duration)}`}
          style={{ background: `linear-gradient(to right, #c8a45d ${played}%, transparent ${played}%), linear-gradient(to right, rgba(255,255,255,.3) ${loaded}%, rgba(255,255,255,.12) ${loaded}%)` }} />
        <div className="fk-video-actions">
          <button type="button" className="fk-video-control" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} title="Play / pause (Space or K)">{playing ? <Pause {...iconProps} /> : <Play {...iconProps} />}</button>
          <button type="button" className="fk-video-control" disabled={!duration} onClick={() => seekTo(currentTime - 5)} aria-label="Back 5 seconds" title="Back 5 seconds"><RotateCcw {...iconProps} /><span className="fk-video-small">5</span></button>
          <button type="button" className="fk-video-control" disabled={!duration} onClick={() => seekTo(currentTime + 5)} aria-label="Forward 5 seconds" title="Forward 5 seconds"><RotateCw {...iconProps} /><span className="fk-video-small">5</span></button>
          <span className="fk-video-time" aria-live="off">{timeLabel(currentTime)} <span>/ {timeLabel(duration)}</span></span>
          <div className="fk-video-volume"><button type="button" className="fk-video-control" onClick={toggleMute} aria-label={volume === 0 ? 'Unmute' : 'Mute'} title="Mute (M)">{volume === 0 ? <VolumeX {...iconProps} /> : <Volume2 {...iconProps} />}</button><input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volume" aria-valuetext={`${Math.round(volume * 100)} percent`} /></div>
          <div className="fk-video-spacer" />
          <select aria-label="Playback speed" value={rate} onChange={(event) => setRate(Number(event.target.value))} className="fk-video-rate">{RATES.map((value) => <option key={value} value={value}>{value}×</option>)}</select>
          {canPip && <button type="button" className="fk-video-control" disabled={!duration} onClick={togglePip} aria-label={pip ? 'Exit Picture-in-Picture' : 'Picture-in-Picture'} title="Picture-in-Picture (P)" aria-pressed={pip}><PictureInPicture2 {...iconProps} /></button>}
          {canFullscreen && <button type="button" className="fk-video-control" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit full screen' : 'Full screen'} title="Full screen (F)">{fullscreen ? <Minimize {...iconProps} /> : <Maximize {...iconProps} />}</button>}
        </div>
        <div className="fk-video-hints">Space / K: play · ← →: seek · M: mute · F: full screen</div>
        {notice && <p className="fk-video-notice" role="status">{notice}</p>}
      </div>
    </div>
  );
}
