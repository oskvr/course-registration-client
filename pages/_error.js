import Link from "@/components/Link";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

export default function Error() {
  const router = useRouter();
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
        <Stack spacing={2}>
          <Button onClick={() => router.back()} variant="contained">
            Gå tillbaka
          </Button>
          <Button component={Link} href="/" variant="outlined">
            Gå till startsidan
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
