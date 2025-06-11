import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Eye, Music, BookOpen, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CommissionedWorksContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 4rem;
`;

const Section = styled.section`
  max-width: 1400px;
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${props => props.$isActive 
    ? props.theme.colors.brand.primary 
    : props.theme.colors.glass.border
  };
  background: ${props => props.$isActive 
    ? props.theme.colors.brand.primary 
    : props.theme.colors.glass.background
  };
  color: ${props => props.$isActive 
    ? props.theme.colors.text.primary 
    : props.theme.colors.text.secondary
  };
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.brand.primary};
    background: ${props => props.$isActive 
      ? props.theme.colors.brand.primary 
      : 'rgba(90, 78, 196, 0.1)'
    };
  }
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const WorkCard = styled(motion.div)`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const WorkImage = styled.div`
  height: 300px;
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

const WorkOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  
  &:hover {
    opacity: 1;
  }
`;

const OverlayButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.brand.primary};
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background: ${props => props.theme.colors.brand.secondary};
  }
`;

const WorkInfo = styled.div`
  padding: 1.5rem;
`;

const WorkTitle = styled.h3`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: 1.4rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const WorkCategory = styled.span`
  color: ${props => props.theme.colors.brand.primary};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WorkDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin: 1rem 0;
  line-height: 1.6;
`;

const ClientName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-top: 1rem;
`;

// Sample commissioned works data
const commissionedWorks = [
  {
    id: 1,
    title: 'Album Cover - Soulful Journey',
    category: 'Music Cover Art',
    client: 'Rising Star Records',
    description: 'A vibrant album cover capturing the essence of soulful music with abstract elements and warm colors.',
    image: '/images/commissioned/album-soulful-journey.jpg'
  },
  {
    id: 2,
    title: 'Book Cover - Dreams of Africa',
    category: 'Book Cover',
    client: 'Literary House Publishing',
    description: 'Book cover design for a collection of African poetry, blending traditional patterns with modern typography.',
    image: '/images/commissioned/book-dreams-africa.jpg'
  },
  {
    id: 3,
    title: 'EP Cover - Electronic Fusion',
    category: 'Music Cover Art',
    client: 'Independent Artist',
    description: 'Electronic music EP cover featuring digital art elements and neon color palette.',
    image: '/images/commissioned/ep-electronic-fusion.jpg'
  },
  {
    id: 4,
    title: 'Magazine Illustration',
    category: 'Editorial',
    client: 'Cultural Magazine',
    description: 'Magazine cover illustration exploring themes of cultural identity and modern African diaspora.',
    image: '/images/commissioned/magazine-illustration.jpg'
  },
  {
    id: 5,
    title: 'Single Cover - Urban Beats',
    category: 'Music Cover Art',
    client: 'Urban Music Label',
    description: 'Single cover art combining urban aesthetics with traditional African motifs.',
    image: '/images/commissioned/single-urban-beats.jpg'
  },
  {
    id: 6,
    title: 'Poetry Collection Cover',
    category: 'Book Cover',
    client: 'Emerging Poet',
    description: 'Artistic cover for a poetry collection about immigration and cultural adaptation.',
    image: '/images/commissioned/poetry-collection.jpg'
  }
];

const categories = ['All', 'Music Cover Art', 'Book Cover', 'Editorial'];

const CommissionedWorks: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredWorks, setFilteredWorks] = useState(commissionedWorks);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredWorks(commissionedWorks);
    } else {
      setFilteredWorks(commissionedWorks.filter(work => work.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.works-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  return (
    <CommissionedWorksContainer ref={containerRef}>
      <Section>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Commissioned Works
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cover art and commissioned pieces that bring stories to life. Each piece is 
            carefully crafted to capture the essence and vision of the project.
          </Subtitle>
        </HeroSection>

        <FilterContainer>
          {categories.map((category) => (
            <FilterButton
              key={category}
              $isActive={activeFilter === category}
              onClick={() => handleFilterChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </FilterButton>
          ))}
        </FilterContainer>

        <WorksGrid className="works-grid">
          <AnimatePresence mode="wait">
            {filteredWorks.map((work) => (
              <WorkCard
                key={work.id}
                className="work-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <WorkImage>
                  <img src={work.image} alt={work.title} />
                  <WorkOverlay
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OverlayButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </OverlayButton>
                    <OverlayButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </OverlayButton>
                  </WorkOverlay>
                </WorkImage>
                
                <WorkInfo>
                  <WorkCategory>{work.category}</WorkCategory>
                  <WorkTitle>{work.title}</WorkTitle>
                  <WorkDescription>{work.description}</WorkDescription>
                  <ClientName>Client: {work.client}</ClientName>
                </WorkInfo>
              </WorkCard>
            ))}
          </AnimatePresence>
        </WorksGrid>
      </Section>
    </CommissionedWorksContainer>
  );
};

export default CommissionedWorks; 