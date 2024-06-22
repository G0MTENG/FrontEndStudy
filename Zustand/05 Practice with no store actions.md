action과 state를 같은 store 내에 함께 배치하는 것이 권장된다.

Example )

```ts
export const useBoundStore = create((set) => {
	count: 0,
	text: 'hello',
	inc: () => set((state) => ({count: state.count + 1})),
	setText: (text) => set({text})
})
```

이렇게 하면 데이터와 action이 함께 포함된 독립된 Store가 생성된다.

다른 접근은 Store 외부의 모듈 수준에서 action을 정의하는 것이다.

```ts
export const useBoundStore = create(() => ({
	count: 0,
	text: 'hello'
}))

export const inc = () => useBoundStore.setState((state) => ({count: state.count + 1}))

export const setText = (text) => useBoundStore.setState({text})
```

장점
- action을 호출하는데 hook이 필요하지 않다
- 코드 분할이 용이하다

>[!note]
>이 패턴의 단점은 없지만, 캡슐화된 특성 때문에 일부 사람들은 colocating을 선호할 수 있다.

[[06 TypeScript Guide]]