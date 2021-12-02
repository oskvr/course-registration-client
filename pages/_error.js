import Link from "@/components/Link";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Error() {
  return (
    <Box
      display="grid"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      textAlign="center"
    >
      <Stack spacing={5}>
        <Typography variant="h1" fontSize={50} fontWeight="bold">
          Något gick fel...
        </Typography>
        <Typography
          variant="h3"
          fontSize={30}
          fontWeight="300"
          color="text.secondary"
        >
          Sidan du sökte kunde inte hittas
        </Typography>
        <Button component={Link} href="/" variant="contained">
          Gå tillbaka till startsidan
        </Button>
      </Stack>
    </Box>
  );
}
