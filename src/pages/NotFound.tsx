import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const Content = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorCode = styled(motion.h1)`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: clamp(8rem, 20vw, 12rem);
  font-weight: 900;
  line-height: 0.8;
  background: ${props => props.theme.colors.brand.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.brand.glow};
    opacity: 0.3;
    filter: blur(40px);
    z-index: -1;
  }
`;

const Title = styled(motion.h2)`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.brand.gradient};
  color: ${props => props.theme.colors.text.primary};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const SecondaryButton = styled(Button)`
  background: ${props => props.theme.colors.glass.background};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.glass.border};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${props => props.theme.colors.brand.primary};
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingShape = styled(motion.div)<{ $delay: number }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.brand.glow};
  border-radius: 50%;
  opacity: 0.1;
`;

const NotFound: React.FC = () => {
  const floatingShapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <NotFoundContainer>
      <FloatingElements>
        {floatingShapes.map((shape) => (
          <FloatingShape
            key={shape.id}
            $delay={shape.delay}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </FloatingElements>

      <Content
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ErrorCode
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          404
        </ErrorCode>
        
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Page Not Found
        </Title>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Oops! The page you're looking for seems to have disappeared into the creative void. 
          Let's get you back on track to explore Shanaia's amazing work.
        </Description>
        
        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PrimaryButton to="/">
              <Home size={20} />
              Go Home
            </PrimaryButton>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SecondaryButton to="/portfolio">
              <Search size={20} />
              View Portfolio
            </SecondaryButton>
          </motion.div>
        </ButtonContainer>
      </Content>
    </NotFoundContainer>
  );
};

export default NotFound; 