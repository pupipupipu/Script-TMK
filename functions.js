/////// Скрытие элементов
function hiddenNoNeedElements(selector) {
	waitForSelector(()=>{
		const element = document.querySelector(selector);
		element.style.display = 'none';
	}, selector)
}
/////// Скрытие элементов

/////// Ожидание появления сел{ектора
function waitForSelector(workFunction, selector) {
  // Передаваемый элемент
  const targetElement = document.querySelector(selector);

  if (targetElement) {
    workFunction();
  } else {
    // Создаем экземпляр MutationObserver с колбэком, который будет вызываться при изменениях
    const observer = new MutationObserver((mutationsList, observer) => {
      // Проверяем, есть ли сейчас элементы, соответствующие вашему селектору
      const targetElementNow = document.querySelector(selector);

      if (targetElementNow) {
        // Если элемент найден, останавливаем отслеживание и запускаем скрипт
        observer.disconnect();
        workFunction();
      }
    });

    // Начинаем отслеживание изменений в корне документа и его потомках
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}
/////// Ожидание появления селектора

/////// Кнопка сохранения
function saveChanges() {
	waitForSelector(()=>{
		const saveButton = document.querySelector('button#save_and_close_contacts_link');
		saveButton.click();
	}, 'button#save_and_close_contacts_link');
}
/////// Кнопка сохранения


/////// Ожидание сохранеия изменений на странице
function waitLoadSave(workFunction) {
	const saveButton = document.querySelector('button#save_and_close_contacts_link');
	
  const checkSave = setInterval(() => {

    const isSaving = saveButton.classList.contains('button-input-loading');

    if (!isSaving) {
      clearInterval(checkSave);
      setTimeout(workFunction, 1000);
    }
  }, 500);
}
/////// Ожидание сохранеия изменений на странице


/////// Клик по кнопке ЕЩЕ
function clickMore(){
	waitForSelector(()=>{
		let clickMore1 = document.querySelector('span.linked-form__field-shower-text');
		setTimeout(()=>{	clickMore1.click();}, 1000)
	}, 'span.linked-form__field-shower-text')

	waitForSelector(()=>{
		let clickMore2 = document.querySelector('.linked-form__field:nth-child(39) .linked-form__field-shower-text');
		setTimeout(()=>{	clickMore2.click();}, 1000)
	}, '.linked-form__field:nth-child(39) .linked-form__field-shower-text')
}
/////// Клик по кнопке ЕЩЕ
