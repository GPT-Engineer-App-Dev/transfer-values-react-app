import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, Text, extendTheme } from "@chakra-ui/react";
import { FaArrowRight, FaSave } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
});

const PageOne = ({ onNavigate }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    localStorage.setItem("userInput", inputValue);
    onNavigate(2); // Navigate to page 2
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">Page One</Text>
      <Input placeholder="Enter something..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button rightIcon={<FaSave />} colorScheme="blue" onClick={handleSave}>
        Save & Go to Page Two
      </Button>
    </VStack>
  );
};

const PageTwo = ({ onNavigate }) => {
  const savedValue = localStorage.getItem("userInput");

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">Page Two</Text>
      <Text fontSize="lg">Value from Page One: {savedValue}</Text>
      <Button leftIcon={<FaArrowRight />} colorScheme="teal" onClick={() => onNavigate(1)}>
        Back to Page One
      </Button>
    </VStack>
  );
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" d="flex" alignItems="center" justifyContent="center">
        {currentPage === 1 ? <PageOne onNavigate={handleNavigate} /> : <PageTwo onNavigate={handleNavigate} />}
      </Box>
    </ChakraProvider>
  );
};

export default Index;
