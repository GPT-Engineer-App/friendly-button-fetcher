import React, { useState } from "react";
import { Flex, Box, Container, VStack, Button, Text, Input, Heading, useColorModeValue } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import PageManager from "../components/PageManager";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const [error, setError] = useState("");
  const fetchData = async (userPrompt) => {
    if (!userPrompt.trim()) {
      setError("Please enter a prompt before sending.");
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
      const newMessage = { prompt: userPrompt, response: data };
      setMessages((prevMessages) => [...prevMessages, { prompt: userPrompt }, newMessage]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { prompt: userPrompt, response: `Failed to fetch data: ${error.message}` }]);
    }
    setLoading(false);
  };

  const [pages, setPages] = useState([{ id: 1, name: "Page 1" }]);
  const [selectedPageId, setSelectedPageId] = useState(1);
  return (
    <Flex direction="row" height="100vh">
      <Box width="250px" bg="blue.200" p={5} boxShadow="md" borderRadius="md">
        <PageManager pages={pages} setPages={setPages} onSelectPage={setSelectedPageId} />
      </Box>
      <Container centerContent flex="1" maxW="container.md" display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
        <VStack spacing={4} overflowY="auto" flex="1" width="100%" p={4}>
          <Heading as="h1" size="xl" color={useColorModeValue("blue.800", "blue.200")} mb={6}>
            Prompt Sender
          </Heading>
          <Input placeholder="Enter your prompt" value={userInput} onChange={(e) => setUserInput(e.target.value)} bg="blue.50" borderColor="blue.300" />
          <Button leftIcon={<FaPaperPlane />} onClick={() => fetchData(userInput)} isLoading={loading} loadingText="Fetching" colorScheme="blue" width="full" mt={2}>
            Send
          </Button>
          {error && <Text color="red.500">{error}</Text>}
          {messages.map((message, index) => (
            <Box key={index} p={4} bg={index % 2 === 0 ? "blue.50" : "gray.300"} borderRadius="lg" boxShadow="md" mb={2} alignSelf={index % 2 === 0 ? "start" : "end"}>
              <Text fontSize="md" fontWeight="bold" color="blue.700">
                {index % 2 === 0 ? `You: ${message.prompt}` : `Bot: ${message.response}`}
              </Text>
              <Button colorScheme="red" size="xs" onClick={() => setMessages(messages.filter((_, i) => i !== index))} position="absolute" top="1" right="1">
                X
              </Button>
            </Box>
          ))}
        </VStack>
      </Container>
    </Flex>
  );
};

export default Index;
