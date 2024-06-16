Ref 
- [[Dynamic import]]
- https://ko.vitejs.dev/guide/features

[[glob imports]]와 마찬가지로 vite는 변수를 사용한 동적인 import도 지원한다

```js
const module = await import(`./dir/${file}.js`)
```

>[!warning] 주의
>변수 `file` 는 깊이가 1인 파일에 대해서만 나타낼 수 있다.

