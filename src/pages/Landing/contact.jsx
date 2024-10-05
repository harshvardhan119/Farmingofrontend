import React, { useState } from "react";
import { apiClient } from "../../lib/api-client.js"; // Assuming you have an API client setup
import { SAVE_QUERY } from "@/utils/constants"; // This should be the API endpoint
import { Button } from "@/components/ui/button.jsx";

function Contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendQuery = async (e) => {
    e.preventDefault();

    if (!fname || !lname || !email || !message) {
      alert("All fields are required");
      return;
    }

    const payload = { fname, lname, email, message };

    try {
      const response = await apiClient.post(SAVE_QUERY, payload, {
        withCredentials: true,
      });

      if (response.status === 201) {
        console.log("Query submitted successfully:", response.data);
        alert("Query submitted successfully!");
        // Optionally reset the form
        setFname("");
        setLname("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("There was an issue submitting your query. Please try again later.");
    }
  };

  return (
    <div className="relative text-center h-92 translate-y-[260vh]">
      <h1 id="Contact" className="text-6xl relative right-96 font-serif text-sky-800">Contact Us</h1>
      <div className="bottom-32 bg-sky-800 w-[100vw] h-[70vh] relative flex flex-col items-center justify-center font-mono text-left">
        <form className="w-[25vw] space-y-4" onSubmit={sendQuery}>
          <div>
            <h2 className="text-white text-[1rem]">Firstname:</h2>
            <input
              type="text"
              name="fname"
              className="rounded-lg w-full h-[5vh] bg-sky-200"
              placeholder="John"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div>
            <h2 className="text-white text-[1rem]">Lastname:</h2>
            <input
              type="text"
              name="lname"
              className="rounded-lg w-full h-[5vh] bg-sky-200"
              placeholder="Doe"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>
          <div>
            <h2 className="text-white text-[1rem]">Email:</h2>
            <input
              type="email"
              name="email"
              className="rounded-lg w-full h-[5vh] bg-sky-200"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <h2 className="text-white text-[1rem]">Message:</h2>
            <textarea
              rows="5"
              className="rounded-lg w-full bg-sky-200"
              name="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button className="rounded-full w-full">Submit</Button>
        </form>
      </div>
      <div className="relative inline bottom-[60vh] right-[30vw]">
        <h1 className="font-serif inline text-white text-4xl">Have a Query?</h1><br /><br/>
        <h1 className="font-mono inline text-white text-xl">Fill up this form and connect with us</h1><br />
        <h1 className="font-mono inline text-white text-xl">
          or just give us some suggestions about <br /> how we can be better?
        </h1>
      </div>
      <div className="relative inline bottom-[80vh] text-left left-[65vw]">
        <h1 className="font-serif text-white text-4xl">
          Or Email us at <br /><br />
          businessfarmingo@gmail.com
        </h1>
      </div>
    </div>
  );
}

export default Contact;
