import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Eye, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OtherWorksContainer = styled.div`
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

const PlaceholderArt = styled.div`
  font-size: 3rem;
  z-index: 2;
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
  width: 45px;
  height: 45px;
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
  padding: 1.25rem;
`;

const WorkTitle = styled.h3`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const WorkCategory = styled.span`
  color: ${props => props.theme.colors.brand.primary};
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WorkDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin: 0.75rem 0;
  line-height: 1.5;
  font-size: 0.9rem;
`;

// Sample other works data
const otherWorks = [
  {
    id: 1,
    title: 'Abstract Emotions',
    category: 'Digital Illustration',
    description: 'Personal exploration of emotions through abstract digital art.',
    image: '/images/other-works/abstract-emotions.jpg'
  },
  {
    id: 2,
    title: 'Portrait Study #1',
    category: 'Digital Portrait',
    description: 'Digital portrait practice focusing on light and shadow.',
    image: '/images/other-works/portrait-study-1.jpg'
  },
  {
    id: 3,
    title: 'Cultural Patterns',
    category: 'Pattern Design',
    description: 'Modern interpretation of traditional Mozambican patterns.',
    image: '/images/other-works/cultural-patterns.jpg'
  },
  {
    id: 4,
    title: 'Conceptual Series',
    category: 'Concept Art',
    description: 'Series exploring themes of identity and belonging.',
    image: '/images/other-works/conceptual-series.jpg'
  },
  {
    id: 5,
    title: 'Nature Studies',
    category: 'Digital Illustration',
    description: 'Digital studies of African flora and fauna.',
    image: '/images/other-works/nature-studies.jpg'
  },
  {
    id: 6,
    title: 'Urban Landscapes',
    category: 'Digital Painting',
    description: 'Digital paintings of Porto cityscapes.',
    image: '/images/other-works/urban-landscapes.jpg'
  },
  {
    id: 7,
    title: 'Character Design',
    category: 'Character Art',
    description: 'Original character designs for personal projects.',
    image: '/images/other-works/character-design.jpg'
  },
  {
    id: 8,
    title: 'Typography Art',
    category: 'Typography',
    description: 'Experimental typography with cultural motifs.',
    image: '/images/other-works/typography-art.jpg'
  }
];

const categories = ['All', 'Digital Illustration', 'Digital Portrait', 'Pattern Design', 'Concept Art', 'Digital Painting', 'Character Art', 'Typography'];

const OtherWorks: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredWorks, setFilteredWorks] = useState(otherWorks);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredWorks(otherWorks);
    } else {
      setFilteredWorks(otherWorks.filter(work => work.category === activeFilter));
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
    <OtherWorksContainer ref={containerRef}>
      <Section>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Other Works
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Personal projects and digital artworks that explore different themes, 
            techniques, and creative expressions beyond commissioned work.
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
                      <Eye size={18} />
                    </OverlayButton>
                    <OverlayButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download size={18} />
                    </OverlayButton>
                  </WorkOverlay>
                </WorkImage>
                
                <WorkInfo>
                  <WorkCategory>{work.category}</WorkCategory>
                  <WorkTitle>{work.title}</WorkTitle>
                  <WorkDescription>{work.description}</WorkDescription>
                </WorkInfo>
              </WorkCard>
            ))}
          </AnimatePresence>
        </WorksGrid>
      </Section>
    </OtherWorksContainer>
  );
};

export default OtherWorks; 