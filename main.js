document.getElementById('eligibility-quiz').addEventListener('submit', function(e) {
    e.preventDefault();

    const answers = ['q1', 'q2', 'q3', 'q4'].map(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        return selected ? selected.value : 'no';
    });

    const allYes = answers.every(answer => answer === 'yes');

    // Hide the form
    const form = document.getElementById('eligibility-quiz');
    form.classList.add('hidden');

    // Show result
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.textContent = allYes
        ? "✅ Congrats! You are eligible to apply for PI Researcher funding at Cal Poly Humboldt!"
        : "❌ Oops! It looks like you might not meet all the requirements. Please check with the Office of Research.";
    resultDiv.className = "result " + (allYes ? "success" : "error");

    // Show Try Again button
    document.getElementById('try-again').style.display = 'block';
});
