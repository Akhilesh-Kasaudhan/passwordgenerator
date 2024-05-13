import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
 const [length,setlength]=useState(8);
 const [numAllowed,setNumAllowed]=useState(false);
 const [charAllowed,setCharAllowed]=useState(false);
 const [password,setPassword]=useState("")

 //ref hook
 const passwordRef=useRef(null);
 const passwordGenerator=useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numAllowed){
    str+="0123456789"
  }
  if(charAllowed){
    str+="!@#$^&*_-"
  }
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1);
    pass+=str.charAt(char);
  }
  setPassword(pass)

 },[length,numAllowed,charAllowed,setPassword])
   
 const cpypassToClipBoard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 20);
  window.navigator.clipboard.writeText(password)
 },[password])

 useEffect(()=>{
  passwordGenerator()
 },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-red-500 bg-gray-600'>
    <h1 className='text-3xl font-bold text-center my-2 text-black'>Password Generator</h1>
       <div className='flex shadoe rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button className='outline-none bg-emerald-600 text-white px-3 py-1 shrink-0'
        onClick={cpypassToClipBoard}
        >Copy</button>
       </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={20} value={length} className='cursor-pointer'
           onChange={(e)=>{setlength(e.target.value)}}  />
          <label>Length: ({length})</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numAllowed}
          id='numberInput'
          onChange={()=>{
            setNumAllowed((prev)=>!prev)
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }} />
          <label htmlFor="charInput">Characters</label>
        </div>
       </div>
    </div>
    
    </>
  )
}

export default App
