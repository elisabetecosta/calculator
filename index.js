'use strict';

// Selects DOM elements
const main = document.querySelector('main');
const root = document.querySelector(':root');
const input = document.getElementById('input');
const resultInput = document.getElementById('result');

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

// Selects the calculator buttons
const charKeyBtns = document.querySelectorAll('.charKey');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');

// Selects the themeSwitcher and copyToClipboard buttons
const themeSwitcherBtn = document.getElementById('themeSwitcher');
const copyToClipboardBtn = document.getElementById('copyToClipboard');


input.addEventListener('keydown', function (e) {

    e.preventDefault();

    if (allowedKeys.includes(e.key)) {
        input.value += e.key;
        return;
    }

    if (e.key === 'Backspace') {

        input.value = input.value.slice(0, -1);
    }

    if (e.key === 'Enter') {

        calculate();
    }
});

charKeyBtns.forEach(charKeyBtn => {

    charKeyBtn.addEventListener('click', () => {

        const value = charKeyBtn.dataset.value;
        input.value += value;
    });
});

clearBtn.addEventListener('click', () => {

    input.value = '';
    input.focus();
});

equalBtn.addEventListener('click', calculate);

themeSwitcherBtn.addEventListener('click', () => {

    if (main.dataset.theme === 'dark') {

        root.style.setProperty('--bg-color', '#f1f5f9');
        root.style.setProperty('--border-color', '#aaa');
        root.style.setProperty('--font-color', '#212529');
        root.style.setProperty('--primary-color', '#009F6B');
        
        main.dataset.theme = 'light';

    } else {

        root.style.setProperty('--bg-color', '#212529');
        root.style.setProperty('--border-color', '#666');
        root.style.setProperty('--font-color', '#f1f5f9');
        root.style.setProperty('--primary-color', '#4dff91');

        main.dataset.theme = 'dark';
    }
});

copyToClipboardBtn.addEventListener('click', function (e) {

    const button = e.currentTarget;

    if (button.innerText === 'Copy') {

        button.innerText = 'Copied';
        button.classList.add('success');

        window.navigator.clipboard.writeText(resultInput.value);

    } else {

        button.innerText = 'Copy';
        button.classList.remove('success');
    }
});


function calculate() {

    resultInput.value = 'ERROR';
    resultInput.classList.add('error');

    const result = eval(input.value);

    resultInput.value = result;

    resultInput.classList.remove('error');

    if (input.value === '') {

        resultInput.value = '';
    }
}