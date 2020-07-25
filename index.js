const login_section = document.querySelector('.login-section')

const signup_section = document.querySelector('.signup-section')

const loginForm = document.querySelector('.login-form')
const signupForm = document.querySelector('.signup-form')

const loginEmailTag = document.getElementById('login-email-id')
const loginPasswordTag = document.getElementById('login-password')

const signupEmailTag = document.getElementById('signup-email-id')
const signupPasswordTag = document.getElementById('signup-password')

const confirmPasswordTag = document.getElementById('c-password')
const mobileNoTag = document.getElementById('mob-no')

let emailIsDirty = false
let passwordIsDirty = false

const login = () => {
	signup_section.classList.add('hide')
	login_section.classList.remove('hide')
}

const signup = () => {
	login_section.classList.add('hide')
	signup_section.classList.remove('hide')
}

const checkEmailValidity = (email) => {
	if (email.includes('@')) {
		let atInd = email.indexOf('@')
		if (email.substring(atInd).includes('.')) return true
		else false
	} else {
		return false
	}
}

const checkPasswordValidity = (pass) => {
	if (pass.length > 3 && pass.length < 12) {
		return true
	} else return false
}

const checkPasswordMatch = (pass) => {
	return pass === passwordTag.value
}

const checkMobileNoValidity = (num) => {
	return num.length === 10 && +num !== NaN
}

const tags = {
	loginEmailTag: loginEmailTag,
	loginPasswordTag: loginPasswordTag,
	signupEmailTag: signupEmailTag,
	signupPasswordTag: signupPasswordTag,
	confirmPasswordTag: confirmPasswordTag,
	mobileNoTag: mobileNoTag,
}

const validators = {
	loginEmailTag: checkEmailValidity,
	loginPasswordTag: checkPasswordValidity,
	signupEmailTag: checkEmailValidity,
	signupPasswordTag: checkPasswordValidity,
	confirmPasswordTag: checkPasswordMatch,
	mobileNoTag: checkMobileNoValidity,
}

const isDirty = {
	loginEmailTag: false,
	loginPasswordTag: false,
	signupEmailTag: false,
	signupPasswordTag: false,
	confirmPasswordTag: false,
	mobileNoTag: false,
}

const validateTag = (tagString) => {
	const tag = tags[tagString]
	const checker = validators[tagString]

	if (tag.validity.valid && checker(tag.value)) {
		tag.classList.remove('error')
		tag.classList.add('valid')
		tag.nextElementSibling.classList.remove('show')
	} else {
		if (!tag.classList.contains('error')) {
			tag.classList.add('error')
			tag.classList.remove('valid')
			tag.nextElementSibling.classList.add('show')
		}
	}
}

let tagEventListeners = (tagString) => {
	const tag = tags[tagString]

	tag.addEventListener('input', (e) => {
		if (isDirty[tagString]) validateTag(tagString)
	})

	tag.addEventListener('focusout', (e) => {
		validateTag(tagString)
		isDirty[tagString] = true
	})
}

let submitValidator = (tagString, e) => {
	const tag = tags[tagString]

	const validator = validators[tagString]

	if (!tag.validity.valid || !validator(tag.value)) {
		tag.classList.add('error')
		e.preventDefault()
	}
}

tagEventListeners('loginEmailTag')
tagEventListeners('loginPasswordTag')
tagEventListeners('signupEmailTag')
tagEventListeners('signupPasswordTag')
tagEventListeners('confirmPasswordTag')
tagEventListeners('mobileNoTag')

loginForm.addEventListener('submit', (e) => {
	submitValidator('loginEmailTag', e)
	submitValidator('passwordTag', e)
})

signupForm.addEventListener('submit', (e) => {
	submitValidator('signupEmailTag', e)
	submitValidator('signupPasswordTag', e)
	submitValidator('confirmPasswordTag', e)
	submitValidator('mobileNoTag', e)
})
