---

---
작고 빠르며 확장 가능한 __상태 관리 솔루션__ 이다. Zustand는 __훅__ 을 기반으로 하는 편안한 API를 제공한다. 상태 관리를 위해 많은 보일러플레이트 코드가 필요하지 않으며, 특정한 옵션에 얽매이지 않지만 __명시적__ 이고 __Flux-like__ 이다.

- [좀비 자식 문제](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children)
- [React 동시성](https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md)
- [context loss](https://github.com/facebook/react/issues/13332)

작지만, 위의 문제를 해결할 수 있는 유일한 상태 관리자이다.

### 설치

```npm
npm install zustand
```

### Store 생성

Store는 Hook이다 ! primitives, objects, functions 모든 넣을 수 있다. `set` 함수는 state를 merge한다.

```js
import { create } from 'zustand'

const useStore = create((set) => {
	bears: 0,
	increasePopulation: (state) => set((state) => ({ bears: state.bears + 1})),
	removeAllBears: () => set({bears: 0}),
	updateBears: (newBears) => set({ bears: newBears })
})
```

### 컴포넌트에 bind하기

Provider 없이, hook을 어디서나 사용할 수 있다. state를 선택하면 해당 상태를 사용하는 컴포넌트는 그 상태가 변경될 때마다 다시 렌더링된다.

```js
function BearCounter() {
	const bears = userStore((state) => state.bears)
	return <h1>bears: {bears}</h1>
}

function Controls() {
	const increasePopulation = useStore((state) => state.increasePopulation)
	return <button onClick={increasePopulation}>⬆</button>
}
```


[[01 Updating State]]