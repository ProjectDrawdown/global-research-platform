import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import store from "redux/store";
import {
  doFetchWorkbookThunk,
  doEditDetailsPatchWorkbookThunk,
} from "redux/reducers/workbook/workbookSlice";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import PageLayout from "parts/PageLayout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
  Box,
  Button,
  Heading
} from "@chakra-ui/react";

import { UserContext } from "services/user";

const EditWorkbookPage = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  const loadingStatus = useSelector(state => state.workbook.status);
  const workbook = useSelector(state => state.workbook.workbook);

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
    const editDetailsPatchResultAction = await store.dispatch(
      doEditDetailsPatchWorkbookThunk({
        id: params.id,
        data: {
          name: values.name,
          description: values.description
        }
      })
    );
    if (doEditDetailsPatchWorkbookThunk.fulfilled.match(editDetailsPatchResultAction)) {
      history.push(
        `/workbook/${params.id}`
      );
    }
  };

  const canRenderForm = () => {
    // have we loaded the workbook data yet?
    const hasLoaded = !!workbook?.id

    if (hasLoaded) {
      // Check to see if the logged in user is the author. If not, return to the workbook.
      if (user.email === workbook.author.email){
        return true
      } else {
        history.push(
          `/workbook/${params.id}`
        );  
      }
    } else {
      return false
    }
  }

  return (
    <PageLayout>
      <Heading as="h1" textStyle={"portfolio"}>
        Editing Workbook Details
      </Heading>
      { canRenderForm() && (
      <Formik initialValues={{ name: workbook.name, description: workbook.description }} onSubmit={handleSubmit}>
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
                  Save
                </Button>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
      ) }
    </PageLayout>
  );
};

export default EditWorkbookPage;
