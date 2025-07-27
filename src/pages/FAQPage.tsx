import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      category: 'Booking & Reservations',
      items: [
        {
          id: 'booking-1',
          question: 'How do I make a reservation?',
          answer: 'You can make a reservation directly through our website by selecting your desired property, choosing your dates, and completing the booking form. We\'ll send you a confirmation email within 24 hours.'
        },
        {
          id: 'booking-2',
          question: 'What is your cancellation policy?',
          answer: 'We offer flexible cancellation policies. For bookings cancelled more than 14 days before check-in, you\'ll receive a full refund. Cancellations within 14 days are subject to a 50% cancellation fee. Please review the specific cancellation terms for your chosen property.'
        },
        {
          id: 'booking-3',
          question: 'Do I need to pay a deposit?',
          answer: 'Yes, we require a 30% deposit to secure your reservation. The remaining balance is due 7 days before your arrival date. We accept all major credit cards and bank transfers.'
        },
        {
          id: 'booking-4',
          question: 'Can I modify my reservation?',
          answer: 'Modifications to your reservation can be made up to 7 days before your check-in date, subject to availability. Please contact us as soon as possible to discuss any changes to your booking.'
        }
      ]
    },
    {
      category: 'Property Information',
      items: [
        {
          id: 'property-1',
          question: 'What amenities are included?',
          answer: 'All our properties include high-speed WiFi, fully equipped kitchens, premium linens, towels, toiletries, air conditioning/heating, and flat-screen TVs. Specific amenities vary by property - check the individual property page for complete details.'
        },
        {
          id: 'property-2',
          question: 'Is parking available?',
          answer: 'Parking availability varies by property. RYAP Isabel la Católica includes private parking, while RYAP Puerta Real is located in the pedestrian zone with nearby public parking options. We can provide detailed parking information upon booking.'
        },
        {
          id: 'property-3',
          question: 'Are pets allowed?',
          answer: 'We welcome well-behaved pets in our properties with prior approval. There\'s a pet fee of €25 per stay. Please inform us about your pet when making your reservation so we can ensure the property is suitable.'
        },
        {
          id: 'property-4',
          question: 'What is the maximum occupancy?',
          answer: 'RYAP Puerta Real accommodates up to 4 guests with 2 bedrooms. RYAP Isabel la Católica can host up to 6 guests with 3 bedrooms. Additional guests may be accommodated with prior arrangement and additional fees.'
        }
      ]
    },
    {
      category: 'Check-in & Check-out',
      items: [
        {
          id: 'checkin-1',
          question: 'What are the check-in and check-out times?',
          answer: 'Check-in is from 3:00 PM and check-out is by 11:00 AM. We offer flexible timing when possible - please contact us if you need early check-in or late check-out arrangements.'
        },
        {
          id: 'checkin-2',
          question: 'How do I get the keys?',
          answer: 'We provide contactless check-in with electronic key codes sent via email before your arrival. For first-time guests or upon request, we can arrange a personal meet-and-greet at the property.'
        },
        {
          id: 'checkin-3',
          question: 'What if I arrive late?',
          answer: 'Late arrival is not a problem with our electronic access system. Keys codes are active 24/7. We recommend arriving before 10:00 PM for your comfort, but our emergency support line is available if you need assistance.'
        }
      ]
    },
    {
      category: 'During Your Stay',
      items: [
        {
          id: 'stay-1',
          question: 'Who do I contact if I have issues during my stay?',
          answer: 'We provide 24/7 emergency support at +34 987 654 321. For non-urgent matters, you can reach us at info@ryapgranada.com or +34 123 456 789 during business hours.'
        },
        {
          id: 'stay-2',
          question: 'Is housekeeping provided?',
          answer: 'For stays of 7 nights or longer, we provide complimentary mid-stay housekeeping. Additional housekeeping services can be arranged for an extra fee. We also provide fresh linens and towels for extended stays.'
        },
        {
          id: 'stay-3',
          question: 'Can you help with local recommendations?',
          answer: 'Absolutely! We provide a comprehensive local guide with restaurant recommendations, attractions, and insider tips. Our team is always happy to provide personalized recommendations based on your interests.'
        },
        {
          id: 'stay-4',
          question: 'Is there a minimum stay requirement?',
          answer: 'Our minimum stay is typically 2 nights, with a 3-night minimum during peak seasons and holidays. Long-term stays (30+ nights) are available with special rates.'
        }
      ]
    },
    {
      category: 'Payments & Fees',
      items: [
        {
          id: 'payment-1',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and PayPal. Payment is processed securely through our booking system.'
        },
        {
          id: 'payment-2',
          question: 'Are there any additional fees?',
          answer: 'Our rates include all taxes and most fees. Additional charges may apply for: extra guests beyond the base occupancy, pets (€25), and optional services like extra housekeeping or early check-in.'
        },
        {
          id: 'payment-3',
          question: 'Do you charge a security deposit?',
          answer: 'We don\'t charge a separate security deposit. However, we do authorize your credit card for potential damages. This authorization is released within 7 days after check-out, provided there are no damages.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Find answers to common questions about booking, staying at our properties, and exploring Granada.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-slate-400"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        </div>
      </div>

      {/* FAQ Content */}
      <div className="space-y-8">
        {filteredFAQ.map((category) => (
          <div key={category.category} className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-amber-500">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.items.map((item) => (
                <div key={item.id} className="border-b border-slate-700 last:border-b-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between py-4 text-left hover:text-amber-500 transition-colors"
                  >
                    <span className="font-medium pr-4">{item.question}</span>
                    {openItems[item.id] ? (
                      <ChevronUp className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openItems[item.id] && (
                    <div className="pb-4">
                      <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredFAQ.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-slate-400 mb-4">
            We couldn't find any FAQs matching "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-16 bg-slate-800 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Still Have Questions?</h3>
        <p className="text-slate-400 mb-6">
          Can't find what you're looking for? Our friendly team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-amber-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            Contact Us
          </a>
          <a
            href="tel:+34123456789"
            className="border border-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;