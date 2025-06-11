import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Upload, X, MapPin, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactContainer = styled.div`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 1.5rem;
  padding: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.brand.glow};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.primary};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  h3 {
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    margin: 0;
  }
`;

const FormContainer = styled(motion.div)`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 1.5rem;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  background: ${props => props.theme.colors.glass.background};
  border: 1px solid ${props => props.$hasError 
    ? props.theme.colors.error 
    : props.theme.colors.glass.border
  };
  border-radius: 0.75rem;
  padding: 1rem;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.brand.primary};
    box-shadow: 0 0 0 3px rgba(90, 78, 196, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
  }
`;

const Select = styled.select<{ $hasError?: boolean }>`
  background: ${props => props.theme.colors.glass.background};
  border: 1px solid ${props => props.$hasError 
    ? props.theme.colors.error 
    : props.theme.colors.glass.border
  };
  border-radius: 0.75rem;
  padding: 1rem;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.brand.primary};
    box-shadow: 0 0 0 3px rgba(90, 78, 196, 0.1);
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  background: ${props => props.theme.colors.glass.background};
  border: 1px solid ${props => props.$hasError 
    ? props.theme.colors.error 
    : props.theme.colors.glass.border
  };
  border-radius: 0.75rem;
  padding: 1rem;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.brand.primary};
    box-shadow: 0 0 0 3px rgba(90, 78, 196, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
  }
`;

const FileUpload = styled.div`
  border: 2px dashed ${props => props.theme.colors.glass.border};
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: ${props => props.theme.colors.brand.primary};
    background: rgba(90, 78, 196, 0.05);
  }
`;

const UploadIcon = styled.div`
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

const FileList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FileTag = styled.div`
  background: ${props => props.theme.colors.brand.glow};
  color: ${props => props.theme.colors.text.primary};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.brand.gradient};
  color: ${props => props.theme.colors.text.primary};
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Contact: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      files.forEach(file => {
        formData.append('files', file);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
      setFiles([]);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Section>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let's Work Together
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to commission a unique piece of art? Let's discuss your vision and 
            create something beautiful that tells your story through visual narrative.
          </Subtitle>
        </HeroSection>

        <ContentGrid>
          <ContactInfo
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <InfoCard>
              <h2>Get in Touch</h2>
              <InfoItem>
                <InfoIcon>
                  <Mail size={20} />
                </InfoIcon>
                <InfoText>
                  <h3>Email</h3>
                  <p>naia.visua7s@gmail.com</p>
                </InfoText>
              </InfoItem>
              
              <InfoItem>
                <InfoIcon>
                  <MapPin size={20} />
                </InfoIcon>
                <InfoText>
                  <h3>Location</h3>
                  <p>Porto, Portugal</p>
                </InfoText>
              </InfoItem>
              
              <InfoItem>
                <InfoIcon>
                  <Phone size={20} />
                </InfoIcon>
                <InfoText>
                  <h3>Response Time</h3>
                  <p>Within 24 hours</p>
                </InfoText>
              </InfoItem>
            </InfoCard>
            
            <InfoCard>
              <h3>Commission Guidelines</h3>
              <p>
                Every artwork is unique, and pricing depends on size, medium, 
                and complexity. Here's a general overview to help you plan:
              </p>
              <ul>
                <li><strong>Small Canvas (A4-A3):</strong> €200 - €500</li>
                <li><strong>Medium Canvas (A2-A1):</strong> €500 - €1,200</li>
                <li><strong>Large Canvas (A0+):</strong> €1,200 - €3,000</li>
                <li><strong>Digital Art:</strong> €150 - €800</li>
                <li><strong>Cover Art:</strong> €300 - €600</li>
              </ul>
            </InfoCard>
          </ContactInfo>

          <FormContainer
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  {...register('name')}
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  $hasError={!!errors.name}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  $hasError={!!errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="budget">Project Budget *</Label>
                <Select
                  {...register('budget')}
                  id="budget"
                  $hasError={!!errors.budget}
                >
                  <option value="">Select your budget range</option>
                  <option value="under-500">Under €500</option>
                  <option value="500-1000">€500 - €1,000</option>
                  <option value="1000-2000">€1,000 - €2,000</option>
                  <option value="2000-3000">€2,000 - €3,000</option>
                  <option value="over-3000">Over €3,000</option>
                </Select>
                {errors.budget && <ErrorMessage>{errors.budget.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Project Details *</Label>
                <TextArea
                  {...register('message')}
                  id="message"
                  placeholder="Tell me about your project, preferred style, size, timeline, and any specific requirements or inspiration..."
                  $hasError={!!errors.message}
                />
                {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>File Attachments (Optional)</Label>
                <FileUpload>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="fileUpload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="fileUpload">
                    <UploadIcon>
                      <Upload size={24} />
                    </UploadIcon>
                    <p>Click to upload files or drag and drop</p>
                    <small>PDF, DOC, JPG, PNG up to 10MB each</small>
                  </label>
                </FileUpload>
                
                {files.length > 0 && (
                  <FileList>
                    {files.map((file, index) => (
                      <FileTag key={index}>
                        {file.name}
                        <X 
                          size={16} 
                          style={{ cursor: 'pointer' }}
                          onClick={() => removeFile(index)}
                        />
                      </FileTag>
                    ))}
                  </FileList>
                )}
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ContentGrid>
      </Section>
    </ContactContainer>
  );
};

export default Contact; 