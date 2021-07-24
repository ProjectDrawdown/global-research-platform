import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PageLayout from "parts/PageLayout";
import { UserContext } from "services/user";
import { Box, Container, Checkbox, Heading, SimpleGrid, Input, Text, Button } from "@chakra-ui/react";

const UserSignupPage = () => {
    const { patchUserFromAPI } = useContext(UserContext); 
    const [formData, setFormData] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        const id = event.target.id;
        setFormData({...formData, [id]: event.target.value});
    }

    const navigateToWorkbooks = () => {
        history.push("/workbooks");
    };

    const handleSubmit = async () => {
        await patchUserFromAPI(formData);
        navigateToWorkbooks();
    };

    return (
        <PageLayout navMargin={false}>
            <Container boxShadow="lg" background="white" padding="50px" maxW="3xl" centerContent>
                <Heading paddingBottom="40px" textTransform="uppercase" as="h2" size="2xl">Welcome!</Heading>
                <Text paddingBottom="25px">We'd love to know a bit about you.</Text>
                <SimpleGrid columns={2} spacingX="40px" spacingY="20px">

                    <Box align="right" paddingTop="8px">Name</Box>
                    <Input id="name" variant="flushed" onChange={handleChange} focusBorderColor="#00477D"/>

                    <Box align="right" paddingTop="8px">Organization</Box>
                    <Input id="company" variant="flushed" onChange={handleChange} focusBorderColor="#00477D"/>

                    <Box align="right" paddingTop="8px">Location</Box>
                    <Input id="location" variant="flushed" onChange={handleChange} focusBorderColor="#00477D"/>

                    <Box></Box>
                    <Box>
                        <Button 
                            color="grey" 
                            variant="link" 
                            onClick={navigateToWorkbooks}
                        >
                        Skip
                        </Button>
                        <Button 
                            color="white" 
                            background="#00477D" 
                            padding="25px 40px" 
                            marginLeft="20px"
                            onClick={handleSubmit}
                        >
                        Finish account setup
                        </Button>
                    </Box>
                </SimpleGrid> 
                </Container>
        </PageLayout>
    )
}

export default UserSignupPage;
