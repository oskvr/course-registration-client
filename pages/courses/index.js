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
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { BASE_URL } from "@/lib/api/helpers";

async function getCourses() {
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
async function postRegistration(data){
  console.log("postRegistration localstorage-token", window.localStorage.getItem("token"));
  console.log("postreg data: ", data);
  try{
    console.log("try");
    const response = await fetch("https://localhost:44314/api/User/RegisterCourse", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify(data),
    });
    window.localStorage.setItem("token", response.headers.get('NewToken'));
    // console.log("postregistration response: ", response);
    // console.log("headers: ", (response) => {     console.log(response.headers.get('NewToken'));     return response.text(); });
    // console.log("newtoken: ", response.headers.get('NewToken'))
    console.log("token in storage after fetch: ", window.localStorage.getItem("token"));
    
  }
  catch(epicFail)
  {
    console.log("error!", epicFail.message);
  }
}
const handleRegistration = (userID, courseID) => {

  let data ={
    userId: userID,
    courseId: courseID,
    
  };
  console.log("handleregistration-data: ", data);
  postRegistration(data);
      

};
export default function Courses() {
  console.log("courses, localstorage-token", window.localStorage.getItem("token"));
  const [expandedId, setExpandedId] = useState(-1);
  const [registration, setRegistration] = useState({});
  const { isLoggedIn } = useAuth();
  const router = useRouter();
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
 
  

  return (
    <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {courses.map((course, i) => (
          <Card
            key={course.courseId}
            sx={{ maxWidth: 360, margin: 2, height: "100%" }}
          >
            <CardHeader
              avatar={<Avatar src={course.imageSrc}></Avatar>}
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
            <Button
                onClick={() => handleRegistration(-1, course.courseId)} //värdet för userId behövs inte, utan 
                                                                        //går att extrahera från token i api:et.
                variant="contained"
                onClick={() => handleRegistration(course.courseId)}
              >
                Boka
              </Button>
              <Button
                onClick={() => handleExpandClick(i)}
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
                <Typography paragraph>{course.courseInfo}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
