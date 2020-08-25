const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const successContainer = document.querySelector('.success-container');
const loader = document.getElementById('loading');
const prevBtn = document.getElementById('return-btn');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;

    setTimeout(() => {
        formControl.className = 'form-control'
        small.innerText = ''
    }, 2000)
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.add('success')

    setTimeout(() => {
        formControl.classList.remove('success')
    }, 3000)
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);

            form.style.display = 'block'
            successContainer.style.display = 'none';
        } else {
            showSuccess(input);
        }
    });
}


function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

const submitForm = () => {
    setTimeout(() => {
        form.style.display = 'none';
        successContainer.style.display = 'none'
        loader.style.display = 'flex'

        setTimeout(() => {
            form.style.display = 'none';
            successContainer.style.display = 'flex'
            loader.style.display = 'none'
        }, 3000)
    }, 100)
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
        form.style.display = 'block'
        successContainer.style.display = 'none';
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (username !== '' && username.value.length > 3 && username.value.length <= 15 && re.test(email.value.trim()) && password.value === password2.value) {
        submitForm();
    }
});


prevBtn.addEventListener('click', () => {
    form.style.display = 'block';
    successContainer.style.display = 'none'
    loader.style.display = 'none';
    username.value = ''
    email.value = ''
    password.value = ''
    password2.value = ''
})
