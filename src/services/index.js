const API_ROOT = "/api/";

export const api = {
  getQuestions() {
    const fullUrl = API_ROOT + "questions";
    return fetch(fullUrl)
      .then((response) => response.json().then((json) => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
      .then(
        (response) => ({ response }),
        (error) => ({ error: error.message || "Something bad happened" })
      );
  },

  postAnswers(answersMap) {
    const fullUrl = API_ROOT + "answers";
    return fetch(fullUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(answersMap),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Error response");
        }
        return "OK";
      })
      .then(
        (response) => ({ response }),
        (error) => ({ error: error.message || "Something bad happened" })
      );
  },
};
