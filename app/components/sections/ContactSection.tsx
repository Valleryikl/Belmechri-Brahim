"use client";
import { useState } from 'react';

export default function ContactSection() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    
    const formData = new FormData(event.target);

    // ВАЖНО
    formData.append("access_key", "c3b28ca4-58e8-4afb-9df2-b0bd7429b0d8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("The form has been successfully submitted! The photographer will receive the email shortly.");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className='relative z-55' id="contact">
      <h2>Contact</h2>
      
      <form onSubmit={onSubmit}>
        <input className='pl-[5px] border-b-2' type="text" name="name" placeholder="Name" required />
        <input className='pl-[5px] border-b-2' type="email" name="email" placeholder="Email" required />
        <input type="hidden" name="subject" value="New request from your website" />
        <textarea className='border-2 p-[5px]' name="message" required placeholder="Text..."></textarea>
        <button className='backdrop-blur-[5px] border w-[200px] py-[3px] text-[17px] font-semibold
                          hover:scale-[1.1] duration-300 ease-out hover:cursor-pointer' type="submit">
          Send
        </button>
      </form>

      <span>{result}</span>
    </section>
  );
}