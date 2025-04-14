document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quiz-form");
    const resultText = document.getElementById("result");


    const correctAnswers = {
        q1: "1789",
        q2: "Колумб",
        q3: "1939",
        q4: "1969",
        q5: "1989"
    };

    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;

    
        for (let key in correctAnswers) {
            let selectedOption = document.querySelector(`input[name="${key}"]:checked`);
            if (selectedOption && selectedOption.value === correctAnswers[key]) {
                score++;
            }
        }

    
        if (score === totalQuestions) {
            resultText.style.color = "green";
            resultText.textContent = `Відмінно! Ви відповіли правильно на всі ${totalQuestions} питання.`;
        } else {
            resultText.style.color = "red";
            resultText.textContent = `Ви відповіли правильно на ${score} з ${totalQuestions} питань. Спробуйте ще раз!`;
        }
    });
});
