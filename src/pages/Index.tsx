
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-lacueva-lightBg">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] bg-cover bg-center flex items-center text-white"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">La Cueva Mex Grill</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Authentic Mexican cuisine made with fresh ingredients and traditional recipes
          </p>
          <Link to="/menu">
            <Button size="lg" className="bg-lacueva-red hover:bg-lacueva-brown text-lg">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Featured Sections */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Specialties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tacos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Authentic Tacos</h3>
                <p className="text-gray-600 mb-4">
                  Handmade corn tortillas filled with your choice of meat, topped with fresh cilantro and onions.
                </p>
                <Link to="/menu">
                  <Button variant="outline" className="w-full border-lacueva-red text-lacueva-red hover:bg-lacueva-red hover:text-white">
                    View Menu
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534352956036-cd81e27dd615?q=80&w=1000&auto=format&fit=crop" 
                  alt="Enchiladas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sizzling Fajitas</h3>
                <p className="text-gray-600 mb-4">
                  Marinated meat grilled with peppers and onions, served with warm tortillas, guacamole, and sour cream.
                </p>
                <Link to="/menu">
                  <Button variant="outline" className="w-full border-lacueva-red text-lacueva-red hover:bg-lacueva-red hover:text-white">
                    View Menu
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1624001877690-b61842255ecd?q=80&w=1000&auto=format&fit=crop" 
                  alt="Churros" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sweet Desserts</h3>
                <p className="text-gray-600 mb-4">
                  Finish your meal with our delicious churros, flan, or tres leches cake.
                </p>
                <Link to="/menu">
                  <Button variant="outline" className="w-full border-lacueva-red text-lacueva-red hover:bg-lacueva-red hover:text-white">
                    View Menu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-lacueva-brown text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Enjoy our delicious food at home or in our restaurant. Place an order now for pickup or delivery!
          </p>
          <Link to="/menu">
            <Button size="lg" className="bg-lacueva-red hover:bg-lacueva-yellow hover:text-lacueva-brown text-lg">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
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

export default Index;
