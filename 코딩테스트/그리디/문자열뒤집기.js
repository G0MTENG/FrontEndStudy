// 백준 1439
let input = require('fs').readFileSync('/dev/stdin').toString().trim()

const arr = []

let cri = input[0]
let str = ''

for (let i = 0; i < input.length; ++i) {
    let s = input[i]
    if (cri === input[i]) {
        str += s
    } else {
        cri = s
        arr.push(str)
        str = s
    }
}
arr.push(str)

let [z, o] = [0, 0]
for (let i = 0; i < arr.length; ++i) {
    if (arr[i][0] === '0') {
        z++
    } else [o++]
}

if (z >= o) {
    console.log(o)
} else {
    console.log(z)
}
