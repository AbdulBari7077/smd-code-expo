const arr = ['aa', 'ab', 'ca', 'da', 'ea', 'af', 'ga', 'ha', 'ia'];


const result = arr.sort((a, b) => a < b ? -1 : 1);
console.log(result)