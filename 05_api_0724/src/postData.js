const postData = (apiKey, wav) => {
  const form = { apikey: apiKey, wav: wav };
  console.log({ form });
  var formData = new FormData();
  // const fileField = document.querySelector('input[type="file"]');
  //   formData.append("username", "Chris");
  formData.append("apikey", "pEY_cI-0muX9BbG7fvetV19IMiipC3q59TawpE3cwfw");
  formData.append("wav", wav);
  console.log("postData.js", formData.keys());
  console.log(...formData.entries());

  fetch("https://api.webempath.net/v2/analyzeWav", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
    // formData: { apiKey: data.at(0).apiKey.toString(), wav: fileName },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default postData;
