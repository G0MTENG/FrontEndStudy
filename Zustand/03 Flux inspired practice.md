Zustand는 뭔가를 강제하는 라이브러리는 아니지만, 몇 가지 패턴을 추천한다. Redux에서 찾아볼 수 있는 Flux에서 영감을 받았다.

하지만, Zustand는 근본적으로 몇가지가 다르기에 다른 라이브러리들과 완벽하게 용어가 매칭되지 않을 수 있다.

### Recommnanded Patterns

#### single store
Application의 전역 state는 single zustand store에 위치해야 한다.

#### use `set` / `setState` to update the store
store에 값을 업데이터를 할 때는 항상 `set` (or `setState`)를 사용해야 한다. `set` (그리고 `setState`)는 설명된 업데이트가 올바르게 merge되고, 리스너에게 적절히 알림이 전달되도록 보장한다.

#### Colocate store actions
zustand에서 state를 update할 때 다른 Flux 라이브러리와 같은 dispatched action, reducers 이런 것들이 없다. 이 store actions들은 store에 바로 추가된다.

선택적으로, `setState` 를 사용하면 이 action들을 스토어 외부에 위치시킬 수도 있다.

```js
const useBoundStore = create((set) => ({
  storeSliceA: ...,
  storeSliceB: ...,
  storeSliceC: ...,
  updateX: () => set(...),
  updateY: () => set(...),
}))
```

[[04 Auto Generating Selectors]]