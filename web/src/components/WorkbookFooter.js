import React from "react";
import { Box } from "@chakra-ui/react";

export default function WorkbookFooter() {
  // const ConfigContext = useConfigContext()
  return (
    <Box
      bg="white"
      pos="sticky"
      bottom={0}
      left={0}
      zIndex={500}
      shadow="md"
      width="100%"
    >
      {/* <Grid templateColumns="repeat(6, 1fr)" gap={1} w='100%'> */}
      {/*   {/\* <GridItem colSpan={1} > *\/} */}
      {/*   {/\*   <Center height='100%'> *\/} */}
      {/*   {/\*     <HalfPiesChart data={mockChartData} showMultiple={false} sourceSectors={ConfigContext.settings.sourceSectors} sinkSectors={ConfigContext.settings.sinkSectors} width={200} height={200} margins={{top: 20, right: 20, left: 20, bottom: 20}}/> *\/} */}
      {/*   {/\*   </Center> *\/} */}
      {/*   {/\* </GridItem> *\/} */}
      {/*   <GridItem pr={6} colSpan={6}> */}
      {/*   </GridItem> */}
      {/* </Grid> */}
    </Box>
  );
}
