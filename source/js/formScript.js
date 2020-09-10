'use strict';

const indexSubmitButton = document.querySelector('.index-form input[type="submit"]');
const indexForm = document.querySelector('.index-form');
const indexFormInputTel = document.querySelector('.index-form input[type="tel"]');
const indexFormInputMail = document.querySelector('.index-form input[type="text"]');
const indexContainerTel = document.querySelector('.index-form__container-tel');
const indexContainerMail = document.querySelector('.index-form__container-mail');
const successMessage = document.querySelector('.index-form__success');
const successCloseButton = document.querySelector('.index-form__success-button');
let errIndexMessageTel = document.createElement('div');
errIndexMessageTel.className = 'error-index-message-tel';
errIndexMessageTel.innerHTML = 'Данные не верны';
errIndexMessageTel.style.marginTop = '0';
let errIndexMessageMail = document.createElement('div');
errIndexMessageMail.className = 'error-index-message-mail';
errIndexMessageMail.innerHTML = 'Данные не верны';

const showIndexErrorMessage = function(elem, input, container) {
  container.prepend(elem);
  input.style.marginTop = "0";
  input.classList.add('index-form__error');
}

const resetIndexErrorMessage = function(elem, anotherInput) {
  elem.remove();
  anotherInput.style = null;
  anotherInput.classList.remove('index-form__error');
}

const successClose = function() {
  successMessage.classList.add('visually-hidden');
  successCloseButton.removeEventListener('click', successClose);
}

const checkIndexForm = function(evt) {
  evt.preventDefault();
  if (!regExpTel.test(indexFormInputTel.value) && !regExpMail.test(indexFormInputMail.value) && indexFormInputMail.value !== "") {
    showIndexErrorMessage(errIndexMessageTel, indexFormInputTel, indexContainerTel);
    showIndexErrorMessage(errIndexMessageMail, indexFormInputMail, indexContainerMail);
  } else if (!regExpMail.test(indexFormInputMail.value) && indexFormInputMail.value !== "") {
    resetIndexErrorMessage(errIndexMessageTel, indexFormInputTel);
    showIndexErrorMessage(errIndexMessageMail, indexFormInputMail, indexContainerMail);
  } else if (!regExpTel.test(indexFormInputTel.value) || indexFormInputTel.value === "") {
    resetIndexErrorMessage(errIndexMessageMail, indexFormInputMail);
    showIndexErrorMessage(errIndexMessageTel, indexFormInputTel, indexContainerTel);
  } else {
    resetIndexErrorMessage(errIndexMessageTel, indexFormInputTel);
    resetIndexErrorMessage(errIndexMessageMail, indexFormInputMail);
    indexFormInputTel.value = '';
    indexFormInputMail.value = '';
    successMessage.classList.remove('visually-hidden');
    successCloseButton.addEventListener('click', successClose);
  }
}

indexForm.addEventListener('submit', checkIndexForm);
