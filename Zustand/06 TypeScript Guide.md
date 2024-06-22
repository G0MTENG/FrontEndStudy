TypeScript랑 다른 점은 `{js}create( ... )`에서 `{ts}create<T>() (...)` 로 바뀐다는 것이다.

```ts
import { create } from 'zustand'

interface BearState {
	bears: number
	increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => {
	bears: 0,
	increase: (by) => set((state) => ({bears: state.bears + by}))
})
```

왜 초기 상태에서 간단히 타입을 추론할 수 없을까 ?

```ts
declare const create: <T>(f: (get: () => T) => T) => T

const x = create((get) => ({
  foo: 0,
  bar: () => get(),
}))
```

코드를 하나씩 보면 `declare` 를 통해 함수 `create` 를 선언한다. 제네릭 T를 받고, 인자 f를 받으면 T를 반환하는 함수이다.

`{ts}f: (get: () => T) => T`  인자 `f` 는 `get` 이라는 인자를 받으며 T를 반환하며, `get` 이라는 인자는 인자를 받지않고, T를 반환하는 함수이다.

위 예제에서 T는 { foo: number, bar: () => T} 형태로 추론될 수 있다. 하지만, bar를 보면 return type이 T이다. 즉, 공변성과 반공변성을 동시에 가지고 있기 때문에 타입을 추론할 수 없는 것이다.

### Using middleware

타입스크립트에서 미들웨어를 사용하기 위해 특별한 작업을 할 필요는 없다.

```ts
interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      { name: 'bearStore' },
    ),
  ),
)
```

혹은

```ts
interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      { name: 'bearStore' },
    ),
  ),
)
```

>[!note]
>devtools는 가능한 뒤쪽에 놓는 것이 좋다
>[이유](https://docs.pmnd.rs/zustand/guides/typescript)

[About middleware](https://docs.pmnd.rs/zustand/guides/testing)

