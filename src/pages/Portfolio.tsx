import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PortfolioContainer = styled.div`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
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

const ProjectImage = styled.div`
  height: 240px;
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

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
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

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: 1.4rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const ProjectCategory = styled.span`
  color: ${props => props.theme.colors.brand.primary};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin: 1rem 0;
  line-height: 1.6;
`;

const ProjectDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.tertiary};
`;

const ProjectTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: rgba(90, 78, 196, 0.2);
  color: ${props => props.theme.colors.brand.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

// Sample project data - focusing on canvas paintings
const projects = [
  {
    id: 1,
    title: 'Heritage Reflections',
    category: 'Acrylic on Canvas',
    description: 'A large canvas exploring Mozambican cultural identity through vibrant colors and symbolic patterns.',
    tags: ['Acrylic', 'Cultural', 'Large Format'],
    image: '/images/portfolio/heritage-reflections.jpg',
    size: '80x60cm',
    year: '2023'
  },
  {
    id: 2,
    title: 'Abstract Conversations',
    category: 'Acrylic on Canvas', 
    description: 'Semi-abstract piece representing the dialogue between traditional and contemporary African art.',
    tags: ['Abstract', 'Contemporary', 'Cultural Fusion'],
    image: '/images/portfolio/abstract-conversations.jpg',
    size: '60x50cm',
    year: '2023'
  },
  {
    id: 3,
    title: 'Porto Memories',
    category: 'Acrylic on Canvas',
    description: 'Emotional landscape capturing the feeling of adaptation to a new city while honoring heritage.',
    tags: ['Landscape', 'Emotional', 'Immigration'],
    image: '/images/portfolio/porto-memories.jpg',
    size: '70x50cm',
    year: '2024'
  },
  {
    id: 4,
    title: 'Renaissance Dreams',
    category: 'Mixed Media',
    description: 'Mixed media piece blending classical Renaissance techniques with African abstractionism.',
    tags: ['Mixed Media', 'Renaissance', 'Fusion'],
    image: '/images/portfolio/renaissance-dreams.jpg',
    size: '90x70cm',
    year: '2023'
  },
  {
    id: 5,
    title: 'Human Condition #1',
    category: 'Acrylic on Canvas',
    description: 'First in a series exploring the universal aspects of human experience through symbolic imagery.',
    tags: ['Series', 'Symbolic', 'Human Condition'],
    image: '/images/portfolio/human-condition-1.jpg',
    size: '60x40cm',
    year: '2024'
  },
  {
    id: 6,
    title: 'Color of Emotions',
    category: 'Acrylic on Canvas',
    description: 'Vibrant exploration of emotional states through bold color choices and dynamic brushstrokes.',
    tags: ['Emotional', 'Vibrant', 'Expressive'],
    image: '/images/portfolio/color-of-emotions.jpg',
    size: '50x50cm',
    year: '2024'
  }
];

const categories = ['All', 'Acrylic on Canvas', 'Mixed Media'];

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.projects-grid',
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

  const handleProjectClick = (project: typeof projects[0]) => {
    // Handle project click - could open modal or navigate to detail page
    console.log('Project clicked:', project);
  };

  return (
    <PortfolioContainer ref={containerRef}>
      <Section>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Canvas Portfolio
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Original acrylic paintings and mixed media works that showcase the human condition 
            through semi-realism and abstractionism, inspired by Renaissance masters and African heritage.
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

        <ProjectsGrid className="projects-grid">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleProjectClick(project)}
              >
                <ProjectImage>
                  <img src={project.image} alt={project.title} />
                  <ProjectOverlay
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
                  </ProjectOverlay>
                </ProjectImage>
                
                <ProjectInfo>
                  <ProjectCategory>{project.category}</ProjectCategory>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectDetails>
                    <span>{project.size}</span>
                    <span>{project.year}</span>
                  </ProjectDetails>
                  <ProjectTags>
                    {project.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </ProjectTags>
                </ProjectInfo>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Section>
    </PortfolioContainer>
  );
};

export default Portfolio; 