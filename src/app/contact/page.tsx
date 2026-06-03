'use client';

import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';

export default function Contact() {
  return (
    <div className="min-h-screen bg-dark-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-silver mb-6">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Let us discuss your next project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
