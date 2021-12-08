import { BASE_URL, fetcher } from "@/lib/api/helpers";
import { useAuth } from "@/lib/hooks/use-auth";
import { useSnackbar } from "@/lib/hooks/use-snackbar";
import Error from "@mui/icons-material/ErrorOutline";
import { Button, Container, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

export default function Courses() {
  const [expandedId, setExpandedId] = useState(-1);
  const { isLoggedIn } = useAuth();
  const { addAlert } = useSnackbar();
  const { data: courses } = useSWR("/Course", fetcher);
  const { data: usersCourses } = useSWR(
    isLoggedIn && "/User/CoursesForUser",
    fetcher
  );

  const router = useRouter();
  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  async function postRegistration(data) {
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
      if (response.status == 200) {
        localStorage.setItem("token", response.headers.get("NewToken"));
        router.push("/courses/confirmation");
      } else if (response.status == 403) {
        router.push("/account/login");
        addAlert("Du måste vara inloggad för att boka en kurs", {
          severity: "error",
        });
      } else {
        addAlert("Något gick fel med din bokning, försök igen senare", {
          severity: "error",
        });
      }
    } catch (epicFail) {
      console.log("error!", epicFail.message);
    }
  }
  const handleRegistration = (courseId) => {
    let data = {
      userId: -1,
      courseId,
    };
    postRegistration(data, router);
  };

  function isRegistered(course) {
    if (usersCourses) {
      return (
        usersCourses?.filter((c) => c.course.courseId === course.courseId)
          .length > 0
      );
    }
    return false;
  }

  return (
    <Box sx={{ minHeight: "70vh", pt: 10 }}>
      <Container>
        <Typography variant="h3" fontWeight={1}>
          Våra kurser
        </Typography>
      </Container>
      <Container maxWidth="xl" disableGutters>
        <Grid container p={4} gap={3} justifyContent="center">
          {courses?.map((course, i) => (
            <Grid item xs={12} md={4} xl={3} key={course.courseId}>
              <CourseCard
                course={course}
                onRegistration={() => handleRegistration(course.courseId)}
                onExpand={() => handleExpandClick(i)}
                isExpanded={expandedId === i}
                isRegistered={isRegistered}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function CourseCard({
  course,
  onRegistration,
  onExpand,
  isExpanded,
  isRegistered,
}) {
  const daysLeft = getDaysLeft();
  const isStartingSoon = daysLeft < 7;
  function getDaysLeft() {
    const today = new Date();
    const startDate = new Date(course.startDate);
    const diff = startDate.getTime() - today.getTime();
    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    return daysLeft + 1;
  }
  return (
    <Card
      elevation={1}
      sx={{
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardHeader
        avatar={<Avatar src={course.imageSrc}></Avatar>}
        title={course.subject}
        titleTypographyProps={{ fontSize: 18 }}
        subheader={"Studietakt: " + course.studyPace + "%"}
        sx={{ bgcolor: "background.paperLight" }}
      />
      <CardContent>
        <Box mb={2}>
          <Typography>Startdatum:</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display="inline-flex"
            alignItems="center"
          >
            {new Date(course.startDate).toLocaleDateString("sv-SE")}
            <Typography
              fontSize="inherit"
              component="span"
              color="error.dark"
              ml={1}
              display={isStartingSoon ? "flex" : "none"}
              alignItems="center"
            >
              <Error sx={{ fontSize: 20, marginRight: "2px" }} /> Startar om{" "}
              {daysLeft} {daysLeft === 1 ? "dag" : "dagar"}
            </Typography>
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography>Slutdatum:</Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(course.endDate).toLocaleDateString("sv-SE")}
          </Typography>
        </Box>
        <Box>
          <Typography>Lediga platser:</Typography>
          <Typography variant="body2" color="text.secondary">
            {course.availableSpots - course.registeredStudents === 0
              ? "Fullbokad"
              : course.availableSpots - course.registeredStudents}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onExpand} aria-expanded={isExpanded}>
          Visa mer
        </Button>
        {isRegistered(course) ? (
          <Button disabled variant="contained" color="success">
            Bokad
          </Button>
        ) : (
          <Button
            onClick={onRegistration} //värdet för userId behövs inte,
            // utan går att extrahera från token i api:et.
            variant="contained"
            color="success"
          >
            Boka
          </Button>
        )}
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{course.courseInfo}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
