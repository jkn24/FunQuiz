const slides = document.querySelectorAll('.question-slide');
const backButtons = document.querySelectorAll('.back-button');
let currentSlide = 0;

// Show the initial question
showSlide(currentSlide);

slides.forEach((slide, index) => {
  // Attach change listeners to each radio button in this slide
  const radios = slide.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (index < slides.length - 1) {
        goToSlide(index + 1);
      } else {
        evaluateEligibility();
      }
    });
  });
});

backButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (index > 0) {
      goToSlide(index - 1);
    }
  });
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function goToSlide(index) {
  showSlide(index);
}

function evaluateEligibility() {
  const answers = ['q1', 'q2', 'q3', 'q4'].map(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    return selected ? selected.value : 'no';
  });

  const allYes = answers.every(answer => answer === 'yes');

  // Hide the form
  document.getElementById('eligibility-quiz').style.display = 'none';

  // Show result
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.textContent = allYes
    ? "Congrats! You are eligible to apply for PI Researcher funding at Cal Poly Humboldt!"
    : "Oops! It looks like you might not meet all the requirements. Please check with the Office of Research.";
  resultDiv.className = "result " + (allYes ? "success" : "error");

  // Show Try Again button
  document.getElementById('try-again').style.display = 'block';
}
