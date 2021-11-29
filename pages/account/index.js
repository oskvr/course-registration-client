import {
  Button,
  Container,
  Grid,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "@/components/Link";
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Mock from "../../mock/mockCourses";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
    }
  }, [user, router]);
  // async function GetCourses() {

  //   console.log(localStorage.getItem("token"))

  //   const response = await fetch("https://localhost:44314/api/User/CoursesForUser", {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         "content-type": "application/json",
  //         "Authorization": `Bearer ${localStorage.getItem("token")}`
  //       },
  //     });

  //   console.log(response);
  // }
  if (!user) return null;
  return (
    <Container
      sx={{
        display: "grid",
        justifyContent: "center",
        paddingTop: 15,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="light"
        textAlign="start"
        marginBottom="20px"
      >
        Personuppgifter:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginRight: "20px",
          }}
        >
          <Typography variant="h5" fontWeight="light" textAlign="start">
            Förnamn
          </Typography>
          <Typography variant="h5" fontWeight="light" textAlign="start">
            Efternamn
          </Typography>
          <Typography variant="h5" fontWeight="light" textAlign="start">
            Email
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight="light" textAlign="start">
            {user.firstName}
          </Typography>
          <Typography variant="h5" fontWeight="light" textAlign="start">
            {user.lastName}
          </Typography>
          <Typography variant="h5" fontWeight="light" textAlign="start">
            {user.email}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h3" fontWeight="light" textAlign="start">
        Bokade kurser:
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {Mock.map((course, i) => (
          <ListItem key={course.CourseId} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={course.ImgSrc} />
            </ListItemAvatar>
            <ListItemText
              primary={course.Subject}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {"Från: " + course.StartDate + " till: " + course.EndDate}
                  </Typography>
                </>
              }
            />
            <Button>Avboka</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
