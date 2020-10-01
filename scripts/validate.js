const showInputError = (classObj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(classObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classObj.errorClass);
};

const hideInputError = (classObj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(classObj.inputErrorClass);
  errorElement.classList.remove(classObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, classObj, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(classObj, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(classObj, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (classObj, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(classObj.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(classObj.inactiveButtonClass);
  }
}; 


const setEventListeners = (classObj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(classObj.inputSelector));
  const buttonElement = formElement.querySelector(classObj.submitButtonSelector);
  toggleButtonState(classObj, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, classObj, inputElement);
      toggleButtonState(classObj, inputList, buttonElement);
    });
  });
};

const enableValidation = (classObj) => {
  const formList = Array.from(document.querySelectorAll(classObj.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(classObj, formElement);
  });
};