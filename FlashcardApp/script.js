// Selecting DOM elements
const container = document.querySelector(".container");
const addQuestionModal = document.getElementById("add-card-modal");
const saveBtn = document.getElementById("save-btn")
const question = document.getElementById("question")
const answer = document.getElementById("answer")
const errorMessage = document.getElementById("error")
const addQuestion = document.getElementById("add-card")
const closeBtn = document.getElementById("close-btn")

// Initializing variables
let editBool = false;
let originalId = null;
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

addQuestion.addEventListener("click", () => {
    // Show the add question card and hide the container
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionModal.classList.remove("hide");
});

closeBtn.addEventListener('click', ()=>{
    // Close the add question modal and show the container
    container.classList.remove('hide');
    addQuestionModal.classList.add('hide');
    errorMessage.classList.add('hide');
    question.value = "";
    answer.value = "";
    if(editBool){
        editBool = false;   
        disableBtns(false);
    }
});

saveBtn.addEventListener('click',()=>{
    // Save the flashcard
    let tempQuestion = question.value.trim();
    let tempAnswer = answer.value.trim();
    if(!tempQuestion || !tempAnswer){
        // Display error message if question or answer is missing
        errorMessage.classList.remove('hide');
    }else{
        if(editBool){
            // If editing an existing flashcard
            flashcards = flashcards.filter(flashcard => flashcard.id !== originalId);
        }
        let id = Date.now();
        // Add the new flashcard to the array
        flashcards.push({id, question: tempQuestion, answer: tempAnswer});
        // Save the flashcards array to localStorage
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        container.classList.remove('hide');
        errorMessage.classList.add('hide');
        viewList();
        question.value = "";
        answer.value = "";
        editBool = false;
        addQuestionModal.classList.add('hide');
        disableBtns(false);
    }
});

// Function to display the flashcards
function viewList(){
    flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const cardList = document.querySelector('.cards-list');
    cardList.innerHTML = '';
    flashcards.forEach(flashcard => {
        const div = document.createElement("div");
        div.classList.add('card');
        div.innerHTML = `
            <p class="que-div">${flashcard.question}</p>
            <p class="ans-div hide">${flashcard.answer}</p>
            <button class="show-hide-btn">Show/Hide</button>
            <div class="btns-con">
                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>    
        `;

        div.setAttribute('data-id', flashcard.id);
        const displayAnswer = div.querySelector('.ans-div');
        const showHideBtn = div.querySelector('.show-hide-btn');
        const editBtn = div.querySelector('.edit');
        const deleteBtn = div.querySelector('.delete');

        showHideBtn.addEventListener('click', () => {
            // Toggle the visibility of the answer
            displayAnswer.classList.toggle('hide');
        });

        editBtn.addEventListener('click', () => {
            // Enable editing mode and show the add question card
            editBool = true;
            modifyElement(editBtn, true);
            addQuestionModal.classList.remove('hide');
        });

        deleteBtn.addEventListener('click', () => {
            // Delete the flashcard
            modifyElement(deleteBtn);
        });

        cardList.appendChild(div);
    });
}

// Function to modify a flashcard
const modifyElement = (element, edit = false) => {
    const parentDiv = element.parentElement.parentElement;
    const id = Number(parentDiv.getAttribute('data-id'));
    const parentQuestion = parentDiv.querySelector('.que-div').innerText;
    if(edit){
        const parentAnswer = parentDiv.querySelector('.ans-div').innerText;
        answer.value = parentAnswer;
        question.value = parentQuestion;
        originalId = id;
        disableBtns(true);
        container.classList.add('hide');
    } else {
        // Remove the flashcard from array and update localStorage
        flashcards = flashcards.filter(flashcard => flashcard.id !== id);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        parentDiv.remove();
    }
};

// Function to disable edit buttons
const disableBtns = (value) => {
    const editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = value;
    });
};

// Event listener to display the flashcard list when the DOM is loaded
document.addEventListener("DOMContentLoaded", viewList);
