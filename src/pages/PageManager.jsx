import React, { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const PageManager = ({ onSelectPage, pages, setPages }) => {
  const addPage = () => {
    const newPage = {
      id: Date.now(),
      name: `Page ${pages.length + 1}`,
    };
    setPages([...pages, newPage]);
  };

  const deletePage = (id) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  return (
    <VStack align="stretch" spacing={2}>
      {pages.map((page) => (
        <Button key={page.id} onClick={() => onSelectPage(page.id)} justifyContent="space-between">
          {page.name}
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              deletePage(page.id);
            }}
          />
        </Button>
      ))}
      <Button leftIcon={<FaPlus />} colorScheme="green" onClick={addPage}>
        Add Page
      </Button>
    </VStack>
  );
};

export default PageManager;
