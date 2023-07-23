"use client";

import axios from "axios";

export default function Home() {
  const onSubmit=async(e:React.FormEvent)=>{
  e.preventDefault();
  try{
   const res= await axios.post("/api/signup",{
    name:"arjun",
    email:"ejujsj@gmail.com",
    password:"ajjskshsj"
   })
   console.log(res)
  }catch(err){
    console.log(err)
  }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      main page
     </main>
  )
}
