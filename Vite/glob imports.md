__Reference__
https://ko.vitejs.dev/guide/features

### glob

Vite에서 glob import
`{js}import.meta.glob` 함수를 이용하여 ==여러 모듈==을 한 번에 가져올 수 있다.

```js
const modules = import.meta.glob('./dir/*.js')
```

위 코드를 vite를 이용하여 다음과 같이 작성할 수 있다

```js
const modules = {
	'./dir/foo.js': () => import('.dir/foo.js'),
	'./dir/bar.js': () => import('./dir/bar.js')
}
```

modules 객체에는 import를 호출하는 함수가 들어있으며, 이 함수들이 호출될 때마다 import가 실행되고, 그 결과로 Promise 객체가 반환된다.

더 자세히 알아보기 
- [[Dynamic import]]
- [[Promise]]

```js
for (const path in modules)
{
	modules[path]().then((mod) => {
		console.log(path, mod)
	})
}
```

### glob 패턴 배열

첫 번째 인자는 Glob 패턴의 배열로 전달할 수 있다.

```js
const modules = import.meta.glob(['./dir/*js', './another/*.js'])
```

만약, 일부 파일을 무시하고자 한다면, `!` 접두사를 이용해 네거티브 Glob 패턴을 나타낼 수도 있다.

```js
const modules = import.meta.glob(['./dir/*js', '!**bar.js'])
```

> [!Danger] 주의사항
> 이 기능들은 Vite에서 제공하는 기능이다.
> Glob 패턴 사용 시 지정된 경로만을 이용해야 한다
> `{js}import.meta.glob` 으로 전달되는 모든 인자는 리터럴 값을 전달해야 한다. 변수나 표현식을 사용할 수 없다.
