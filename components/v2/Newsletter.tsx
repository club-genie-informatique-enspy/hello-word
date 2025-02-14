'use client';

import { FC, FormEvent, useState } from 'react';

const Newsletter: FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Handle newsletter subscription
      console.log('Subscribe email:', email);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Subscribe</h3>
      <p className="text-gray-600 mb-4">
        Subscribe to our newsletter and get upto 40% off on our exclusive service.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="flex-1 p-2 border rounded-lg"
          required
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newsletter;