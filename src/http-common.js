import axios from "axios";

export default axios.create({
  baseURL: "https://us-central1-exam-5facf.cloudfunctions.net/app", //"http://localhost:5001/exam-5facf/us-central1/app", //https://us-central1-exam-5facf.cloudfunctions.net/app
  headers: {
    "Content-type": "application/json",
  },
});
