Store의 property 혹은 action을 사용할 때는 Selector를 사용하는 것을 추천한다. Store의 데이터를 다음과 같이 접근할 수 있습니다.

```js
const bears = useBearStore((state) => state.bears)
```

하지만, 이렇게 작성하는 것은 지루할 수 있습니다. 만약, 이렇게 짠다면, auto-generate으로 selector를 생성할 수 있습니다.

### create the following function `createSelectors`

```ts
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T} ? S & { use: { [K in keyof T]: () => T[K]}} : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
	_store: S,
) => {
	let store = _store as WithSelectors<typeof _store>
	store.use = {}
	for (let k of Object.keys(store.getState())) {
		;(store.use as any)[k] = () => store((s) => s[k as key of typeof s])
	}

	return store
}
```

Store가 다음과 같이 생겼다고 가정한다.

```ts
interface BearState {
	bears: number
	increase: (by: number) => void
	increment: () => void
}

const useBearStoreBase = create<BearState>()((set) => ({
	bears: 0,
	increase: (by) => set((state) => ({bears: state.bears + by})),
	increment: () => set((state) => ({bears: state.bears + 1})),
}))
```

Store에 접근하기 위해 다음과 같이 할 수 있다.

```ts
const useBearStore = createSelectors(useBearStoreBase)
```

Selector가 자동으로 만들어지고, 바로 접근할 수 있다.

```ts
const bears = useBearStore.use.bears()

const increment = useBearStore.use.increment()
```

[[05 Practice with no store actions]]