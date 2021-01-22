let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function (event) {
	event.preventDefault();
	menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');




const listUsers = [
	{
		id: '01',
		email: 'rasul.surname@yandex.ru',
		password: '123',
		displayName: 'Rasul'
	},
	{
		id: '02',
		email: 'maga@yandex.ru',
		password: '321',
		displayName: 'Maga'
	},
];

const setUsers = {
	user: null,
	logIn(email, password, handler) {
		const user = this.getUser(email);
		if (user && user.password === password) {
			this.authorizedUser(user);
			handler();
		} else {
			alert('Пользователь с такимим данными не найден')
		}
		// console.log(email, password)
	},
	logOut() {
		console.log('выход')
	},
	SignUp(email, password, handler) {
		if (!this.getUser(email)) {
			const user = { email, password, displayName: email }
			listUsers.push(user);
			this.authorizedUser(user);
			handler();
		} else {
			alert('Users ushe zaregistrirovan')
		}
	},
	getUser(email) {
		let user = null;
		for (let i = 0; i < listUsers.length; i++) {
			if (listUsers[i].email === email) {
				user = listUsers[i];
				break;
			}
		}
		return user;
	},
	authorizedUser(user) {
		this.user = user;
	}

};


const toggleAuthDom = () => {
	const user = setUsers.user;
	console.log('user: ', user);

	if (user) {
		loginElem.style.display = 'none';
		userElem.style.display = '';
		userNameElem.textContent = user.displayName;
	} else {
		loginElem.style.display = '';
		userElem.style.display = 'none';
	}
};



loginForm.addEventListener('submit', event => {
	event.preventDefault();

	const emailValue = emailInput.value;
	const passwordValue = passwordInput.value;

	setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
	// toggleAuthDom();
});

loginSignup.addEventListener('click', event => {
	event.preventDefault();

	const emailValue = emailInput.value;
	const passwordValue = passwordInput.value;

	setUsers.SignUp(emailValue, passwordValue, toggleAuthDom);
	// toggleAuthDom();
})


toggleAuthDom();