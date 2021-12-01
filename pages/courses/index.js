import Mock from "../../mock/mockCourses.json";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { BASE_URL } from "@/lib/api/helpers";

async function getCourses() {
  let data;
  try {
    const response = await fetch(BASE_URL + "/course", {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    });
    data = await response.json();
  } catch (epicFail) {
    console.log(epicFail.message);
  }
  return data;
}
async function postRegistration(data, router) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(BASE_URL + "/User/RegisterCourse", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 403) {
      console.log("status: ", response.status);

      router.push("/account/login");
    }
    localStorage.setItem("token", response.headers.get("NewToken"));
  } catch (epicFail) {
    console.log("error!", epicFail.message);
  }
}
const handleRegistration = (userID, courseID, router) => {
  let data = {
    userId: userID,
    courseId: courseID,
  };
  postRegistration(data, router);
};
export default function Courses() {
  const [expandedId, setExpandedId] = useState(-1);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return (
    <Box sx={{ minHeight: "70vh", pt: 10 }}>
      <Container>
        <Typography variant="h3" fontWeight={1}>
          Våra kurser
        </Typography>
      </Container>

      <Grid container p={4} gap={3} justifyContent="center">
        {courses.map((course, i) => (
          <Grid item xs={12} md={4} xl={2} key={course.courseId}>
            <Card
              sx={{ p: 1, boxShadow: "0 0 0 1px hsla(220, 70%, 70%, 0.3)" }}
            >
              <CardHeader
                avatar={<Avatar src={course.imageSrc}></Avatar>}
                title={course.subject}
                titleTypographyProps={{ fontSize: 18 }}
                subheader={"Studietakt: " + course.studyPace + "%"}
              />
              <CardContent>
                <Box mb={2}>
                  <Typography>Startdatum:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(course.startDate).toLocaleDateString("sv-SE")}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Slutdatum:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(course.endDate).toLocaleDateString("sv-SE")}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  onClick={() =>
                    handleRegistration(-1, course.courseId, router)
                  } //värdet för userId behövs inte,
                  // utan går att extrahera från token i api:et.
                  variant="contained"
                >
                  Boka
                </Button>
                <Button
                  onClick={() => handleExpandClick(i)}
                  aria-expanded={expandedId === i}
                >
                  Visa mer
                </Button>
              </CardActions>
              <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Information</Typography>
                  <Typography paragraph>{course.courseInfo}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
