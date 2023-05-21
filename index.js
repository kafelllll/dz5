const { text } = require('body-parser'); // обработка анализ текстовых данных
const fs = require('fs')  // читать и записывать файлы, создавать и удалять директории и тд.

const scenario = fs.readFileSync('./scenario.txt', (err, data) => { // содержимое файла доступно в сценарио
    if (err) {
      console.error(err); // если произошла ошибка она выводится в консоль 
      return;
    } 
    console.log(data); 
})
const resultNames = scenario.toString(); // спреобразует содержимое в строку и сохраняется в переменную 
const results_1 = resultNames.match(/^[a-z]+:/gmi); // использует регулярное выражение для поиска и извлечения строк

const resultText = scenario.toString();
const results_2 = resultText.match(/[a-z]+.+[?,;.:!]/gmi);

const charachters = [];  // объявляет пустой массив для хранения значений 
const charachtersSpeeches = []; // тоже что и выше

results_1.forEach(characterName => { // массив строк, содержащих имена персонажей
 const name = characterName.slice(0, -1) // удаляет последний символ из каждого элемента массива
    if (!charachters.includes(name)) {
      charachters.push(name); // если значение не содержится в массиве, то добавляет его в конец массива
    }
})

for(let num = 0; num < charachters.length; num += 1) {
  charachtersSpeeches[num] = ''; // присваивает пустую строку элементу с соответствующим индексом в массиве 
}

results_2.forEach(texts => { массив строк содержащих текст 
  let result = texts.match(/^[a-z]+:/gmi);
  let notArray = result[0] // создает переменную и присваивает ей значение первого элемента массива
  let resSlice = notArray.slice(0, -1);

  for(let i = 0; i < charachters.length; i++) {
    if(resSlice === charachters[i]) {
      const textSlice = texts.slice(charachters[i].length + 2)
      charachtersSpeeches[i] += textSlice;
      charachtersSpeeches[i] += ' \n'; // добавляет пробел и перенос строки//
    }
  }
})

console.log(charachters);

for(let num = 0; num < charachters.length; num += 1) {
  fs.writeFileSync(`${charachters[num]}.txt`, charachtersSpeeches[num]) // запись содержимого каждого элемента массива в соответствующий файл
}