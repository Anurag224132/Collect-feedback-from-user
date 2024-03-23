let surveyData = [];

document.getElementById('surveyForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the survey title
  const surveyTitle = document.getElementById('surveyTitle').value;

  // Get all question inputs
  const questions = document.querySelectorAll('[id^=question]');

  // Create an array to store questions and their choices
  let surveyQuestions = [];

  // Loop through each question input
  questions.forEach(question => {
    const questionId = question.id;
    const questionNumber = questionId.replace('question', '');
    const questionText = question.value;

    // Get the corresponding answer choices input
    const answerId = 'answer' + questionNumber;
    const answerText = document.getElementById(answerId).value.split(',').map(choice => choice.trim());

    // Store the question and answer choices in an object
    const questionObj = {
      question: questionText,
      choices: answerText
    };

    // Push the object to the surveyQuestions array
    surveyQuestions.push(questionObj);
  });

  // Store the survey title and questions in an object
  const survey = {
    title: surveyTitle,
    questions: surveyQuestions
  };

  // Push the survey object to the surveyData array
  surveyData.push(survey);

  // Clear the form
  document.getElementById('surveyForm').reset();

  // Display a message or update UI to indicate the survey was saved
  alert('Survey saved successfully!');

  // Call the displaySurveyData function to display the survey data
  displaySurveyData();
});

function displaySurveyData() {
  const surveyList = document.getElementById('surveyList');
  surveyList.innerHTML = ''; // Clear previous content

  const userDataDiv = document.getElementById('userData');
  userDataDiv.innerHTML = ''; // Clear previous content

  surveyData.forEach((survey, index) => {
    const surveyContainer = document.createElement('div');
    surveyContainer.classList.add('survey-container');

    const surveyTitle = document.createElement('h2');
    surveyTitle.textContent = `Survey ${index + 1}: ${survey.title}`;
    surveyContainer.appendChild(surveyTitle);

    const questionsList = document.createElement('ul');

    survey.questions.forEach((question, qIndex) => {
      const questionItem = document.createElement('li');
      questionItem.textContent = `${qIndex + 1}. ${question.question}`;

      const choicesList = document.createElement('ul');
      question.choices.forEach(choice => {
        const choiceItem = document.createElement('li');
        choiceItem.textContent = choice;
        choicesList.appendChild(choiceItem);
      });

      questionItem.appendChild(choicesList);
      questionsList.appendChild(questionItem);
    });

    surveyContainer.appendChild(questionsList);
    surveyList.appendChild(surveyContainer);
  });

  // Display user-entered data
  const userData = document.createElement('div');
  userData.innerHTML = `
    <h2>User Entered Data:</h2>
    <p>Survey Title: ${surveyData[surveyData.length - 1].title}</p>
    <ul>
      ${surveyData[surveyData.length - 1].questions.map((q, i) => `
        <li>
          Question ${i + 1}: ${q.question}<br>
          Answer Choices: ${q.choices.join(', ')}
        </li>
      `).join('')}
    </ul>
  `;
  userDataDiv.appendChild(userData);
}

