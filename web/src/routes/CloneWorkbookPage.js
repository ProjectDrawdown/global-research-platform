import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import store from "redux/store";
import {
  doFetchWorkbookThunk,
  doCloneAndPatchWorkbookThunk,
} from "redux/reducers/workbook/workbookSlice";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import PageLayout from "parts/PageLayout";
import { ProgressBar } from "components/ProgressBar";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
  Box,
  Button
} from "@chakra-ui/react";

import { UserContext } from "services/user";

const CloneWorkbookPage = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  const loadingStatus = useSelector(state => state.workbook.status);

  useEffect(() => {
    store.dispatch(doFetchWorkbookThunk({ id: parseInt(params.id) }));
  }, [params.id]);

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }

  const validateName = value => {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  };

  const handleSubmit = async (values, actions) => {
    // TODO Potentially refactor this to use currentWorkbook instead of param.
    // Not sure if we can rely on the closure updating with the state or not.
    const clonePatchResultAction = await store.dispatch(
      doCloneAndPatchWorkbookThunk({
        id: params.id,
        data: {
          name: values.name,
          description: values.description
        }
      })
    );
    if (doCloneAndPatchWorkbookThunk.fulfilled.match(clonePatchResultAction)) {
      history.push(
        `/workbook/${clonePatchResultAction.payload.id}/postclone`
      );
    }
  };

  return (
    <PageLayout>
      {/* <Heading as="h1">Cloning Workbook: {currentWorkbook.workbook.name}</Heading> */}
      <ProgressBar progressState={1} />
      <Formik initialValues={{ name: "", author: "", description: "" }} onSubmit={handleSubmit}>
        {props => (
          <Form>
            <VStack spacing={4}>
              <Field name="name" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Workbook Name</FormLabel>
                    <Input {...field} id="name" placeholder="ex. My Workbook" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="author">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.author && form.touched.author}
                  >
                    <FormLabel htmlFor="author">Author</FormLabel>
                    <Input {...field} disabled id="author" value={user.email} />
                    <FormErrorMessage>{form.errors.author}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.description && form.touched.description}
                  >
                    <FormLabel htmlFor="description">Workbook Description</FormLabel>
                    <Textarea {...field} id="description" placeholder="My Workbook Description" />
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* <Field> */}
              {/*   <Text as="label" for="notes">Workbook Name</Text> */}
              {/*   <Textarea name="notes" placeholder="Description of this workbook for later reference." /> */}
              {/* </Field> */}
              <Box>
                <Button
                  colorScheme="brand.blue"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Next
                </Button>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default CloneWorkbookPage;
