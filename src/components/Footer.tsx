
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">La Cueva Mex Grill</h2>
        <p className="mb-2">18486 Prospect Rd, Saratoga, CA 95070</p>
        <p className="mb-4">Open: 10:00 AM - 3:00 PM, 5:00 PM - 8:00 PM</p>
        <p className="text-sm opacity-75">© 2025 La Cueva Mex Grill. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
