const axios = require("axios");
require("dotenv").config();

const api = {
  getUser(username) {
    return axios
    //getting the user's Github info
      .get(
        `https://api.github.com/users/${username}?client_id=${
          process.env.CLIENT_ID
        }&client_secret=${process.env.CLIENT_SECRET}`
      )
      // catching the error, should the profile not be found
      .catch(err => {
        console.log(`User not found`);
        process.exit(1);
      });
  },

getTotalStars(username) {
    return axios
    //Getting the info we sent out for
      .get(
        `https://api.github.com/users/${username}/repos?client_id=${
          process.env.CLIENT_ID
        }&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
      )
      //pushing the info, returning it afterwards
      .then(response => {
        return response.data.reduce((acc, curr) => {
          acc += curr.stargazers_count;
          return acc;
        }, 0);
      });
  }
};

module.exports = api;
