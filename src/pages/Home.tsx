import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, Palette, Heart, Sparkles } from 'lucide-react';

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: #0a0a0a;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0 4rem;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 0.85;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffcc02 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(ellipse, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
    z-index: -1;
    filter: blur(40px);
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  font-style: italic;
  color: #cccccc;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
`;

const HeroDescription = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  color: #999999;
  margin-bottom: 3rem;
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: #0a0a0a;
  text-decoration: none;
  border-radius: 2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
  text-decoration: none;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 107, 53, 0.1);
    border-color: #ff6b35;
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #666666;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 3rem;
  background: linear-gradient(to bottom, transparent, #ff6b35, transparent);
`;

const AboutSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const AboutContent = styled.div``;

const AboutTitle = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.1;
`;

const AboutText = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  color: #cccccc;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const AboutHighlight = styled.span`
  color: #ff6b35;
  font-weight: 600;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff6b35;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const FeaturedWork = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: #161616;
  height: 400px;
  
  &::before {
    content: 'Featured Artwork';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-style: italic;
    color: #666666;
    z-index: 1;
  }
`;

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <HomeContainer ref={containerRef}>
      <HeroSection>
        <HeroContent>
          <HeroTitle
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Naia
          </HeroTitle>
          
          <HeroSubtitle
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Visual Artist
          </HeroSubtitle>
          
          <HeroDescription
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            "Art is how I express what's on my mind when words fail." 
            A Mozambican visual artist showcasing the human condition 
            through semi-realism and abstractionism, currently based in Porto, Portugal.
          </HeroDescription>
          
          <CTAContainer
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={slideUp}>
              <PrimaryButton to="/portfolio">
                <Palette size={20} />
                View My Art
              </PrimaryButton>
            </motion.div>
            
            <motion.div variants={slideUp}>
              <SecondaryButton to="/contact">
                <Heart size={20} />
                Let's Connect
              </SecondaryButton>
            </motion.div>
          </CTAContainer>
        </HeroContent>
        
        <ScrollIndicator
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span>Explore</span>
          <ScrollLine
            animate={{ 
              scaleY: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </ScrollIndicator>
      </HeroSection>

      <AboutSection>
        <AboutContainer>
          <AboutContent>
            <AboutTitle
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Creating Stories Through Colors
            </AboutTitle>
            
            <AboutText
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Every piece I create tells a story of <AboutHighlight>human emotion</AboutHighlight> and 
              <AboutHighlight> cultural identity</AboutHighlight>. Born in Mozambique and now calling 
              Porto home, my art bridges continents and captures the universal language of feeling.
            </AboutText>
            
            <AboutText
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Through <AboutHighlight>acrylic on canvas</AboutHighlight> and digital mediums, 
              I explore themes of identity, belonging, and the beauty found in everyday moments.
            </AboutText>

            <StatsContainer
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={slideUp}>
                <StatItem>
                  <StatNumber>50+</StatNumber>
                  <StatLabel>Artworks Created</StatLabel>
                </StatItem>
              </motion.div>
              
              <motion.div variants={slideUp}>
                <StatItem>
                  <StatNumber>2</StatNumber>
                  <StatLabel>Countries</StatLabel>
                </StatItem>
              </motion.div>
              
              <motion.div variants={slideUp}>
                <StatItem>
                  <StatNumber>∞</StatNumber>
                  <StatLabel>Stories to Tell</StatLabel>
                </StatItem>
              </motion.div>
              
              <motion.div variants={slideUp}>
                <StatItem>
                  <StatNumber>1</StatNumber>
                  <StatLabel>Passionate Heart</StatLabel>
                </StatItem>
              </motion.div>
            </StatsContainer>
          </AboutContent>
          
          <FeaturedWork
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          />
        </AboutContainer>
      </AboutSection>
    </HomeContainer>
  );
};

export default Home; 