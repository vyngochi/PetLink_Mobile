import { Redirect } from "expo-router";

/** Entry point: send users to the Login screen first. */
export default function Index() {
  return <Redirect href="/login" />;
}
