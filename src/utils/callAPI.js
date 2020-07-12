import axios from "axios";

export default function callAPI(
  endpoint,
  method = "GET",
  body = null,
  token = ""
) {
  try {
    return axios({
      method: method,
      url: `${"https://suaxe-admin-api.herokuapp.com"}/${endpoint}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (e) {
    alert("Connection Error", "Could not fetch data from API");
  }
}
