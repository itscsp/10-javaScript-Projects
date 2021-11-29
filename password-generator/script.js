const pwEl = document.getElementById('pwEl');
const copy = document.getElementById('copybtn');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const number = document.getElementById('number');
const symbol = document.getElementById('symbol');
const generateEl = document.getElementById('generate');
const lenEl = document.getElementById('length');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTVUWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstvuwxyz';

const numbers = '0123456789';

const symbols = "!@#$%^&*()_+':;?,.";

function getLowercase(){
	return lowerLetters [Math.floor(Math.random() * lowerLetters.length)]
}

function getUppercase(){
	return upperLetters [Math.floor(Math.random() * upperLetters.length)]
}

function getNumber(){
	return numbers[Math.floor(Math.random() * numbers.length)]
}

function getSymbol(){
	return symbols[Math.floor(Math.random() * symbols.length)]
}

function generatePassword(){
	const len = lenEl.value;
	
	if(len < 6 || len > 40){
		alert('Password length must be more than 6 and less than 40')
		lenEl.value = 0
		return '';
	}
	
	let password = '';
	
if(upper.checked || lower.checked || number.checked || symbol.checked){
	for(let i = 0; i<len; i++){
			const x = generateX();
			password += x;
	}
}else{
	alert('Plese Check some option')
	return '';
}
	
	
	pwEl.innerText = password;
}

function generateX(){
	const xs = [];
	if(upper.checked){
		xs.push(getUppercase());
	}
	
	if(lower.checked){
		xs.push(getLowercase());
	}
	
	if(number.checked){
		xs.push(getNumber());
	}
	if(symbol.checked){
		xs.push(getSymbol());
	}
	return xs[Math.floor(Math.random() * xs.length)];
}


generateEl.addEventListener('click', generatePassword);

copy.addEventListener('click', () => {
	 const textarea = document.createElement('textarea');
	 
	 const password = pwEl.innerText;
	 if(!password){return;}
	 
	 textarea.value = password;
	 document.body.appendChild(textarea);
	 textarea.select();
	 document.execCommand('copy');
	 textarea.remove();
	 alert('Password copied to clipboard')
})