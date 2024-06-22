let input = '567'

let ans = 0
for (let i = 0; i < input.length; ++i) {
    let n = +input[i]
    if (ans === 0) {
        ans += n
    } else {
        if (n === 0) {
            continue
        } else if (n === 1) {
            ans += n
        } else {
            ans *= n
        }
    }
}

console.log(ans)
