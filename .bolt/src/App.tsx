import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetail from './pages/PropertyDetail';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import BookingConfirmation from './pages/BookingConfirmation';
import { PropertyProvider } from './context/PropertyContext';
import { BookingProvider } from './context/BookingContext';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <PropertyProvider>
      <BookingProvider>
        <AdminProvider>
          <Router>
            <div className="min-h-screen bg-slate-900 text-white">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/property/:id" element={<PropertyDetail />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AdminProvider>
      </BookingProvider>
    </PropertyProvider>
  );
}

export default App;