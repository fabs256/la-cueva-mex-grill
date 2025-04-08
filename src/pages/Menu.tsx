
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MenuDisplay from '@/components/MenuDisplay';
import { Input } from '@/components/ui/input';

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-lacueva-lightBg">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-lacueva-brown text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Explore our authentic Mexican dishes made with fresh ingredients and traditional recipes
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              type="search"
              placeholder="Search menu..."
              className="pl-10 bg-white/90 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <MenuDisplay searchQuery={searchQuery} />
      
      {/* Footer */}
      <footer className="bg-lacueva-brown text-white mt-16 py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">La Cueva Mex Grill</h2>
          <p className="mb-2">123 Main Street, Anytown, USA</p>
          <p className="mb-4">Open daily: 11AM - 10PM</p>
          <p className="text-sm opacity-75">© 2025 La Cueva Mex Grill. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
