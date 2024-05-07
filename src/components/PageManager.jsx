import React from "react";
import { Button, VStack, Icon } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const PageManager = ({ pages, setPages, onSelectPage, messages, setMessages }) => {
  const addPage = () => {
    const newId = Date.now();
    setPages([...pages, { id: newId, name: `Page ${pages.length + 1}` }]);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [newId]: [],
    }));
  };

  const deletePage = (id) => {
    setPages(pages.filter((page) => page.id !== id));
    if (id === onSelectPage) onSelectPage(pages[0].id);
  };

  return (
    <VStack>
      {pages.map((page) => (
        <Button key={page.id} onClick={() => onSelectPage(page.id)} colorScheme="teal" justifyContent="space-between">
          {page.name}
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              deletePage(page.id);
            }}
          />
        </Button>
      ))}
      <Button onClick={addPage} colorScheme="green">
        Add Page
      </Button>
    </VStack>
  );
};

export default PageManager;
