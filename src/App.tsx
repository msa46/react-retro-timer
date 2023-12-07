import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { 
  Accordion,   
  AccordionContent,
  AccordionItem,
  AccordionTrigger, 
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'

import { Check, Pause, Play, Plus, Square } from 'lucide-react'
import { Label } from '@/components/ui/label'
import './App.css'


function App() {
  const [numberOfSessions, setNumberOfSessions] = useState(4)
  const [currentSession, setCurrentSession] = useState(0)
  const [session, setSession] = useState(25)
  const [rest, setRest] = useState(5)
  const [finalRest, setFinalRest] = useState(15)
  const [isPaused, setPaused] = useState(false)
  const [fade, setFade] = useState(false)

  const [timer, setTimer] = useState(session * 60)
  const [minutes, setMinutes] = useState(session.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
  const [seconds, setSeconds] = useState('00')

  const [isPlaying, setIsPlaying] = useState(false)

  const [localStates, setLocalState] = useState({
    numberOfSessions: numberOfSessions,
    session: session,
    rest: rest, 
    finalRest: finalRest
  })

  useEffect(() => {
    const minute = Math.floor(timer / 60)
    const second = timer - 60 * minute
    setMinutes(minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
    setSeconds(second.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))

    const interval = setInterval(() => {
     
      if (isPlaying == true && isPaused == false) {
        setTimer(timer - 1)
      
        if (timer == 0){
          setCurrentSession(currentSession + 1)
          if (currentSession == ((2 * localStates.numberOfSessions) - 1)) {
            setTimer(localStates.finalRest * 60)
          }
          else if (currentSession > ((2 * localStates.numberOfSessions) - 1)){
            setTimer(0)
            setIsPlaying(false)
          }
          else if (currentSession % 2 == 0){
            setTimer(localStates.session * 60)
          }
          else if (currentSession % 2 == 1){
            setTimer(localStates.rest * 60)
          }
        } 

      }
    else if(isPlaying == false && isPaused == false) {
        setLocalState(state => ({...state, numberOfSessions, session, finalRest, rest}))
        
        if ((currentSession % 2 == 0) && (timer < localStates.session * 60)){
          setTimer(localStates.session * 60)
        }
        else if ((currentSession % 2 == 1) && (timer < localStates.rest * 60)){
          setTimer(localStates.rest * 60)
        }
    }
    
    }, 1000)
    return () => clearTimeout(interval)
  }, [timer, currentSession, isPlaying, localStates, isPaused, session, numberOfSessions, rest, finalRest])

  const onPlay = () => {
    setTimer(timer => timer -1)
    setIsPlaying(true)
    setPaused(false)
  }
  
  const onSaveState = () => {
    setTimer(session * 60)
    setCurrentSession(0)
    setIsPlaying(true)
  }

  const onPause = () => {
    setIsPlaying(false)
    setPaused(true)
  }

  const onStop = () => {
    setIsPlaying(false)
    setPaused(false)
    setCurrentSession(0)
    setTimer(session * 60)
    
  }

  const onExtend = () => {
    setTimer(timer => timer + 60)
    setFade(true)
    setTimeout(() => {
      setFade(false)
    }, 1000)
    
  }
  return (
    <div className=' left-0 top-0 fixed flex  min-h-screen items-stretch  bg-stone-900'>
    <div className='flex flex-col justify-center items-center text-center   min-h-screen w-screen'>
      <div className={`flex transition-all duration-1000 text-slate-500 mr-28 text-6xl ${fade ? 'opacity-100': 'opacity-0' }`}>
        +1
      </div>
      <div className='flex-col text-8xl text-white '>
      {minutes}:{seconds}
      </div>
      <div className='flex'>
      <Button className='flex mx-1 bg-stone-800 hover:bg-stone-700 text-white' variant='outline' size='icon' onClick={onExtend}>
          <Plus />
        </Button>
        <Button className='flex mx-1 bg-sky-950 hover:bg-sky-900 text-white' variant='outline' size='icon' onClick={onPlay}>
          <Play />
        </Button>
        <Button className='flex mx-1 bg-stone-800 hover:bg-stone-700 text-white' variant='outline' size='icon' onClick={onPause}>
          <Pause />
        </Button>
        <Button className='flex mx-1 bg-stone-800 hover:bg-stone-700 text-white' variant='outline' size='icon' onClick={onStop}>
          <Square />
        </Button>
      </div>
      <div className='flex justify-center items-center'>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-white' > </AccordionTrigger>
            <AccordionContent className='flex-col'>
              <Label>Sessions</Label>
              <Input
              className='flex'
              value={numberOfSessions}
              onChange={e => setNumberOfSessions(Number(e.target.value))}
              />
              <Label>Length</Label>
              <Input
              className='flex'
              value={session}
              onChange={e => setSession(Number(e.target.value))}
              />
              <Label>Rests</Label>
              <Input
              className='flex'
              value={session - 1 }
              disabled={true}
              />
              <Label>Length</Label>
              <Input
              className='flex'
              value={rest}
              onChange={e => setRest(Number(e.target.value))}
              />
              <Label>Break</Label>
              <Input
              className='flex'
              value={finalRest}
              onChange={e => setFinalRest(Number(e.target.value))}
              />
              <Button className='flex m-2 bg-teal-950 hover:bg-teal-900 text-white' variant='outline' size='icon' onClick={onSaveState}>
                <Check/ >
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      </div>
    </div>
  )
}

export default App
