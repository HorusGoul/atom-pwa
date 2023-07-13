import * as React from "react";

export function useModal() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  return {
    addModal: {
      isOpen: isAddModalOpen,
      open: () => setIsAddModalOpen(true),
      close: () => setIsAddModalOpen(false),
    },
    editModal: {
      isOpen: isEditModalOpen,
      open: () => setIsEditModalOpen(true),
      close: () => setIsEditModalOpen(false),
    },
  };
}
