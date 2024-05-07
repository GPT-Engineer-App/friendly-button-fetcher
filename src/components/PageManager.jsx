import React, { useState } from "react";
import { Button, VStack, Input } from "@chakra-ui/react";
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

  const [editingPageId, setEditingPageId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const updatePageName = (id, newName) => {
    setPages(pages.map((page) => (page.id === id ? { ...page, name: newName } : page)));
  };

  return (
    <VStack align="stretch">
      {pages.map((page) => {
        const isEditing = page.id === editingPageId;
        return (
          <Button key={page.id} onDoubleClick={() => setEditingPageId(page.id)} colorScheme="teal" justifyContent="space-between">
            {isEditing ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => {
                  updatePageName(page.id, editingName);
                  setEditingPageId(null);
                }}
                autoFocus
              />
            ) : (
              page.name
            )}
            <FaTrash
              onClick={(e) => {
                e.stopPropagation();
                deletePage(page.id);
              }}
            />
          </Button>
        );
      })}
      <Button onClick={addPage} colorScheme="green">
        Add Page
      </Button>
    </VStack>
  );
};

export default PageManager;
