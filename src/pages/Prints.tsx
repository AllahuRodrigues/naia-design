import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, Download, Star } from 'lucide-react';

const PrintsContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 4rem;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${props => props.theme.colors.brand.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const StoreButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  background: ${props => props.theme.colors.brand.gradient};
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-bottom: 4rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const FeaturedSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text.primary};
`;

const PrintsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const PrintCard = styled(motion.div)`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const PrintImage = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const PrintPlaceholder = styled.div`
  z-index: 2;
`;

const PrintInfo = styled.div`
  padding: 1.5rem;
`;

const PrintTitle = styled.h3`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const PrintPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.brand.primary};
  margin-bottom: 0.75rem;
`;

const PrintDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const PrintSpecs = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.tertiary};
  margin-bottom: 1rem;
`;

const InfoSection = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 1.5rem;
  padding: 2rem;
  margin-top: 3rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const InfoCard = styled.div`
  text-align: center;
  
  h3 {
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 1rem;
    font-family: ${props => props.theme.typography.fonts.display};
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.5;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.brand.glow};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

// Sample prints data
const featuredPrints = [
  {
    id: 1,
    title: 'Mozambican Dreams',
    price: 'MZN 450',
    description: 'Vibrant acrylic painting celebrating Mozambican culture and heritage.',
    size: 'A3',
    material: 'Fine Art Paper',
    image: '/images/prints/mozambican-dreams.jpg'
  },
  {
    id: 2,
    title: 'Abstract Emotions',
    price: 'MZN 380',
    description: 'Contemporary abstract piece exploring human emotions through color.',
    size: 'A4',
    material: 'Canvas Print',
    image: '/images/prints/abstract-emotions-print.jpg'
  },
  {
    id: 3,
    title: 'Porto Sunset',
    price: 'MZN 420',
    description: 'Digital painting capturing the beautiful sunsets of Porto.',
    size: 'A3',
    material: 'Fine Art Paper',
    image: '/images/prints/porto-sunset.jpg'
  },
  {
    id: 4,
    title: 'Cultural Fusion',
    price: 'MZN 500',
    description: 'Mixed media artwork blending African and European influences.',
    size: 'A2',
    material: 'Canvas Print',
    image: '/images/prints/cultural-fusion.jpg'
  }
];

const Prints: React.FC = () => {
  return (
    <PrintsContainer>
      <Section>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Buy Prints
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Bring Naia's artwork into your space. High-quality prints of original 
            paintings and digital artworks, available through our trusted partner.
          </Subtitle>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <StoreButton
              href="https://www.finemoz.co.mz/pt-pt/search?q=naia&options%5Bprefix%5D=last"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} />
              Shop on Finemoz
              <ExternalLink size={16} />
            </StoreButton>
          </motion.div>
        </HeroSection>

        <FeaturedSection>
          <SectionTitle>Featured Prints</SectionTitle>
          <PrintsGrid>
            {featuredPrints.map((print, index) => (
              <PrintCard
                key={print.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <PrintImage>
                  <img src={print.image} alt={print.title} />
                </PrintImage>
                
                <PrintInfo>
                  <PrintTitle>{print.title}</PrintTitle>
                  <PrintPrice>{print.price}</PrintPrice>
                  <PrintDescription>{print.description}</PrintDescription>
                  <PrintSpecs>
                    <span>{print.size}</span>
                    <span>{print.material}</span>
                  </PrintSpecs>
                </PrintInfo>
              </PrintCard>
            ))}
          </PrintsGrid>
        </FeaturedSection>

        <InfoSection>
          <SectionTitle>Print Information</SectionTitle>
          <InfoGrid>
            <InfoCard>
              <IconWrapper>
                <Star size={24} />
              </IconWrapper>
              <h3>Premium Quality</h3>
              <p>
                All prints are produced using high-quality materials and professional 
                printing techniques to ensure lasting beauty and color accuracy.
              </p>
            </InfoCard>
            
            <InfoCard>
              <IconWrapper>
                <Download size={24} />
              </IconWrapper>
              <h3>Multiple Formats</h3>
              <p>
                Available in various sizes from A4 to A2, on fine art paper or 
                canvas material to suit your space and preferences.
              </p>
            </InfoCard>
            
            <InfoCard>
              <IconWrapper>
                <ShoppingCart size={24} />
              </IconWrapper>
              <h3>Local Delivery</h3>
              <p>
                Shipped within Mozambique through Finemoz, supporting local 
                businesses and ensuring reliable delivery to your door.
              </p>
            </InfoCard>
          </InfoGrid>
        </InfoSection>
      </Section>
    </PrintsContainer>
  );
};

export default Prints; 