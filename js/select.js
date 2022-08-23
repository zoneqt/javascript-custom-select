export default class Select {
    constructor(element) {
        this.element = element;
        this.options = getFormattedOptions(element.querySelectorAll('option'));
        this.customElement = document.createElement('div');
        this.labelElement = document.createElement('span');
        this.labelElementTxt = document.createElement('span');
        this.labelElementIcn = document.createElement('span');
        this.optionsCustomElement = document.createElement('ul');

        setupCustomElement(this);
        element.style.display = 'none';
        element.after(this.customElement);
    }

    get selectedOption() {
        return this.options.find(option => option.selected);
    }

    selectValue(value) {
        const newSelectedOption = this.options.find(option => {
            return option.value === value;
        });

        const previousSelectedOption = this.selectedOption;
        previousSelectedOption.selected = false;
        previousSelectedOption.element.selected = false;

        newSelectedOption.selected = true;
        newSelectedOption.element.selected = true;

        this.labelElementTxt.innerText = newSelectedOption.label;

        this.optionsCustomElement.querySelector(`[data-value="${previousSelectedOption.value}"]`).classList.remove('selected');
        this.optionsCustomElement.querySelector(`[data-value="${newSelectedOption.value}"]`).classList.add('selected');

    }
}

const arrowSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>';

function setupCustomElement(select) {
    select.customElement.classList.add('custom-select-container');
    select.customElement.tabIndex = 0;

    select.labelElement.classList.add('custom-select-value');
    select.labelElement.append(select.labelElementTxt);
    select.labelElementIcn.insertAdjacentHTML('beforeend', `${arrowSvg}`);
    console.log(select.labelElementIcn);
    select.labelElement.append(select.labelElementTxt); 
    select.labelElement.appendChild(select.labelElementIcn); 
    select.labelElementTxt.innerText = select.selectedOption.label;

    select.optionsCustomElement.classList.add('custom-select-options');

    select.options.forEach(option => {
        const optionElement = document.createElement('li');

        optionElement.classList.add('custom-select-option');
        optionElement.classList.toggle('selected', option.selected); // toggle class selected if option is selected
        optionElement.innerText = option.label;
        optionElement.dataset.value = option.value;


        optionElement.addEventListener('click', () => {
            select.selectedOption.element.classList.remove('selected');
            select.selectValue(option.value);
            select.optionsCustomElement.classList.remove('show');
        });

        select.optionsCustomElement.append(optionElement);
    });

    //append to container
    select.customElement.append(select.labelElement);
    select.customElement.append(select.optionsCustomElement);


    select.labelElement.addEventListener('click', () => {
        select.optionsCustomElement.classList.toggle('show');
    });

    select.customElement.addEventListener("blur", () => {
        select.optionsCustomElement.classList.remove("show")
      })
}


function getFormattedOptions(optionElements) {
    return [...optionElements].map(optionElement => {
        return {
            value: optionElement.value,
            label: optionElement.label,
            selected: optionElement.selected,
            element: optionElement
        }
    });
}