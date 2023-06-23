export default function ({ route, redirect }) {
  if (process.server) {
    console.log("server");
  } else {
    console.log("client");
    // const token = localStorage.getItem("access_token");
    // redirect("/")/;
    // if (!token) {
    //   redirect("/");
    // }
    const publicPages = [
      "/profile/personal-info",
      "/profile/my-board",
      "/profile/saved",
    ];
    const authpage = publicPages.includes(route.path);
    const loggeduser = localStorage.getItem("access_token");
    if (authpage && !loggeduser) {
      console.log("asdasdadasdasd");
      redirect("/");
      return redirect("/");
    }
  }
}
export const ssr = false;
