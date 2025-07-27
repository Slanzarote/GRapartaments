import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Have questions about our properties or need assistance with your booking? 
          We're here to help you plan the perfect stay in Granada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-slate-400">
                    Granada Historic Center<br />
                    Andalusia, Spain
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-slate-400">+34 123 456 789</p>
                  <p className="text-sm text-slate-500">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-slate-400">info@ryapgranada.com</p>
                  <p className="text-sm text-slate-500">We'll respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p className="text-slate-400">
                    Monday - Friday: 9:00 AM - 8:00 PM<br />
                    Saturday - Sunday: 10:00 AM - 6:00 PM
                  </p>
                  <p className="text-sm text-slate-500">CET (Central European Time)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Emergency Contact</h3>
            <p className="text-slate-400 mb-3">
              For urgent matters during your stay, contact our 24/7 emergency line:
            </p>
            <p className="text-xl font-semibold text-amber-500">+34 987 654 321</p>
            <p className="text-sm text-slate-500 mt-2">
              Available for lockouts, maintenance issues, and other urgent matters
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-400">Message Sent!</h3>
              <p className="text-slate-400">
                Thank you for your message. We'll get back to you within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="property">Property Information</option>
                  <option value="support">Customer Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                  placeholder="Please describe how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 text-slate-900 py-3 px-6 rounded-lg font-semibold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 bg-slate-800 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Quick Response</h3>
            <p className="text-slate-400">
              We typically respond to all inquiries within 2 hours during business hours.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Local Expertise</h3>
            <p className="text-slate-400">
              Our team knows Granada inside out and can provide personalized recommendations.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Multilingual Support</h3>
            <p className="text-slate-400">
              We speak English, Spanish, French, and German to assist international guests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;