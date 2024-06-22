// INPUT DATA
const num = 5
let input = [2, 3, 1, 2, 2]

input = input.sort((a, b) => a - b)

let result = 0
while (input.length) {
    let cri = input.pop()
    if (input.length < cri - 1) {
        break
    } else {
        for (let i = 0; i < cri - 1; ++i) {
            input.shift()
        }
    }
    result++
}

console.log(result)
