import { useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()
  
// ref hook
  const passwordRef=useRef(null)

  const copyPasswordToClip=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)},[password])

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*()~`"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },
  [length, numberAllowed,charAllowed, setPassword])
  
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    
    <>
      <div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500'>
        <div className='flex shadow rounded-sm overflow-hidden mb-4 justify-center'>
          <h1 className='text-white my-3' >Password Generator</h1>
      </div>
      <div className='flex shadow-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' readOnly placeholder='Password' ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' id='copy' onClick={copyPasswordToClip}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          checked={charAllowed} id='characterInput' onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
          <label>Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
