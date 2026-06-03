'use client';

import { useState } from 'react';

const projectTypes = ['Branding', 'Poster Design', 'Social Media', 'YouTube Thumbnails', 'Logo Design', 'UI/UX Design'];
const budgets = ['<$3k', '$3k-$7k', '$7k-$12k', '$12k+'];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Branding',
    budget: '$3k-$7k',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      if (data?.redirect) {
        window.location.href = data.redirect;
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', projectType: 'Branding', budget: '$3k-$7k', message: '' });
      }, 3200);
    } catch (err) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3200);
    }
  };

  const fieldClass =
    'w-full rounded-3xl border border-white/10 bg-dark-900/90 px-5 py-4 text-silver placeholder-gray-500 transition focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-500/15';

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-60px_rgba(255,255,255,0.2)] backdrop-blur-xl"
      >
        <div className="mb-8">
          <p className="text-gold-300 uppercase tracking-[0.32em] text-xs mb-3">Work with me</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-silver max-w-2xl leading-tight">
            Start your next premium design project with clarity and confidence.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Share your vision, budget, and timeline, and I’ll create a tailored proposal that feels polished and effortless.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-3">
            <span className="text-silver font-semibold">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className={fieldClass}
            />
          </label>

          <label className="space-y-3">
            <span className="text-silver font-semibold">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              className={fieldClass}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 mt-5">
          <label className="space-y-3">
            <span className="text-silver font-semibold">Project Type</span>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className={fieldClass}
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-3">
            <span className="text-silver font-semibold">Budget</span>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={fieldClass}
            >
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-5 space-y-3">
          <span className="text-silver font-semibold">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell me about your brand, timeline, and goals..."
            required
            className={`${fieldClass} resize-none`}
          />
        </label>

        <button
          type="submit"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-lg font-semibold text-dark-900 shadow-[0_24px_80px_-40px_rgba(245,158,11,0.75)] transition"
        >
          {submitted ? 'Message Sent' : 'Send Inquiry'}
        </button>
      </form>

      {submitted && (
        <div className="rounded-[32px] border border-green-500/20 bg-green-500/10 p-6 text-green-200">
          <p className="text-lg font-semibold">Success!</p>
          <p className="mt-2 text-gray-300">Your message has been sent. I will review the details and reply within 24 hours.</p>
        </div>
      )}
    </div>
  );
}
