"use client"
import { useState, useMemo } from "react"
import styles from "./page.module.css"
console.log("CSS MODULE:", styles)

export default function Home() {
  const [website_list, setWebsite_list] = useState<string[]>([])
  const [password_list, setPassword_list] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState<number[]>([])
  const [password, setPassword] = useState("")
  const [website, setWebsite] = useState("")

  const theList = useMemo(()=>{
    return website_list.map((name, index)=>{
      return {
        id: index,
        name: name,
        pswrd: password_list[index]
      }
    })
  }, [website_list, password])

  const handleWebsite = (event: any) => {
    setWebsite(event.target.value)
  }
  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }

  const handleAdd = (event: any) => {
    if(website && password !== ''){
      setWebsite_list([...website_list, website])
      setPassword_list([...password_list, password])
      setPassword('')
      setWebsite('')
    }
  }

  const handleEnter = (event:any) => {
    if(event.key === "Enter"){
      handleAdd(event);
    }
  }
  
  const handleShowPassword = (id: number) => {
    setShowPassword(prev =>
      prev.includes(id)
        ? prev.filter(passwordId => passwordId !== id) : [...prev, id]
    )
  }

  const handleDeleteRecord = (id: number) => {
    setWebsite_list(prev => prev.filter((_, index) => index !== id))
    setPassword_list(prev => prev.filter((_, index) => index !== id))
    setShowPassword(prev => prev.filter(passwordId => passwordId !== id))
  }

  return (
    <>
      <input className={styles.input} name="website" value={website} onChange={handleWebsite} onKeyDown={handleEnter}></input>
      <input className={styles.input} name="password" value={password} onChange={handlePassword} onKeyDown={handleEnter} type={showPassword ? "text" : "password"}></input>
      <button className={styles.button} onClick={handleAdd}>add</button>
      <p></p>
      <div className={styles.list}>
        {theList.map((item, index) => {
          return (
            <div className={styles.record} key={item.id}>
              <p className={styles.record_cntnt}>
                <p>{item.name}</p>
                <p> : </p>
                <p>{showPassword.includes(item.id) ? item.pswrd : "•".repeat(item.pswrd.length)}</p>
              </p>
              <button className={styles.record_btn} onClick={() => handleShowPassword(item.id)}>{showPassword.includes(item.id) ? "■" : "☐"}</button>
              <button className={styles.record_btn} onClick={() => handleDeleteRecord(item.id)}>del</button>
            </div>
          );
        })}
      </div>
    </>
  )
}
