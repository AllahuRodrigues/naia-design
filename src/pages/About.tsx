import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Award, Users, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 4rem;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-bottom: 6rem;
`;

const HeroSection = styled(Section)`
  text-align: center;
  margin-bottom: 8rem;
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 2rem;
  background: ${props => props.theme.colors.brand.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const BioSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  aspect-ratio: 1;
  max-width: 300px;
  margin: 0 auto;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.brand.gradient};
    opacity: 0.1;
    z-index: 1;
  }
`;

const BioContent = styled(motion.div)`
  h2 {
    font-family: ${props => props.theme.typography.fonts.display};
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text.primary};
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const StatIcon = styled.div`
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

const StatNumber = styled.div`
  font-family: ${props => props.theme.typography.fonts.display};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.brand.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const SkillsSection = styled(Section)`
  h2 {
    font-family: ${props => props.theme.typography.fonts.display};
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: ${props => props.theme.colors.text.primary};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled(motion.div)`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 1.5rem;
  padding: 2rem;
  
  h3 {
    font-family: ${props => props.theme.typography.fonts.display};
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text.primary};
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SkillName = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const SkillLevel = styled.div<{ level: number }>`
  width: 60px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: ${props => props.theme.colors.brand.gradient};
    border-radius: 3px;
    width: ${props => props.level || 0}%;
    transition: width 1s ease;
  }
`;

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.fromTo(
        '.bio-section',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.bio-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.stat-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.skill-category',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Award, number: '4+', label: 'Years Experience' },
    { icon: Users, number: '50+', label: 'Commissioned Works' },
    { icon: Coffee, number: '100+', label: 'Artworks Created' },
    { icon: MapPin, number: '2', label: 'Countries' },
  ];

  const skills = [
    {
      category: 'Traditional Media',
      items: [
        { name: 'Acrylic on Canvas', level: 95 },
        { name: 'Drawing', level: 90 },
        { name: 'Color Theory', level: 88 },
        { name: 'Composition', level: 85 },
        { name: 'Mixed Media', level: 75 },
      ],
    },
    {
      category: 'Digital Art',
      items: [
        { name: 'Adobe Photoshop CC', level: 92 },
        { name: 'Adobe Illustrator CC', level: 88 },
        { name: 'Digital Illustration', level: 85 },
        { name: 'Cover Art Design', level: 90 },
        { name: 'Concept Art', level: 80 },
      ],
    },
  ];

  return (
    <AboutContainer ref={containerRef}>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Naia
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Naia is a visual artist that showcases the human condition. Her work is eclectic and symbolic, 
          mixing semi-realism and abstractionism to bring forth narratives that aim to connect and motivate.
        </Subtitle>
      </HeroSection>

      <Section>
        <BioSection className="bio-section">
          <ImageContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ProfileImage>
              <img src="/images/about/naia-portrait.jpg" alt="Naia de Sousa" />
            </ProfileImage>
          </ImageContainer>
          
          <BioContent
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2>My Journey</h2>
            <p>
              My name is Naia, I am a Mozambican born and raised, self-taught artist, currently based in Portugal. 
              Since always I was drawn to the pencil and paper, whether it would be to try and draw my favorite doll 
              or to scribble on the walls. As I grew I followed the traditional art path and practiced it until I felt 
              the necessity to take my own liberties with my work, have ideas and be able to put them to paper with no issue.
            </p>
            <p>
              Till this day my surroundings are still a big contributing factor to the art I make but nowadays my mediums 
              are acrylic on canvas and digital art. I am very interested and inspired by the works of the renaissance and 
              the abstractionism movement, so you'll definitely find a semblance of that in my work. I feel a need to blend the two.
            </p>
            <p>
              The storytelling aspect of art is definitely something that is always very present in my work, whether 
              fictional or not and the story doesn't end with the main attraction of the work, the story is enriched by 
              symbolic details that amplify the narrative and help get the point across. My work is motivational and 
              introspective with the help of bright colors and a mix of styles I hope to follow through on the goal of 
              evoking emotion from my viewer.
            </p>
          </BioContent>
        </BioSection>

        <StatsContainer className="stats-container">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <StatIcon>
                <stat.icon size={24} />
              </StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </Section>

      <SkillsSection>
        <h2>Skills & Expertise</h2>
        <SkillsGrid className="skills-grid">
          {skills.map((category, index) => (
            <SkillCategory
              key={index}
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <h3>{category.category}</h3>
              <SkillList>
                {category.items.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex}>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel level={skill.level} />
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </SkillsSection>
    </AboutContainer>
  );
};

export default About; 