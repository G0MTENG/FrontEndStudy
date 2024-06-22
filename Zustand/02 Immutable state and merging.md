React의 useState와 같이 immutable하게 업데이트된다.

Example )

```js
import { create } from 'zustand'

const useCountStore = create((set) => ({
	count: 0,
	inc: () => set((state) => ({ count: state.count + 1})),
}))
```

`set` 함수는 store에 state를 업데이트한다. state는 immutable이기 때문에, 다음과 같이 해야한다.

```js
set((state) => ({ ...state, count: state.count + 1}))
```

하지만, 이는 일반적인 패턴이기 때문에 `set` 은 실제로 state를 merge한다. 그래서 `{js}...state` 를 생략할 수 있다.

```js
set((state) => ({ count: state.count + 1}))
```

### Nested objects

`set` 함수는 한 단계만 state를 merge한다. 때문에 만약 중첩 객체라면, 명시적으로 merge해줘야 한다.

```js
import { create } from 'zustand'

const useCountStore = create((set) => ({
	nested: { count: 0 },
	inc: () => ({
		nested: { ...state.nested, count: state.nested.count + 1 }
	})
}))
```

이런 경우, immer같은 라이브러리 사용하면 된다.

### Replace flag

merge하는 것을 비활성화하고 싶다면, `set` 함수에서 `replace` 를 명시적으로 값을 bool값을 주면 된다.

```js
set((state) => newState, true)
```

[[03 Flux inspired practice]]