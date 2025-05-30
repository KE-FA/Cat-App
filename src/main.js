import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
// import axios from "axios";
// import { default as axios } from 'axios';

const facts = document.querySelector("#facts");
const photos = document.querySelector("#number");
const btnSubmit1 = document.querySelector("#btn-submit1");
const btnSubmit2 = document.querySelector("#btn-submit2");
const result = document.querySelector(".outcome");
const loader = document.querySelector(".loader-section");

btnSubmit1.addEventListener("click", async (e) => {
  const randomPhotos = facts.value;
  loader.style.display = "flex";

  if (randomPhotos === "") {
    result.textContent = "Please provide a suitable number";
    return;
  }
  if (randomPhotos <= 50) {
    try {
      result.innerHTMl = "";
      let listItems = "";
      for (let i = 0; i < randomPhotos; i++) {
        const response = await axios.get("https://meowfacts.herokuapp.com/");
        const dataFacts = response.data;

        listItems += `<li>${dataFacts.data}</li>`;
        // const data = await response.json();

        // console.log(dataFacts);
      }
      result.innerHTML = `<ol type="1">${listItems}</ol>`;

      // result.textContent = dataFacts.data;
      // console.log(result)
    } catch (error) {
      result.textContent = "Error fetching cat fact";
    }
    loader.style.display = "none";
  } else {
    result.textContent = "The Number should be less than or equal to 50";
  }
});

btnSubmit2.addEventListener("click", async (e) => {
  const randomPhotos = photos.value;
  loader.style.display = "flex";

  if (randomPhotos === "") {
    result.textContent = "Please provide a suitable number";
    return;
  }
  if (randomPhotos <= 10) {
    try {
      result.innerHTMl = "";
      let imageItems = "";
      for (let i = 0; i < randomPhotos; i++) {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=${randomPhotos}"
        );
        const dataFacts = response.data;
        const theUrl = dataFacts[0].url;
        console.log(theUrl);

        imageItems += `<img src=${theUrl} alt="catPicture"></img>`;
      }
      result.innerHTML = `<div>${imageItems}</div>`;
    } catch (error) {
      result.textContent = "Error fetching cat fact";
    }
    loader.style.display = "none";
  } else {
    result.textContent = "The Image should be less than or equal to 10";
  }
});
