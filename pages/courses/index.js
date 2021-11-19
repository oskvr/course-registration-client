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
import { Button } from "@mui/material";
import { Box } from "@mui/system";

async function getCourses() {
  // let courses;
  // fetch('https://localhost:44314/api/course', {
  //   method: 'GET',
  //   mode: 'cors',
  //   headers: {
  //       'content-type': 'application/json'
  //   }})
  //   .then((res) =>
  //   {console.log('response: ', res),
  //     res.json().then((jsonData) =>
  //     courses= {jsonData})
  //   }).catch((epicFail)=>console.error(epicFail));

  // console.log('courses: ', courses)
  //     return courses;

  let data;
  try {
    const response = await fetch("https://localhost:44314/api/course", {
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

export default function Courses() {
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getArray = async () => {
      const arr = await getCourses();
      console.log("res: ", arr);
      setCourses(arr);
    };
    getArray();
  }, []);

  console.log("courses: ", courses);

  const handleRegistration = (userID, courseID) => {
    const data = {
      userId: userID,
      courseId: courseID,
    };

    const requestOptions = {
      metohd: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: 'cors',
      // credentials: 'cross-origin',
      body: JSON.stringify(data),
    };

    fetch(
      "https://localhost:44314/api/User/registerCourse",
      requestOptions
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to register");
      }
    });
  };

  return (
    <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {courses.map((course, i) => (
          <Card
            key={course.courseId}
            sx={{ maxWidth: 360, margin: 2, height: "100%" }}
          >
            <CardHeader
              //avatar={<Avatar src={course.ImgSrc}></Avatar>}
              title={course.subject}
              titleTypographyProps={{ fontSize: 18 }}
              subheader={"Studietakt: " + course.studyPace + "%"}
            />
            <CardContent>
              <Typography>Startdatum:</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                marginBottom="10px"
              >
                {new Date(course.startDate).toLocaleDateString("sv-SE")}
              </Typography>
              <Typography>Slutdatum:</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(course.endDate).toLocaleDateString("sv-SE")}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button onClick={() => handleExpandClick(i)}>Boka</Button>
              <Button
                onClick={() => handleRegistration(userid, course.CourseId)}
                aria-expanded={expandedId === i}
              >
                Visa Mer
              </Button>
            </CardActions>
            <Collapse
              sx={{ maxWidth: "100%" }}
              in={expandedId === i}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography paragraph>Information</Typography>
                <Typography paragraph>{course.CourseInfo}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
