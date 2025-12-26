/* =========================================================
   STATIC SLIDES NAVIGATION (INTRO + REAL LIFE + INPUT)
   ========================================================= */

const staticSlides = document.querySelectorAll(".slide");
let staticIndex = 0;

function nextStatic() {
  staticSlides[staticIndex].classList.remove("active");
  staticIndex++;
  staticSlides[staticIndex].classList.add("active");
}

/* =========================================================
   DYNAMIC SLIDES (ALGORITHM STEPS)
   ========================================================= */

const dynamicContainer = document.getElementById("dynamicSlides");
let dynamicSlides = [];
let dynamicIndex = 0;

const BASE_ADDRESS = 1000;
const STEP = 4;

/* =========================================================
   START AFTER USER INPUT
   ========================================================= */

function start() {
  const values = document
    .getElementById("listInput")
    .value.split(",")
    .map(v => v.trim())
    .filter(v => v !== "");

  const n = parseInt(document.getElementById("nInput").value);

  if (values.length === 0 || isNaN(n) || n <= 0 || n > values.length) {
    alert("Please enter a valid linked list and n value");
    return;
  }

  staticSlides[staticIndex].classList.remove("active");

  generateSlides(values, n);
  showDynamic(0);
}

/* =========================================================
   GENERATE ALL STEPS (FAST & SLOW POINTERS)
   ========================================================= */

function generateSlides(values, n) {
  dynamicContainer.innerHTML = "";
  dynamicSlides = [];
  dynamicIndex = 0;

  let slow = 0;
  let fast = 0;

  /* STEP 1: INITIAL STATE */
  dynamicSlides.push(createSlide(
    "Initial Linked List",
    values,
    slow,
    fast
  ));

  /* STEP 2: MOVE FAST n STEPS AHEAD */
  for (let i = 1; i <= n; i++) {
    fast++;
    dynamicSlides.push(createSlide(
      `Move FAST pointer ${i} step(s) ahead`,
      values,
      slow,
      fast
    ));
  }

  /* STEP 3: MOVE BOTH FAST & SLOW */
  while (fast < values.length - 1) {
    slow++;
    fast++;
    dynamicSlides.push(createSlide(
      "Move FAST and SLOW together",
      values,
      slow,
      fast
    ));
  }

  /* STEP 4: NODE TO REMOVE */
  const removeIndex = slow + 1;
  dynamicSlides.push(createSlide(
    `Remove node ${values[removeIndex]} (Nth from end)`,
    values,
    slow,
    fast,
    removeIndex
  ));

  /* STEP 5: FINAL LINKED LIST */
  const result = values.filter((_, i) => i !== removeIndex);
  dynamicSlides.push(createSlide(
    "Final Linked List",
    result,
    -1,
    -1
  ));

  /* STEP 6: TIME & SPACE COMPLEXITY */
  dynamicSlides.push(createComplexitySlide());

  dynamicSlides.forEach(slide => dynamicContainer.appendChild(slide));
}

/* =========================================================
   CREATE ALGORITHM SLIDE
   ========================================================= */

function createSlide(title, values, slow, fast, removeIndex = -1) {
  const slide = document.createElement("div");
  slide.className = "slide";

  slide.innerHTML = `
    <h2>${title}</h2>
    ${renderList(values, slow, fast, removeIndex)}
    <button onclick="nextDynamic()">Next ➡</button>
  `;

  return slide;
}

/* =========================================================
   RENDER LINKED LIST WITH ADDRESSES & POINTERS
   ========================================================= */

function renderList(values, slow, fast, removeIndex) {
  let html = `<div class="line">`;

  values.forEach((val, idx) => {
    const address = BASE_ADDRESS + idx * STEP;

    html += `
      <div class="node-wrapper">

        ${idx === slow ? `<div class="pointer">SLOW</div>` : ""}
        ${idx === fast ? `<div class="pointer">FAST</div>` : ""}

        <div class="node ${idx === removeIndex ? "remove" : ""}">
          <div class="data">${val}</div>
          <div class="addr">${address}</div>
        </div>

      </div> →
    `;
  });

  html += `NULL</div>`;
  return html;
}

/* =========================================================
   COMPLEXITY SLIDE
   ========================================================= */

function createComplexitySlide() {
  const slide = document.createElement("div");
  slide.className = "slide";

  slide.innerHTML = `
    <h2>Time & Space Complexity</h2>

    <p><b>Time Complexity:</b> O(n)</p>
    <p>
      The linked list is traversed only once using
      fast and slow pointers.
    </p>

    <p><b>Space Complexity:</b> O(1)</p>
    <p>
      Only two pointers are used.
      No extra data structures are required.
    </p>

    <h3>✔ Efficient Two-Pointer Technique</h3>
  `;

  return slide;
}

/* =========================================================
   DYNAMIC SLIDES NAVIGATION
   ========================================================= */

function showDynamic(i) {
  dynamicSlides[i].classList.add("active");
}

function nextDynamic() {
  dynamicSlides[dynamicIndex].classList.remove("active");
  dynamicIndex++;
  if (dynamicIndex < dynamicSlides.length) {
    dynamicSlides[dynamicIndex].classList.add("active");
  }
}
