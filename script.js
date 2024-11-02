const form = document.getElementById("predictionForm");
const xgTeam1Input = document.getElementById("xgTeam1");
const xgTeam2Input = document.getElementById("xgTeam2");
const resultsContainer = document.getElementById("resultsContainer");
const firstHalfResults = document.getElementById("firstHalfResults");
const secondHalfResults = document.getElementById("secondHalfResults");
const fullMatchResults = document.getElementById("fullMatchResults");
const lockerBtn = document.getElementById("fullMatchResults");
const modal = document.getElementById("modal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const xgTeam1 = xgTeam1Input.value;
  const xgTeam2 = xgTeam2Input.value;

  if (!xgTeam1 || !xgTeam2) {
    showModal();
    return;
  }

  try {
    resultsContainer.style.display = "none";
    const response = await fetch(
      `https://zolag-bot.vercel.app/api?&xg1=${xgTeam1}&xg2=${xgTeam2}`
    );
    const data = await response.json();
    console.log(data);
    if (!data.success) {
      showModal();
    } else {
      displayResults(data);
    }
  } catch (error) {
    console.error("Form submission error:", error);
    showModal();
  }
});

function displayResults(data) {
  firstHalfResults.innerHTML = `<h3>First Half</h3>`;
  secondHalfResults.innerHTML = `<h3>Second Half</h3>`;
  fullMatchResults.innerHTML = `<h3>Full Match</h3>`;

  data.data.firstHalf.forEach((result) => {
    firstHalfResults.innerHTML += `<p>Expected Score: ${result.score} - Probability: ${result.probability}%</p>`;
  });

  data.data.secondHalf.forEach((result) => {
    secondHalfResults.innerHTML += `<p>Expected Score: ${result.score} - Probability: ${result.probability}%</p>`;
  });

  data.data.fullMatch.forEach((result) => {
    fullMatchResults.innerHTML += `<p>Expected Score: ${result.score} - Probability: ${result.probability}%</p>`;
  });

  resultsContainer.style.display = "block";
}

function showModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}
