function pickPropArray(array, prop) {
    return array
        .filter(obj => obj.hasOwnProperty(prop)) 
        .map(obj => obj[prop]);
}

const students = [
    { name: '�����', age: 20 },
    { name: '����', age: 20 },
    { name: '����', age: 20 },
    { name: '�����', age: 20 },
    { name: '��������', age: 20 },
    { age: 40 },
];

const result = pickPropArray(students, 'name');

console.log(result);
