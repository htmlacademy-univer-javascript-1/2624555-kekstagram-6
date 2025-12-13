const hoursInMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

const isDuringBusinessHours = (startTime, endTime, startMeeting, durationMeeting) => {
  const startTimeInMinute = hoursInMinutes(startTime);
  const endTimeInMinute = hoursInMinutes(endTime);
  const startMeetingInMinute = hoursInMinutes(startMeeting);
  const endMeetingInMinute = startMeetingInMinute + durationMeeting;
  return (endTimeInMinute - endMeetingInMinute >= 0) && (startMeetingInMinute - startTimeInMinute >= 0);
};

isDuringBusinessHours('08:00', '17:30', '14:00', 90); // true
isDuringBusinessHours('8:0', '10:0', '8:0', 120);     // true
isDuringBusinessHours('08:00', '14:30', '14:00', 90); // false
isDuringBusinessHours('14:00', '17:30', '08:0', 90);  // false
isDuringBusinessHours('8:00', '17:30', '08:00', 900); // false


/*
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

*/


