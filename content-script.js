// Имя менеджера
const nameManager = 'Андрей Бородин';

// Карточка ЛИДа
const cardProduct = document.querySelector('#card_holder');

// Значение дисплея ЛИДа
let displayValue;

/////// Обновление страницы и проверка, на странице лида мы находимся ли
window.addEventListener('load', function() {
	// Получаем вычисленные стили
	const computedStyles = window.getComputedStyle(cardProduct);

	// Получаем значение свойства display
	displayValue = computedStyles.getPropertyValue('display');

	if(displayValue=='flex'){
		waitFullLoadPage();
		hideElements();
		clickMore();
	}
});
/////// Обновление страницы и проверка, на странице лида мы находимся ли


/////// Отслеживание захода в ЛИД по табам
// Функция, которая будет вызываться при изменении стиля
function handleStyleChange(mutationsList) {
	// Перебор каждой мутации в списке 
  for (const mutation of mutationsList) {
		// проверяет, является ли текущая мутация изменением атрибута, 
		// и если да, проверяет, является ли этот атрибут атрибутом style.
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
			// Эта строка получает вычисленные (реальные) стили элемента cardProduct
      const computedStyle = window.getComputedStyle(cardProduct);
			// для получения значения свойства display из вычисленных стилей элемента.
      displayValue = computedStyle.getPropertyValue('display');

      if(displayValue=='flex'){
				waitFullLoadPage();
				hideElements()
				clickMore();
			} 
    }
  }
}

// новый экземпляр MutationObserver, 
// который будет отслеживать изменения. 
// Конструктор принимает функцию handleStyleChange 
// в качестве колбэка, которая будет вызываться при каждом изменении.
const observerLead = new MutationObserver(handleStyleChange);

// начинает отслеживание изменений для cardProduct. 
// Мы указываем, что нам нужно отслеживать изменения 
// атрибутов (attributes: true), и фильтруем только изменения атрибута style.
observerLead.observe(cardProduct, { attributes: true, attributeFilter: ['style'] });
/////// Отслеживание захода в ЛИД по табам

/////// Проверка подгрузки всех элемнетов страницы
function waitFullLoadPage() {
	const checkLoadInterval = setInterval(() => {
			const lastElement = document.querySelectorAll('.linked-form__field.linked-form__field-select')[2];

			if (lastElement !== null) {
					const lastElementStyleHidden = lastElement.classList.contains('hidden');

					if (lastElementStyleHidden) {
							addButtonTake();
							clearInterval(checkLoadInterval);
					}
			}
	}, 500);
}
/////// Проверка подгрузки всех элемнетов страницы


/////// Добавление кнопки для взятия в работу
function addButtonTake(){

	// Кнопка, которая появляется
	let myButton;

	const elementBeforeInsert = document.querySelector('.card-entity-form__main-fields.js-card-main-fields');
		const root = document.createElement('div');
	const shadowRoot = root.attachShadow({mode: 'open'});
	
	const cssUrl = chrome.runtime.getURL('content-script.css');
	
	shadowRoot.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>`
	
	myButton = document.createElement('button');
	myButton.innerText = 'Взять в работу';
	myButton.type = 'button';
	
	shadowRoot.prepend(myButton);
	elementBeforeInsert.prepend(root);

	///////// Функционал кнопки
	myButton.addEventListener('click', () => {
    //// Галочки по продуктам
    waitForSelector(() => {
      const productsMain = document.querySelector(
        ".linked-forms__group-wrapper:nth-child(4) > .linked-form__field:nth-child(20) .checkboxes_dropdown__title-selected"
      );
      productsMain.click();
    }, ".linked-forms__group-wrapper:nth-child(4) > .linked-form__field:nth-child(20) .checkboxes_dropdown__title-selected");

    const textCheckBoxMain = "Выбрать всё";

    waitForSelector(
      checkProducts,
      ".control-checkbox__text.element__text.js-select-all-text.checkboxes_dropdown__label_title.checkboxes_dropdown__label_title-not_active"
    );

    function checkProducts() {
      waitForSelector(() => {
        let mainCheckText = document
          .querySelector(
            ".cf_select_search .checkboxes_dropdown__item:nth-child(1) .control-checkbox__text"
          )
          .innerText.includes(textCheckBoxMain);
        if (mainCheckText) {
          waitForSelector(() => {
            const mainCheckClick = document.querySelector(
              "input#cbx_drop_master_NaN"
            );
            mainCheckClick.click();

            const mainCheckSDDClick = document.querySelector(
              "input#cbx_drop_336659NaN"
            );
            mainCheckSDDClick.click();
          }, "input#cbx_drop_master_NaN");
        }
      }, ".cf_select_search .checkboxes_dropdown__item:nth-child(1) .control-checkbox__text");
    }
    //// Галочки по продуктам

    //// Ответственный ТМК
    waitForSelector(() => {
      let responsibleTMKElementclick = document.querySelector(
        ".linked-form__field:nth-child(1) .fr_resp_name"
      );
      if (responsibleTMKElementclick !== nameManager) {
        responsibleTMKElementclick.click();

        const responsibleTMKElementInput = document.querySelector(
          ".tr_search:nth-child(1)"
        );
        const inputEvent = new Event("input", { bubbles: true });
        responsibleTMKElementInput.value = nameManager;
        responsibleTMKElementInput.dispatchEvent(inputEvent);

        const ResponsibleTMKElementManager = document.querySelector(
          ".group-color-wrapper > .fr_choise-user"
        );
        ResponsibleTMKElementManager.click();
      }
    }, ".linked-form__field:nth-child(1) .fr_resp_name");
    //// Ответственный ТМК

    // Чек тепло или холод
    const heatOrCold = document.querySelector(
      ".pipeline-select-view__pipeline"
    ).innerText;

    //// Вкладка продукты
    const productsElementsClick = document.querySelector(
      ".card-tabs__item:nth-child(5) > .card-tabs__item-inner"
    );
    productsElementsClick.click();

    // Открытие листов продуктов
    function openListsProducts(openTabsButton, flag) {
      if (flag) {
        openTabsButton.click();
      }
    }

    openListsProducts(
      // exp открытие вкладки
      document.querySelector(
        ".turn_field_sub_a:nth-child(2) > .turn_sub_field_title"
      ),
      document
        .querySelector(
          ".linked-forms__group-wrapper:nth-child(10) > .linked-form__field:nth-child(3)"
        )
        .classList.contains("turn_hidden_field")
    );
    openListsProducts(
      // ndd открытие вкладки
      document.querySelector(
        ".linked-form__field:nth-child(24) > .turn_sub_field_title"
      ),
      document
        .querySelector(
          ".linked-forms__group-wrapper:nth-child(10) > .linked-form__field:nth-child(25)"
        )
        .classList.contains("turn_hidden_field")
    );
    openListsProducts(
      // cargo открытие вкладки
      document.querySelector(
        ".linked-form__field:nth-child(72) > .turn_sub_field_title"
      ),
      document
        .querySelector(".linked-form__field:nth-child(73)")
        .classList.contains("turn_hidden_field")
    );

    //Менеджер по продуктам, проставление
    function managerProducts(responsibleProductsСlick) {
      if (responsibleProductsСlick !== nameManager) {
        responsibleProductsСlick.click();

        const responsibleProductsInput = document.querySelector(
          ".tr_search:nth-child(1)"
        );
        const inputEvent = new Event("input", { bubbles: true });
        responsibleProductsInput.value = nameManager;
        responsibleProductsInput.dispatchEvent(inputEvent);

        const manager = document.querySelector(
          ".group-color-wrapper > .fr_choise-user"
        );
        manager.click();
      }
    }

    // Мэнеджер exp
    managerProducts(
      document.querySelector(
        ".linked-forms__group-wrapper:nth-child(10) > .linked-form__field:nth-child(3) .fr_resp_name"
      )
    );
    // Мэнеджер ndd
    managerProducts(
      document.querySelector(".linked-form__field:nth-child(25) .fr_resp_name")
    );
    // Мэнеджер cargo
    managerProducts(
      (responsibleProductsСlick = document.querySelector(
        ".linked-form__field:nth-child(73) .fr_resp_name"
      ))
    );

    //Подэтапы по продуктам, проставление
    function substepProdusts(substepClick, stepSelector) {
      substepClick.click();
      waitForSelector(() => {
        const steps = document.querySelectorAll(stepSelector);
        for (let step of steps) {
          step.click();
        }

        // Чекбоксы в продуктах, если проиграны, то откатываются
        const checkBoxsLost = document.querySelectorAll(
          ".linked-form__field__value > label.control-checkbox.is-checked"
        );
        if (checkBoxsLost != 0) {
          for (checkBoxLost of checkBoxsLost) {
            checkBoxLost.click();
          }
        }

        // Откат причин проигрышей
        // Откат exp
        waitForSelector(() => {
          const reasonLossExp = document.querySelector(
            ".linked-forms__group-wrapper:nth-child(10) > .linked-form__field:nth-child(7) .control--select--button"
          );
          reasonLossExp.click();
          waitForSelector(() => {
            const backReason = document.querySelector(
              ".linked-form__field:nth-child(7) .cf_select_search li:nth-child(1)"
            );
            backReason.click();
          }, ".linked-form__field:nth-child(7) .cf_select_search li:nth-child(1)");
        }, ".linked-forms__group-wrapper:nth-child(10) > .linked-form__field:nth-child(7) .control--select--button");
        // Откат Ndd
        waitForSelector(() => {
          const reasonLossNdd = document.querySelector(
            ".linked-form__field:nth-child(29) .control--select--button"
          );
          reasonLossNdd.click();
          waitForSelector(() => {
            const backReason = document.querySelector(
              ".linked-form__field:nth-child(29) .cf_select_search li:nth-child(1)"
            );
            backReason.click();
          }, ".linked-form__field:nth-child(29) .cf_select_search li:nth-child(1)");
        }, ".linked-form__field:nth-child(29) .control--select--button");
        // Откат Cargo
        waitForSelector(() => {
          const reasonLossCargo = document.querySelector(
            ".linked-form__field:nth-child(77) .control--select--button"
          );
          reasonLossCargo.click();
          waitForSelector(() => {
            const backReason = document.querySelector(
              ".linked-form__field:nth-child(77) .cf_select_search li:nth-child(1)"
            );
            backReason.click();
          }, ".linked-form__field:nth-child(77) .cf_select_search li:nth-child(1)");
        }, ".linked-form__field:nth-child(77) .control--select--button");
      }, ".searched_list_elements > li:nth-child(2)");
    }

    // Подэтапы Взять в работу exp
    setTimeout(() => {
      substepProdusts(
        document.querySelector(
          ".linked-forms__group-wrapper:nth-child(10) > .linked-form__field:nth-child(5) .control--select--button-inner"
        ),
        ".linked-form__field:nth-child(5) .cf_select_search li:nth-child(2)"
      );
      substepProdusts(
        document.querySelector(
          ".linked-form__field:nth-child(27) .control--select--button-inner"
        ),
        ".linked-form__field:nth-child(27) .cf_select_search li:nth-child(2)"
      );
      // Подэтапы Взять в работу cargo
      substepProdusts(
        document.querySelector(
          ".linked-form__field:nth-child(75) .control--select--button-inner"
        ),
        ".linked-form__field:nth-child(75) .cf_select_search li:nth-child(2)"
      );
      saveChanges();
    }, 100);

    // Подэтапы Установить контакт exp
    waitLoadSave(() => {
      substepProdusts(
        document.querySelector(
          ".linked-forms__group-wrapper:nth-child(10) > .linked-form__field:nth-child(5) .control--select--button-inner"
        ),
        ".linked-form__field:nth-child(5) .cf_select_search li:nth-child(3)"
      );
      // if(heatOrCold == 'ПОДКЛЮЧЕНИЕ'){
      // Подэтапы Установить контакт ndd
      substepProdusts(
        document.querySelector(
          ".linked-form__field:nth-child(27) .control--select--button-inner"
        ),
        ".linked-form__field:nth-child(27) .cf_select_search li:nth-child(3)"
      );
      // // Подэтапы Установить контакт sdd
      // substepProdusts(
      // 	document.querySelector('.linked-form__field:nth-child(53) .control--select--button-inner'),
      // 	'.linked-form__field:nth-child(53) .cf_select_search li:nth-child(3)'
      // );
      // Подэтапы Установить контакт cargo
      substepProdusts(
        document.querySelector(
          ".linked-form__field:nth-child(75) .control--select--button-inner"
        ),
        ".linked-form__field:nth-child(75) .cf_select_search li:nth-child(3)"
      );
      // }

      //// Этапы холода и тепла
      if (heatOrCold == "ХОЛОД") {
        const stageLeadCold = document.querySelector(
          ".pipeline-select:nth-child(3) .pipeline-select__dropdown__item:nth-child(2) > .pipeline-select__dropdown__item__label"
        );
        stageLeadCold.click();
      } else if (heatOrCold == "ПОДКЛЮЧЕНИЕ") {
        const stageLeadHeat = document.querySelector(
          ".pipeline-select:nth-child(9) .pipeline-select__dropdown__item:nth-child(2) > .pipeline-select__dropdown__item__label"
        );
        stageLeadHeat.click();
      }
      saveChanges();
    });


  });
	///////// Функционал кнопки
}
/////// Добавление кнопки для взятия в работу

