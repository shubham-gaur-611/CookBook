import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => (
  <Box 
    borderWidth="1px" 
    borderRadius="lg" 
    overflow="hidden" 
    boxShadow="md" 
    p={4} 
    bg="white"
    maxW="200px"
  >
    <Image src={image} alt={title} borderRadius="md" />
    <Box mt={4}>
      <Text fontWeight="bold" fontSize="lg" mb={2}>
        {title}
      </Text>
      <Text fontSize="sm" color="gray.600">
        {description}
      </Text>
    </Box>
  </Box>
);

export const Demo: React.FC = () => {
  const cards: CardProps[] = [
    {
      image: 'https://placehold.co/200x200',
      title: 'Card 1',
      description: 'This is the description for card 1.',
    },
    {
      image: 'https://placehold.co/200x200',
      title: 'Card 2',
      description: 'This is the description for card 2.',
    },
    {
      image: 'https://placehold.co/200x200',
      title: 'Card 3',
      description: 'This is the description for card 3.',
    },
    {
      image: 'https://placehold.co/200x200',
      title: 'Card 4',
      description: 'This is the description for card 4.',
    },
    {
      image: 'https://placehold.co/200x200',
      title: 'Card 5',
      description: 'This is the description for card 5.',
    },
  ];

  return (
    <Flex 
      wrap="wrap" 
      justify="space-between" 
      gap={4} 
      bg="gray.50" 
      p={8}
    >
      {cards.map((card, index) => (
        <Card 
          key={index} 
          image={card.image} 
          title={card.title} 
          description={card.description} 
        />
      ))}
    </Flex>
  );
};


