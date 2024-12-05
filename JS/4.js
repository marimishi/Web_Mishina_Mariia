function twoSum(nums, target) {
    const indicesMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (indicesMap.has(complement)) {
            return [indicesMap.get(complement), i];
        }

        indicesMap.set(nums[i], i);
    }

    return [];
}

const nums = [2, 7, 11, 15];
const target = 9;

const result = twoSum(nums, target);
console.log(result); // [0, 1]
