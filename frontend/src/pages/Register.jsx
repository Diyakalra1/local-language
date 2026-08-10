import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Languages } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    preferred_language: 'hindi', // Default to Hinglish for Indian users
  });
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  // Extended list with Hinglish support
  const indianLanguages = [
    
    { code: 'english', name: 'English', description: 'Standard English' },
    { code: 'hindi', name: 'Hindi (हिंदी) ', description: 'Standard Hindi' },
    { code: 'tamil', name: 'Tamil (தமிழ்) ', description: 'Tamil language' },
    { code: 'telugu', name: 'Telugu (తెలుగు) ', description: 'Telugu language' },
    { code: 'bengali', name: 'Bengali (বাংলা) ', description: 'Bengali language' },
    { code: 'marathi', name: 'Marathi (मराठी) ', description: 'Marathi language' },
    { code: 'gujarati', name: 'Gujarati (ગુજરાતી) ', description: 'Gujarati language' },
    { code: 'kannada', name: 'Kannada (ಕನ್ನಡ) ', description: 'Kannada language' },
    { code: 'malayalam', name: 'Malayalam (മലയാളം) ', description: 'Malayalam language' },
    { code: 'punjabi', name: 'Punjabi (ਪੰਜਾਬੀ) ', description: 'Punjabi language' },
    { code: 'odia', name: 'Odia (ଓଡ଼ିଆ) ', description: 'Odia language' },
    { code: 'urdu', name: 'Urdu (اردو) ', description: 'Urdu language' },
    { code: 'assamese', name: 'Assamese (অসমীয়া) ', description: 'Assamese language' },
    { code: 'sanskrit', name: 'Sanskrit (संस्कृतम्) ', description: 'Sanskrit language' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Languages className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">Join Local Language Integrator</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Language
            </label>
            <select
              name="preferred_language"
              value={formData.preferred_language}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {indianLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>{indianLanguages.find(l => l.code === formData.preferred_language)?.name}</strong>
                <br />
                {indianLanguages.find(l => l.code === formData.preferred_language)?.description}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Login here
          </Link>
        </p>



        {/* Supported Languages Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold">14+ Languages Supported</span>
            <br />
            <span className="text-xs"> English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Urdu, Assamese, Sanskrit</span>
          </p>
        </div>
      </div>
    </div>
  ); 
}



