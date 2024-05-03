import React, { useState } from "react";
import { Container, VStack, Button, Text, Input, Box } from "@chakra-ui/react";

const Index = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const fetchData = async (userPrompt) => {
    setLoading(true);
    try {
      const response = await fetch("https://qiadkr.buildship.run/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt }),
      });
      const jsonResponse = await response.json();
      const data = jsonResponse.message || "No message received";
      setData(data);
    } catch (error) {
      setData("Failed to fetch data");
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Input placeholder="Enter your prompt" value={userInput} onChange={(e) => setUserInput(e.target.value)} mb={4} />
        <Button onClick={() => fetchData(userInput)} isLoading={loading} loadingText="Fetching">
          Send Prompt
        </Button>
        <Box p={4} bg="blue.100" borderRadius="lg" boxShadow="md">
          <Text fontSize="lg">{data}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
