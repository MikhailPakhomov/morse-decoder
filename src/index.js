const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
    '**********': ' ',
};

function decode(expr) {
    const getArrInTwoBits = (str) => {
      let resultArr = [];
      let start = 0;
      let end = 10;
      let length = str.length;
      let symStart = 0;
      let symEnd = 2;
      let symArr = [];
      let symLength;
      while (length){
        const symStr = str.slice(start, end);
        symLength = symStr.length;
        symStart = 0;
        symEnd = 2;
        symArr = [];
        while(symLength){
          symArr.push(symStr.slice(symStart, symEnd));
          symStart += 2;
          symEnd += 2;
          symLength -= 2;
        }
        resultArr.push(symArr);
        start += 10;
        end += 10;
        length -= 10;
      }
  
      return resultArr;
    }
  
    const filterZero = (arr) => {
      const filteredArr = arr.map(element => {
        return element.filter(item => item !== '00');
      });
      return filteredArr;
    }
    const setDotsAndDashes = (arr) => {
      const resultArr = arr.map(element => {
        const changedArr = element.map(item => {
          if(item === '10') return '.';
          if(item === '11') return '-';
          if(item === '**') return '**'
        })
        return changedArr.join('');
      })
      return resultArr;
    }
  
    const getDecodedPhrase = (arr) => {
      const resultArr = arr.map(element => {
        return MORSE_TABLE[element];
      })
      return resultArr.join('');
    }
  
    const bitArr = getArrInTwoBits(expr);
    const arrWithoutZero = filterZero(bitArr);
    const dotsAndDashes = setDotsAndDashes(arrWithoutZero);
    const decodedPhrase = getDecodedPhrase(dotsAndDashes);
  
    
  
  return decodedPhrase;;
  }

module.exports = {
    decode
}