import { useSnackbar } from "@/lib/hooks/use-snackbar";
import { useUser } from "@/lib/hooks/use-user";
import Drafts from "@mui/icons-material/Drafts";
import { Button, Container, Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import { useAuth } from "@/lib/hooks/use-auth";

export default function Home() {
  const { addAlert } = useSnackbar();
  const { registeredCourses, unregisterFromCourseAsync, user, isLoggedIn } =
    useUser();
  const { token, setToken } = useAuth();
  async function handleCourseUnregistration(course) {
    const res = await unregisterFromCourseAsync(course.courseId);
    if (res.ok) {
      // console.log("oldToken: ", token);
      // console.log("res.token: ", res.headers.get("NewToken"));
      setToken(res.headers.get("NewToken")); //Det fungerar på något vänster! Även om console.log inte indikerar det.
      // console.log("newToken: ", token);
      addAlert(`Du avbokades från "${course.subject}"`, {
        severity: "success",
      });
    } else {
      addAlert("Någonting gick fel", { severity: "error" });
    }
  }

  if (!isLoggedIn) return null;
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
            Bokade kurser ({registeredCourses?.length})
          </Typography>
          {registeredCourses.length ? (
            <List
              sx={{
                width: "100%",
              }}
            >
              {registeredCourses?.map(({ course }, i) => (
                <ListItem
                  key={course.courseId}
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
                      bgcolor: "primary.dark",
                      transition: "0.2s",
                      transform: "scaleY(0.7)",
                    },
                    ":hover": {
                      background: "rgba(0,0,0,0.04)",
                      ":after": {
                        opacity: 1,
                        transform: "scaleY(1)",
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
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          marginRight="20px"
                        >
                          {new Date(course.startDate).toLocaleDateString(
                            "sv-SE"
                          )}{" "}
                          -{" "}
                          {new Date(course.endDate).toLocaleDateString("sv-SE")}
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
