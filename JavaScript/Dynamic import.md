Ref
- [동적으로 불러오기 velog](https://velog.io/@wlwl99/%EB%8F%99%EC%A0%81-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0-Dynamic-import)
- [mdn import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)

### Dynamic import란 ?

코드 실행 중에 모듈을 동적으로 불러오는 것

import() method를 이용하여 동적으로 import를 할 수 있다.

### import()

```js
import(moduleName)
```

Parameter

`{js}moduleName`

import할 모듈로 호스트가 지정하지만, 정적 import와 동일한 알고리즘을 따른다.

return value : Promise

- 참조된 모듈이 로드되고 success라면, ==module namespace object==를 수행한다.
- 존재하지 않는 모듈을 참조하는 경우 error

module namespace object에 관한 설명은 밑에

##### Example

```js
import('./someModule.js').then(module => {
	console.log(module)
}).catch(err => {
	console.log(err)
})
```


```js
import something from "somewhere"
```

만약, 다음과 같이 정적으로 import할 시 모듈이 로드될 때 항상 evaluate된다.

evaluate?
import를 할 시 해당 모듈의 코드가 실행되고, export된 값이나 기능이 사용할 준비가 됐는지 "평가"를 하게 된다.

따라서 정적으로 import 하게 되면 코드 로딩 속도가 느려지며, 프로그램의 메모리 사용량이 증가될 수 있다. 또한, 로드 시점에 모듈이 존재하지 않는 오류를 방지할 수도 있다.

>[!warning] 주의
>위의 이점들이 존재하지만, 동적 import는 ==필요한 경우==에만 사용해야 한다. static form은 초기 종속성을 로드하는 데 더 적합하다. 또한, 모든 실행 컨텍스트에서 동작하는 것도 아니다. service worker 도는 worklet에서 호출하면 throw된다.

module namespace object란?

모듈의 모든 export를 설명하는 객체이다. 모듈이 평가될 때 생성되는 정적 객체로, static import 또는 dynamic import를 통해 얻을 수 있다.

### Example

```js title:"data.js"
const data = { name: '철수', age: 20}
export { data }
```

```js title:"main.js"
async function getData(name) {
	if (name == 'Admin') {
		const module = await import('./data.js')
		console.log(module.data)
	} else {
		console.log("you can't enter")
	}
}

const UserName = 'Admin'
getData(UserName)
```

```json title:"result"
{ name: '철수', age: 20 }
```



