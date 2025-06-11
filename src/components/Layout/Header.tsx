import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &.scrolled {
    padding: 1rem 0;
    background: rgba(10, 10, 10, 0.95);
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 800;
  font-style: italic;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${props => props.$isActive ? '#ff6b35' : '#cccccc'};
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 0.025em;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #ff6b35;
    transform: scaleX(${props => props.$isActive ? 1 : 0});
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #ff6b35;
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #cccccc;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ff6b35;
    background: rgba(255, 107, 53, 0.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.$isActive ? '#ff6b35' : '#ffffff'};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ff6b35;
    transform: scale(1.05);
  }
`;

const MobileCloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #cccccc;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ff6b35;
    background: rgba(255, 107, 53, 0.1);
  }
`;

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/commissioned-works', label: 'Commissions' },
  { path: '/other-works', label: 'Other Works' },
  { path: '/prints', label: 'Prints' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <HeaderContainer className={isScrolled ? 'scrolled' : ''}>
        <Nav>
          <Logo to="/">Naia</Logo>
          
          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          
          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MobileCloseButton
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </MobileCloseButton>
            
            {navItems.map((item) => (
              <motion.div key={item.path} variants={linkVariants}>
                <MobileNavLink
                  to={item.path}
                  $isActive={location.pathname === item.path}
                >
                  {item.label}
                </MobileNavLink>
              </motion.div>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 