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
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { BASE_URL } from "@/lib/api/helpers";
async function deleteRegistration(data)
{
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/User/UnRegisterCourse`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if(!response.Ok)
    {
      console.log("status: ", response.status);
      
    }
    
    localStorage.setItem("token", response.headers.get("NewToken"));
    location.reload();

  } catch (epicFail) {
    console.log("error!", epicFail.message);
  }
}

const handleUnRegistration = (courseId) => {
  let data = {"UserId": -1, "courseId": courseId}
  console.log("data in handle: ", data)
  deleteRegistration(data);
}
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
    }
  }, [user, router]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  async function getCourses() {
    console.log(localStorage.getItem("token"));

    const response = await fetch(
      "https://localhost:44314/api/User/CoursesForUser",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return await response.json();
  }
  if (!user) return null;
  return (
    <Container
      sx={{
        display: "grid",
        justifyContent: "center",
        minHeight: "70vh",
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
        <Box mr={5}>
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
      {courses.length != 0 ? (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {courses?.map(({ course }, i) => (
            <ListItem
              key={course.courseId}
              alignItems="center"
              justifyContent="center"
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={course.imageSrc} />
              </ListItemAvatar>
              <ListItemText
                primary={course.subject}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      marginRight="20px"
                    >
                      {"Från: " +
                        new Date(course.startDate).toLocaleDateString() +
                        " till: " +
                        new Date(course.endDate).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
               <Button 
               variant="contained" 
               color="error" 
               onClick={() => handleUnRegistration(course.courseId)}
               >
                 Avboka
                 </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="h5"
          fontWeight="light"
          textAlign="start"
          marginTop="20px"
        >
          Du har inga bokade kurser
        </Typography>
      )}
    </Container>
  );
}
