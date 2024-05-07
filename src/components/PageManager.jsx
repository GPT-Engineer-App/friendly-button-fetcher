import React from "react";
import { Button, VStack } from "@chakra-ui/react";

const PageManager = ({ pages, setPages, onSelectPage }) => {
  const addPage = () => {
    const newId = pages.length + 1;
    setPages([...pages, { id: newId, name: `Page ${newId}` }]);
  };

  const deletePage = (id) => {
    setPages(pages.filter((page) => page.id !== id));
    if (id === onSelectPage) onSelectPage(pages[0].id);
  };

  return (
    <VStack>
      {pages.map((page) => (
        <Button key={page.id} onClick={() => onSelectPage(page.id)} colorScheme="teal">
          {page.name}
        </Button>
      ))}
      <Button onClick={addPage} colorScheme="green">
        Add Page
      </Button>
      <Button onClick={() => deletePage(onSelectPage)} colorScheme="red">
        Delete Current Page
      </Button>
    </VStack>
  );
};

export default PageManager;
