import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [numberOfSessions, setNumberOfSessions] = useState(4)
  const [currentSession, setCurrentSession] = useState(0)
  const [session, setSession] = useState(25)
  const [rest, setRest] = useState(5)
  const [finalRest, setFinalRest] = useState(15)

  const [timer, setTimer] = useState(session * 60)
  const [minutes, setMinutes] = useState(session.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
  const [seconds, setSeconds] = useState("00")

  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    const interval = setTimeout(() => {
    if (isPlaying == true) {
      setTimer(timer - 1)
      var minute = Math.floor(timer / 60)
      var second = timer - 60 * minute
      setMinutes(minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
      setSeconds(second.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
      if (timer == 0){
        setCurrentSession(currentSession + 1)
        if (currentSession == ((2 * numberOfSessions) - 1)) {
          console.log("long rest")
          setTimer(finalRest * 60)
        }
        else if (currentSession > ((2 * numberOfSessions) - 1)){
          setTimer(0)
          setIsPlaying(false)
        }
        else if (currentSession % 2 == 0){
          setTimer(session * 60)
        }
        else if (currentSession % 2 == 1){
          setTimer(rest * 60)
        }
      } 

    }
    }, 1000)
    return () => clearTimeout(interval)
  }, [timer, currentSession, isPlaying])

  const onPlay = () => {
    setIsPlaying(true)
  }
  return (
    <>
    <div>
      {minutes}:{seconds}
    </div>
      <input
       value={numberOfSessions}
       onChange={e => setNumberOfSessions(Number(e.target.value))}
      />
      <input
       value={session}
       onChange={e => setSession(Number(e.target.value))}
      />
      <input
       value={rest}
       onChange={e => setRest(Number(e.target.value))}
      />
      <input
       value={finalRest}
       onChange={e => setFinalRest(Number(e.target.value))}
      />
      <button onClick={onPlay}>
        play
      </button>
    </>
  )
}

export default App
