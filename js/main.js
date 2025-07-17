document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    if (!quizForm) return; // Do nothing if there's no quiz on the page

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the form from submitting the traditional way

        const correctAnswers = JSON.parse(quizForm.dataset.answers);
        const questions = quizForm.querySelectorAll('.question');
        const resultsContainer = document.getElementById('quiz-results');
        const submitButton = document.getElementById('submit-btn');

        let score = 0;
        let allQuestionsAnswered = true;

        questions.forEach((question, index) => {
            const selectedInput = question.querySelector(`input[name="q${index + 1}"]:checked`);
            
            // Reset previous feedback
            question.classList.remove('correct', 'incorrect');
            question.querySelectorAll('label').forEach(label => {
                label.classList.remove('correct-answer', 'selected-incorrect');
            });

            if (!selectedInput) {
                allQuestionsAnswered = false;
                return; // Skip to the next question if this one isn't answered
            }

            const userAnswer = selectedInput.value;
            const correctAnswer = correctAnswers[index];
            const selectedLabel = selectedInput.parentElement;
            const correctLabel = question.querySelector(`input[value="${correctAnswer}"]`).parentElement;

            if (userAnswer === correctAnswer) {
                score++;
                question.classList.add('correct');
                selectedLabel.classList.add('correct-answer');
            } else {
                question.classList.add('incorrect');
                selectedLabel.classList.add('selected-incorrect');
                correctLabel.classList.add('correct-answer');
            }
        });

        if (!allQuestionsAnswered) {
            resultsContainer.textContent = "Please answer all questions before submitting.";
            resultsContainer.style.backgroundColor = '#f8d7da';
            resultsContainer.style.color = '#721c24';
            return;
        }

        // Display the final score
        const percentage = Math.round((score / questions.length) * 100);
        resultsContainer.innerHTML = `You scored ${score} out of ${questions.length} (${percentage}%)`;
        
        if(percentage >= 80) {
            resultsContainer.style.backgroundColor = '#d4edda';
            resultsContainer.style.color = '#155724';
        } else if (percentage >= 50) {
             resultsContainer.style.backgroundColor = '#fff3cd';
             resultsContainer.style.color = '#856404';
        } else {
            resultsContainer.style.backgroundColor = '#f8d7da';
            resultsContainer.style.color = '#721c24';
        }

        // Disable the submit button after checking
        submitButton.disabled = true;
    });
});
