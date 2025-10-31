import React, { useState, useRef } from 'react'

const AudioPlayer = ({ text, language = 'hi' }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const handlePlay = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1
      
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      
      speechSynthesis.speak(utterance)
    } else {
      alert('Audio playback not supported in your browser')
    }
  }

  const handleStop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
  }

  return (
    <button 
      className={`audio-btn ${isPlaying ? 'playing' : ''}`}
      onClick={isPlaying ? handleStop : handlePlay}
      aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
    >
      {isPlaying ? '⏹️' : '🔊'}
    </button>
  )
}

export default AudioPlayer