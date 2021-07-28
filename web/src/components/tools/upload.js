import React, { useState } from "react";

import { Button, AtSignIcon } from "@chakra-ui/react";

import { uploadVMA } from "../../api/api";

export const Upload = ({ path }) => {
  const [isFilePicked, setIsFilePicked] = useState(false);
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
    const upload = await uploadVMA(data, 'vma');
    setIsLoading(false);
  }

  return <UploadVMAPresent loading={loading} onChangeHandler={changeHandler} />
}

const UploadVMAPresent = ({ loading, onClick, onChangeHandler }) => {
  return (
    <>
      <input type="file" name="file" onChange={onChangeHandler} />
      <Button colorScheme="orange" variant="solid" isLoading={loading} >
      </Button>
    </>
  )
}
