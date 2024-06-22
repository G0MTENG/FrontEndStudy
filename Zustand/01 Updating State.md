### Flat updates

제공된 `set` 함수를 호출하여 새로운 state를 전달하면, Store에 있는 기존 state와 shallow하게 merge된다. 

참고 : [[Shallow Copy vs Deep Copy]]

```tsx
import { create } from 'zustand'

type Name = {
	firstName: string
	lastName: string
}

type Action = {
	updateFirstName: (firstName: Name['firstName']) => void
	updateLastName: (lastName: Name['lastName']) => void
}

const useNameState = create<Name & Action>((set) => ({
	firstName: '',
	lastName: '',
	updateFirstName: (firstName) => set(() => ({firstName: firstName})),
	updateLastName: (lastName) => set(() => ({lastName: lastName}))
}))

function MyName() {
	const firstName = useNameState((state) => state.firstName)
	const lastName = useNameState((state) => state.lastName)

	const updateFirstName = useNameState((state) => state.updateFirstName)
	const updateLastName = useNameState((state) => state.updateLastName)

	return (
		<>
			<div>firstName: {firstName}</div>
			<div>lastName: {lastName}</div>
			<label>
				first name
			<input onChange={(e) => updateFirstName(e.currentTarget.value)}/>
			</label>
			<label>
				last name
			<input onChange={(e) => updateLastName(e.currentTarget.value)}/>
			</label>
		</>
	)
}
```

### Deeply nested object

```ts
type State = {
	deep: {
		nested: {
			obj: {count: number}
		}
	}
}
```

다음과 같은 객체의 counter를 증가한다고 하면 다음과 같이 함수를 만들어야 합니다.

```ts
increase: () => set((state) => {
	deep: {
		...state.deep,
		nested: {
			...state.deep.nested,
			obj: {
				...state.deep.nested.obj,
				count: state.deep.nested.obj.count + 1
			}
		}
	}
})
```

### With Immer

```ts
increase: () => set(produce((state: State) => { ++state.deep.nested.obj.count}))
```

[[02 Immutable state and merging]]
