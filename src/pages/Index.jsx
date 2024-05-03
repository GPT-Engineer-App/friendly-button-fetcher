import React, { useState } from "react";
import { Container, VStack, Button, Text } from "@chakra-ui/react";

const Index = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://qiadkr.buildship.run/hello");
      const data = await response.text(); // Assuming the endpoint returns plain text
      setData(data);
    } catch (error) {
      setData("Failed to fetch data");
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Button onClick={fetchData} isLoading={loading} loadingText="Fetching">
          Fetch Data
        </Button>
        <Text fontSize="lg">{data}</Text>
      </VStack>
    </Container>
  );
};

export default Index;
