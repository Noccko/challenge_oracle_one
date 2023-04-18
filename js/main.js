const textareaInput = document.querySelector('#textarea');
const btnEncrypt = document.querySelector('#btn-encrypt');
const btnDecrypt = document.querySelector('#btn-decrypt');
const sectionOutput = document.getElementById('section-output');

const replacements = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat',
};

const vowelsRegex = /[aeiou]/g;
const substitutionsRegex = /(ai|enter|imes|ober|ufat)/g;
const invertedSubstitutions = Object.entries(replacements).reduce((acc, [vowel, substitution]) => {
  acc[substitution] = vowel;
  return acc;
}, {});

const textareaOutput = document.createElement('textarea');
textareaOutput.id = 'text-result';
sectionOutput.appendChild(textareaOutput);

const btnCopy = document.createElement('button');
btnCopy.classList.add('btn-general');
btnCopy.id = 'btn-copy';
btnCopy.type = 'submit';
btnCopy.textContent = 'Copiar';
sectionOutput.appendChild(btnCopy);

const displayResult = str => {
  if (str.length === 0) return;
  textareaOutput.value = str;
};

const replaceVowels = (event, str) => {
  if (event.target === btnEncrypt) {
    return str.replace(vowelsRegex, match => replacements[match]);
  }

  if (event.target === btnDecrypt) {
    return str.replace(substitutionsRegex, match => invertedSubstitutions[match]);
  }
};

const changeText = (strTemporary, strOriginal, btn) => {
  if (textareaInput.value === '') {
    textareaInput.placeholder = 'Primeiro digite seu texto aqui';
    return;
  }
  btn.textContent = strTemporary;
  setTimeout(() => {
    btn.textContent = strOriginal;
  }, 1500);
};

const copyContent = () => {
  const text = textareaOutput.value;
  const elementTemporary = document.createElement('textarea');
  elementTemporary.value = text;
  document.body.appendChild(elementTemporary);
  elementTemporary.select();
  document.execCommand('copy');
  document.body.removeChild(elementTemporary);
  changeText('Copiado', 'Copiar', btnCopy);
};

const encrypt = event => {
  const str = textareaInput.value.toLowerCase();
  const newStr = replaceVowels(event, str);
  displayResult(newStr);
  changeText('Criptografado', 'Criptografar', btnEncrypt);
};

const decrypt = event => {
  const str = textareaInput.value;
  const newStr = replaceVowels(event, str);
  displayResult(newStr);
  changeText('Descriptografado', 'Descriptografar', btnDecrypt);
};

btnEncrypt.addEventListener('click', encrypt);
btnDecrypt.addEventListener('click', decrypt);
btnCopy.addEventListener('click', copyContent);
