import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBag as ShoppingBagIcon, User, Menu as MenuIcon, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useShoppingBag } from '@/contexts/ShoppingBagContext';

const Navbar: React.FC = () => {
  const { itemCount } = useShoppingBag();
  const { user, signOut, isStaff } = useAuth();
  const navigate = useNavigate();

  // Helper function to close the mobile menu
  const closeMobileMenu = () => {
    const menuButton = document.querySelector('button[data-state="open"]') as HTMLButtonElement;
    if (menuButton) {
      menuButton.click();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-lacueva-red">La Cueva</h1>
          <span className="hidden md:block ml-2 text-lacueva-brown">Mex Grill</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-lacueva-red transition-colors">
            Home
          </Link>
          <Link to="/menu" className="font-medium text-gray-700 hover:text-lacueva-red transition-colors">
            Menu
          </Link>
          <Link to="/bag" className="font-medium text-gray-700 hover:text-lacueva-red transition-colors">
            Cart
          </Link>
          {isStaff && (
            <Link to="/dashboard" className="font-medium text-gray-700 hover:text-lacueva-red transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => signOut()}
                className="text-gray-700 hover:text-lacueva-red"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/auth')}
              className="text-gray-700 hover:text-lacueva-red"
            >
              Login
            </Button>
          )}
          
          {/* Shopping Bag */}
          <Link to="/bag">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingBagIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lacueva-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/" 
                  className="px-4 py-2 text-lg font-medium hover:bg-lacueva-lightBg rounded-md"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/menu" 
                  className="px-4 py-2 text-lg font-medium hover:bg-lacueva-lightBg rounded-md"
                  onClick={closeMobileMenu}
                >
                  Menu
                </Link>
                <Link 
                  to="/bag" 
                  className="px-4 py-2 text-lg font-medium hover:bg-lacueva-lightBg rounded-md"
                  onClick={closeMobileMenu}
                >
                  Cart
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 text-lg font-medium hover:bg-lacueva-lightBg rounded-md"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
