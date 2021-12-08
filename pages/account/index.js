import { BASE_URL, fetcher } from "@/lib/api/helpers";
import { useAuth } from "@/lib/hooks/use-auth";
import { useSnackbar } from "@/lib/hooks/use-snackbar";
import Drafts from "@mui/icons-material/Drafts";
import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import useSWR from "swr";

async function unregisterAsync(courseId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/User/UnRegisterCourse`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId, userId: -1 }),
    });
    localStorage.setItem("token", response.headers.get("NewToken"));
    return response;
  } catch (epicFail) {
    console.log("error!", epicFail.message);
  }
}

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { addAlert } = useSnackbar();
  const { data: courses, mutate } = useSWR(`/User/CoursesForUser`, fetcher);

  async function handleCourseUnregistration(course) {
    const res = await unregisterAsync(course.courseId);
    if (res.ok) {
      mutate();
      addAlert(`Du avbokades från "${course.subject}"`, {
        severity: "success",
      });
    } else {
      addAlert("Någonting gick fel", { severity: "error" });
    }
  }
  if (!user) return null;

  return (
    <Container
      sx={{
        display: "grid",
        minHeight: "70vh",
        paddingTop: 15,
      }}
    >
      <Box>
        <Box>
          <Typography
            variant="h3"
            fontSize={35}
            textAlign="start"
            marginBottom="20px"
            color="primary.main"
          >
            Personuppgifter
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
              <Typography variant="h6" fontWeight="bold" textAlign="right">
                Förnamn
              </Typography>
              <Typography variant="h6" fontWeight="bold" textAlign="right">
                Efternamn
              </Typography>
              <Typography variant="h6" fontWeight="bold" textAlign="right">
                Email
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight="light" textAlign="start">
                {user.firstName}
              </Typography>
              <Typography variant="h6" fontWeight="light" textAlign="start">
                {user.lastName}
              </Typography>
              <Typography variant="h6" fontWeight="light" textAlign="start">
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ marginY: 5 }} />
        <Box>
          <Typography
            variant="h3"
            fontSize={35}
            textAlign="start"
            marginBottom="20px"
            color="primary.main"
          >
            Bokade kurser ({courses?.length})
          </Typography>
          {courses?.length > 0 ? (
            <List
              sx={{
                width: "100%",
              }}
            >
              {courses?.map(({ course }, i) => (
                <ListItem
                  key={course.courseId}
                  alignItems="center"
                  justifyContent="center"
                  // --------------------
                  //cool hover-effekt 💩💩💩
                  sx={{
                    position: "relative",
                    ":after": {
                      content: "''",
                      position: "absolute",
                      left: 0,
                      opacity: 0,
                      width: "2px",
                      height: "100%",
                      bgcolor: "primary.light",
                      transition: "0.2s",
                      transform: "scaley(0.3)",
                    },
                    ":hover": {
                      ":after": {
                        opacity: 1,
                        transform: "scaley(0.7)",
                      },
                    },
                  }}
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
                    onClick={() => handleCourseUnregistration(course)}
                  >
                    Avboka
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box
              minHeight="250px"
              display="grid"
              alignItems="center"
              justifyContent="center"
            >
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  fontWeight="light"
                  textAlign="start"
                  marginY={3}
                >
                  Du har inga bokade kurser
                </Typography>
                <Drafts
                  sx={{ fontSize: 60, color: "text.secondary", opacity: 0.4 }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
