import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "redux/store";
import { useToast } from "@chakra-ui/react";

export default ({ fallbackComponent, children }) => {
  const error = useSelector((state) => state.error)
  const toast = useToast()
  useEffect(() => {
    if (error.detail) toast({ title: "Error!", description: error.detail.detail || error.detail, status: "error", duration: 9000, isClosable: true })
  }, [error])
  return (
    <>
      {error && fallbackComponent && <fallbackComponent error={error} />}
      {children}
    </>
  )
}
