import useSWR from "swr";
import { BASE_URL, fetcher } from "../api/helpers";
import { useAuth } from "./use-auth";
import { useSnackbar } from "@/lib/hooks/use-snackbar";
export function useUser() {
  const { token } = useAuth();
  const { addAlert } = useSnackbar();

  // Hämta den inloggade användaren
  const { data: user, error: userError } = useSWR(
    token && ["/user", token],
    fetcher
  );
  const isLoggedIn = user?.userId && !userError;

  // Hämta kurser som användaren är registrerad till
  const { data: registeredCourses, mutate: mutateRegisteredCourses } = useSWR(
    isLoggedIn && ["/User/CoursesForUser", token],
    fetcher
  );

  /**
   * DELETE-metod för att avboka en kurs
   */
  async function unregisterFromCourseAsync(courseId) {
    try {
      const response = await fetch(`${BASE_URL}/User/UnRegisterCourse`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId, userId: -1 }),
      });
      if (response.ok) {
        mutateRegisteredCourses();
      }
      return response;
    } catch (epicFail) {
      console.log("error!", epicFail.message);
    }
  }

  /**
   * POST-metod för att boka en kurs
   */
  async function registerToCourseAsync(courseId) {
    const response = await fetch(BASE_URL + "/User/RegisterCourse", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId, userId: -1 }),
    });
    if (response.ok) {
      mutateRegisteredCourses();
    }
    return response;
  }

  /**
   * POST-metod för att registrera en användare
   */
  async function registerUserAsync(firstName, lastName, email, password) {
    const userBody = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
    };

    const res = await fetch(BASE_URL + "/user/registerUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userBody),
    });
    return res;
  }

  return {
    isLoggedIn,
    user,
    registeredCourses: registeredCourses ?? [],
    unregisterFromCourseAsync,
    registerToCourseAsync,
    registerUserAsync,
  };
}
