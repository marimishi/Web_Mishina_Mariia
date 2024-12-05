function spinWords(sentence) {
    return sentence
        .split(' ')
        .map(word => word.length >= 5 ? word.split('').reverse().join('') : word)
        .join(' ');
}

const result1 = spinWords("������ �� Legacy");
console.log(result1); // ������ �� ycageL

const result2 = spinWords("This is a test");
console.log(result2); // This is a test
