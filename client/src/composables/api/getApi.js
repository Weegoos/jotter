import axios from "axios";

export async function getMethod (serverURL, apiURL, variable){
  try {
    const response = await axios.get(`${serverURL}${apiURL}`, {
      headers: {
        "Content-Type": 'application/json'
      }
    })

    variable.value = response.data
  } catch (error) {
    console.log(error);

  }
}
