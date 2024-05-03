import React, { useState } from "react";
import { Container, VStack, Button, Text, Input, Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const [error, setError] = useState("");
  const fetchData = async (userPrompt) => {
    if (!userPrompt.trim()) {
      setError("Please enter a prompt before sending.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://qiadkr.buildship.run/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt }),
      });
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const jsonResponse = await response.json();
        data = jsonResponse.message || "No message received";
      } else {
        data = await response.text();
      }
      setMessages((prevMessages) => [...prevMessages, { prompt: userPrompt, response: data }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { prompt: userPrompt, response: `Failed to fetch data: ${error.message}` }]);
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={6}>
        <Heading as="h1" size="xl" color={useColorModeValue("blue.800", "blue.200")} mb={6}>
          Prompt Sender
        </Heading>
        <Input placeholder="Enter your prompt" value={userInput} onChange={(e) => setUserInput(e.target.value)} mb={4} bg="blue.50" borderColor="blue.300" />
        <Button leftIcon={<FaPaperPlane />} onClick={() => fetchData(userInput)} isLoading={loading} loadingText="Fetching" colorScheme="blue">
          Send Prompt
        </Button>
        {error && <Text color="red.500">{error}</Text>}
        {messages.map((message, index) => (
          <Box key={index} p={5} bg="blue.100" borderRadius="lg" boxShadow="md" mb={4}>
            <Text fontSize="lg" fontWeight="bold" color="blue.700" mb={2}>
              Prompt: {message.prompt}
            </Text>
            <Text fontSize="lg" color="blue.700">
              Response: {message.response}
            </Text>
            <Button colorScheme="red" size="sm" onClick={() => setMessages(messages.filter((_, i) => i !== index))}>
              Delete
            </Button>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
