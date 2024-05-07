import React, { useState } from "react";
import { Flex, Box, Container, VStack, Button, Text, Input, Heading, useColorModeValue } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import PageManager from "../components/PageManager";

const Index = () => {
  const [messages, setMessages] = useState({});
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
      const contentType = response.headers.get("content-type");
      let data = contentType && contentType.includes("application/json") ? await response.json() : await response.text();
      data = data.message || data || "No message received";
      setLoading(true);
      setError("");
      const newMessage = { prompt: userPrompt, response: "Loading..." };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedPageId]: [...(prevMessages[selectedPageId] || []), newMessage],
      }));
      try {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [selectedPageId]: [...(prevMessages[selectedPageId] || []).slice(0, -1), { ...newMessage, response: data }],
        }));
      } catch (error) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [selectedPageId]: [...(prevMessages[selectedPageId] || []).slice(0, -1), { ...newMessage, response: `Failed to fetch data: ${error.message}` }],
        }));
      } finally {
        setLoading(false);
      }
    } catch (error) {
      setError(`Failed to fetch data: ${error.message}`);
    }
    setLoading(false);
  };

  const [pages, setPages] = useState([{ id: 1, name: "Page 1" }]);
  const [selectedPageId, setSelectedPageId] = useState(pages[0].id);
  return (
    <Flex direction="row" height="100vh">
      <Box width="250px" bg="blue.200" p={5} boxShadow="md" borderRadius="md">
        <PageManager pages={pages} setPages={setPages} onSelectPage={setSelectedPageId} />
      </Box>
      <Container centerContent flex="1" maxW="container.md" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4} overflowY="auto" flex="1" width="100%" p={4} minHeight="0">
          <Heading as="h1" size="xl" color={useColorModeValue("blue.800", "blue.200")} mb={6} textAlign="center">
            {pages.find((page) => page.id === selectedPageId)?.name || "Prompt Sender"}
          </Heading>
          <Input
            placeholder="Enter your prompt"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                fetchData(userInput);
                setUserInput("");
              }
            }}
            bg="blue.50"
            borderColor="blue.300"
            isLoading={loading}
            loadingText="Fetching"
          />
          {error && <Text color="red.500">{error}</Text>}
          {(messages[selectedPageId] || []).map((message, index) => (
            <Box key={index} p={2} bg="gray.700" color="white" borderRadius="md" mb={1} alignSelf={index % 2 === 0 ? "start" : "end"}>
              <Text fontSize="sm">{index % 2 === 0 ? `You: ${message.prompt}` : `Bot: ${message.response}`}</Text>
            </Box>
          ))}
        </VStack>
      </Container>
    </Flex>
  );
};

export default Index;
