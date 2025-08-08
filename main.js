const slides = document.querySelectorAll('.question-slide');
const backButtons = document.querySelectorAll('.back-button');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
  currentSlide = index;

  // Disable back button on the current slide if it's the first slide
  backButtons.forEach((button, i) => {
    button.disabled = (i === index) && (index === 0);
  });
}

function goToSlide(index) {
  if (index >= 0 && index < slides.length) {
    showSlide(index);
  }
}

function evaluateEligibility() {
  const answers = ['q1', 'q2', 'q3', 'q4'].map(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    return selected ? selected.value : 'no';
  });

  const allYes = answers.every(answer => answer === 'yes');

  // Hide the form
  document.getElementById('eligibility-quiz').style.display = 'none';

  // Show the result message
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.textContent = allYes
    ? "Congrats! You are eligible to apply for PI Researcher funding at Cal Poly Humboldt!"
    : "Oops! It looks like you might not meet all the requirements. Please check with the Office of Research.";
  resultDiv.className = "result " + (allYes ? "success" : "error");

  // Show the Try Again button
  document.getElementById('try-again').style.display = 'block';
}

// Initial display
showSlide(currentSlide);

// Add event listeners to radio buttons for auto-advance
slides.forEach((slide, index) => {
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

// Back buttons to go to previous slide
backButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });
});
