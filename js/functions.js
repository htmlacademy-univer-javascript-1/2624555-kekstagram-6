//Проверка длины строки
function checkStringLength(srtingForCheck, maxLength) {
  return (srtingForCheck.length <= maxLength);
}

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

//Проверка строки на палиндромность
function checkPalindrome(srtingPalindrome) {
  const normalString = srtingPalindrome.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let index = (normalString).length - 1; index >= 0; index--){
    reverseString += normalString[index];
  }
  return (normalString === reverseString);
}

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');

//доп. задание на вынос числа из строки
function getNumberFromString(inputString) {
  if (typeof inputString !== 'string' && typeof inputString !== 'number') {
    return NaN;
  }
  inputString = String(inputString);
  let numbers = '';
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (char >= '0' && char <= '9') {
      numbers += char;
    }
  }
  if (numbers === '') {
    return NaN;
  }
  return parseInt(numbers, 10);
}

getNumberFromString('2023 год');
getNumberFromString('ECMAScript 2022');
getNumberFromString('1 кефир, 0.5 батона');
getNumberFromString('агент 007');
getNumberFromString('a я томат');
getNumberFromString(2023);
getNumberFromString(-1);
getNumberFromString(1.5);
