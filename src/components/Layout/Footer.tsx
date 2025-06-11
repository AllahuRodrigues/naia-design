import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        © {new Date().getFullYear()} Naia de Sousa. All rights reserved.
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 