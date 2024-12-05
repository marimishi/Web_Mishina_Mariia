function longestCommonSuffix(strs) {
    if (!strs.length) return "";

    const minLen = Math.min(...strs.map(str => str.length));

    let suffix = "";

    for (let i = 1; i <= minLen; i++) {
        const char = strs[0][strs[0].length - i];

        if (strs.every(str => str[str.length - i] === char)) {
            suffix = char + suffix;
        } else {
            break;
        }
    }

    return suffix.length >= 2 ? suffix : "";
}

const strs1 = ["цветок", "поток", "хлопок"];
console.log(longestCommonSuffix(strs1)); // "ок"

const strs2 = ["собака", "гоночная машина", "машина"];
console.log(longestCommonSuffix(strs2)); // ""
