const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  const res = await fetch(url);
  const details = await res.json();
  displayLessons(details.data);
};

const wordByLevels = async (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  removeActive();
  const btn = document.getElementById(`lesson-btn-${id}`);
  btn.classList.add("active");
  displayWordByLevels(details.data);
};

//remove active
const removeActive = () => {
  const buttons = document.querySelectorAll(".lesson-btn");
  // console.log(btn);
  buttons.forEach((btn) => btn.classList.remove("active"));
};

const displayLessons = (datas) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  console.log(datas);
  datas.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id = "lesson-btn-${element.level_no}" onclick = "wordByLevels(${element.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>
    Lesson - ${element.level_no}</button>
    `;
    lessonContainer.appendChild(div);
  });
};

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const displayWordByLevels = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div
        class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-xl md:text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    
    `;
    manageSpinner(false);
    return;
  }
  console.log(words);
  words.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="card bg-white space-y-6 p-14 h-full">
            <h1 class="font-bold text-2xl lg:text-3xl">${element.word}</h1>
            <h4 class="font-medium md:text-xl">Meaning / Pronounciation</h4>
            <h1 class="font-semibold text-2xl lg:text-3xl font-bangla text-[#18181B]">
              "${element.meaning ? element.meaning : "অর্থ পাওয়া যায়নি"} / ${
      element.pronunciation
    }"
            </h1>
            <div class="flex justify-between">
              <div onclick="loadWordDetails(${
                element.id
              })" class="bg-[#1A91FF10] p-4 rounded-md">
                <i  class="fa-solid fa-circle-info"></i>
              </div>
              <div onclick ="pronounceWord('${element.word}')" class="bg-[#1A91FF10] p-4 rounded-md">
                <i class="fa-solid fa-volume-high"></i>
              </div>
            </div>
          </div>
    `;
    wordContainer.appendChild(div);
  });
  manageSpinner(false);
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  // console.log(details.data, 'ami loadworddetails');
  displayWordDetails(details.data);
};

const returnSynonyms = (arr) => {
  if (arr.length == 0) {
    return "There is no Synonyms available";
  }
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const displayWordDetails = (data) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <h1 class="font-bold text-2xl lg:text-3xl">${
    data.word
  } (<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation})</h1>
  <div>
      <h4 class="font-medium md:text-xl">Meaning</h4>
      <h4 class=" md:text-xl">${
        data.meaning ? data.meaning : "অর্থ পাওয়া যায় নি"
      }</h4>
  </div>
  <div>
      <h4 class="font-medium md:text-xl">Example</h4>
      <h4 class="md:text-xl text-gray-600">${
        data.sentence ? data.sentence : "no sentence found..."
      }</h4>
  </div>
  <div>
      <h4 class="font-medium md:text-xl">Synonyms</h4>
      <div>${returnSynonyms(data.synonyms)}</div>
  </div>
  `;
  document.getElementById("word-modal").showModal();
};

loadLessons();

document.getElementById("search").addEventListener("click", () => {
  const value = document.getElementById("search-input").value;
  const updatedValue = value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>word.word.toLowerCase().includes(updatedValue));
      displayWordByLevels(filterWords);
    });
});
