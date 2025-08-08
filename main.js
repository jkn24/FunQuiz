const slides = document.querySelectorAll('.question-slide');
const backButtons = document.querySelectorAll('.back-button');
let currentSlide = 0;

// Show the initial question
showSlide(currentSlide);

// Auto-advance on radio button change
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

// Back button goes to previous slide if possible
backButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  });
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentSlide = index;

  // Disable the back button on first slide, enable otherwise
  backButtons.forEach((button, i) => {
    button.disabled = i === 0 && index === 0;
  });
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

  // Show the result message
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.textContent = allYes
    ? "🎉 Congrats! You are eligible to apply for PI Researcher funding at Cal Poly Humboldt!"
    : "⚠️ Oops! It looks like you might not meet all the requirements. Please check with the Office of Research.";
  resultDiv.className = "result " + (allYes ? "success" : "error");

  // Show the Try Again button
  document.getElementById('try-again').style.display = 'block';
}
