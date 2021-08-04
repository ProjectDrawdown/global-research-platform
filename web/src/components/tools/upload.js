import React, { useState } from "react";

import { 
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  useDisclosure
} from "@chakra-ui/react";

import { uploadVMA } from "../../api/api";

const UploadVMAPresent = ({ loading, onChangeHandler, entity }) =>  {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="orange" variant="solid" onClick={onOpen}>
        Upload
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a new {entity}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="file" name="file" onChange={onChangeHandler} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} isLoading={loading}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export const Upload = ({ name }) => {
  const [loading, setIsLoading] = useState(false);

  const changeHandler = (event) => {
    setIsFilePicked(true);
    setIsLoading(true);
    uploadFile(event.target.files[0]);
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('name', file.name);
    const upload = await uploadVMA(data, name);
    setIsLoading(false);
  }

  return <UploadVMAPresent onChangeHandler={changeHandler} entity={name} loading={loading} />
}

