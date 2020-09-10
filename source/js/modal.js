'use strict';

const modalCloseButton = document.querySelector('.modal__close-button');
const modalWindow = document.querySelector('.modal');
const submitButton = document.querySelector('.modal__submit');
const modalForm = document.querySelector('.modal__form');
const modalSuccess = document.querySelector('.modal__success');
const openModalButtons = document.querySelectorAll('.button-buy');
const modalFormInputTel = document.querySelector('.modal__form input[type="tel"]');
const modalFormInputMail = document.querySelector('.modal__form input[type="text"]');
const ESC_BUTTON = 'Escape';
const ENTER_BUTTON = 'Enter';
const regExpTel = /^[0-9]{3,10}$/;
const regExpMail = /^[A-Za-zА-Яа-я0-9_]+@{1}[A-Za-zА-Яа-я0-9.]+$/;
let errMessageTel = document.createElement('div');
errMessageTel.className = 'error-message-tel';
errMessageTel.innerHTML = 'Данные не верны';
let errMessageMail = document.createElement('div');
errMessageMail.className = 'error-message-mail';
errMessageMail.innerHTML = 'Данные не верны';

const onClickCloseModal = function() {
  modalWindow.classList.add('visually-hidden');
  document.removeEventListener('keydown', onEscCloseModal);
  modalCloseButton.removeEventListener('click', onClickCloseModal);
  modalForm.removeEventListener('submit', onSubmitHideForm);
  modalForm.classList.remove('visually-hidden');
  modalSuccess.classList.add('visually-hidden');
  modalWindow.classList.remove('modal-sent');
  resetErrorMessage(errMessageTel, modalFormInputTel);
  resetErrorMessage(errMessageMail, modalFormInputMail);
  modalFormInputTel.value = '';
  modalFormInputMail.value = '';
}

const onEscCloseModal = function(evt) {
  if (evt.code === ESC_BUTTON) {
    evt.preventDefault();
    onClickCloseModal();
  }
}

const resetErrorMessage = function(elem, anotherInput) {
  elem.remove();
  anotherInput.style = null;
  anotherInput.classList.remove('modal__error');
}

const showErrorMessage = function(elem, input) {
  input.before(elem);
  input.style.marginTop = "0";
  input.classList.add('modal__error');
}

const onSubmitHideForm = function(evt) {
  evt.preventDefault();
  if (!regExpTel.test(modalFormInputTel.value) && !regExpMail.test(modalFormInputMail.value) && modalFormInputMail.value !== "") {
    showErrorMessage(errMessageTel, modalFormInputTel);
    showErrorMessage(errMessageMail, modalFormInputMail);
  } else if (!regExpMail.test(modalFormInputMail.value) && modalFormInputMail.value !== "") {
    resetErrorMessage(errMessageTel, modalFormInputTel);
    showErrorMessage(errMessageMail, modalFormInputMail);
  } else if (!regExpTel.test(modalFormInputTel.value) || modalFormInputTel.value === "") {
    resetErrorMessage(errMessageMail, modalFormInputMail);
    showErrorMessage(errMessageTel, modalFormInputTel);
  } else {
    resetErrorMessage(errMessageTel, modalFormInputTel);
    resetErrorMessage(errMessageMail, modalFormInputMail);
    modalForm.classList.add('visually-hidden');
    modalSuccess.classList.remove('visually-hidden');
    modalWindow.classList.add('modal-sent');
    modalFormInputTel.value = '';
    modalFormInputMail.value = '';
  }
}

const openModalWindow = function() {
  modalWindow.classList.remove('visually-hidden');
  document.addEventListener('keydown', onEscCloseModal);
  modalCloseButton.addEventListener('click', onClickCloseModal);
  modalForm.addEventListener('submit', onSubmitHideForm);
}

const onEnterOpenModal = function(evt) {
  if (evt.code === ENTER_BUTTON) {
    evt.preventDefault();
    openModalWindow();
  }
}

openModalButtons.forEach(function(item, i, arr) {
  item.addEventListener('click', openModalWindow);
  item.addEventListener('keydown', onEnterOpenModal);
})
