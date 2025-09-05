const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  const res = await fetch(url);
  const details = await res.json();
  displayLessons(details.data);
};

const wordByLevels = async (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordByLevels(details.data);
};
// {
//     "id": 3,
//     "level": 2,
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস"
// }

const displayWordByLevels = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  console.log(words);
  words.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="card bg-white space-y-6 p-14 h-full">
            <h1 class="font-bold text-3xl">${element.word}</h1>
            <h4 class="font-medium text-xl">Meaning / Pronounciation</h4>
            <h1 class="font-semibold text-3xl font-bangla text-[#18181B]">
              "${element.meaning} / ${element.pronunciation}"
            </h1>
            <div class="flex justify-between">
              <div class="bg-[#1A91FF10] p-4 rounded-md">
                <i class="fa-solid fa-circle-info"></i>
              </div>
              <div class="bg-[#1A91FF10] p-4 rounded-md">
                <i class="fa-solid fa-volume-high"></i>
              </div>
            </div>
          </div>
    `;
    wordContainer.appendChild(div);
  });
};

const displayLessons = (datas) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  console.log(datas);
  datas.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick = "wordByLevels(${element.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>
    Lesson - ${element.level_no}</button>
    `;
    lessonContainer.appendChild(div);
  });
};

loadLessons();