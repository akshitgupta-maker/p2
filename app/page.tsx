"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    email: "",
    idea: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/submit-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({
        name: "",
        rollNumber: "",
        branch: "",
        email: "",
        idea: "",
      });
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Smart Innovation Box</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} required />
        <input name="branch" placeholder="Branch" value={form.branch} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="idea" placeholder="Your Idea" value={form.idea} onChange={handleChange} required />
        <button type="submit">Submit Idea</button>
      </form>
      {submitted && <p style={{ color: "green" }}>Idea submitted successfully!</p>}
    </main>
  );
}
