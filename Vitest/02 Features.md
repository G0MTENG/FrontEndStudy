>[!tip]
>이런 것들을 할 수 있다를 보여주는 장이다. 그냥 가볍게 읽고, 그 위에 자세하게 설명이 되어 있어서 그거 보면 될듯 싶다.

- [Vite](https://vitejs.dev/)'s config, transformers, resolvers, and plugins.
- Use the same setup from your app to run the tests!
- [Smart & instant watch mode, like HMR for tests!](https://twitter.com/antfu7/status/1468233216939245579)
- Component testing for Vue, React, Svelte, Lit, Marko and more
- Out-of-the-box TypeScript / JSX support
- ESM first, top level await
- Workers multi-threading via [Tinypool](https://github.com/tinylibs/tinypool)
- Benchmarking support with [Tinybench](https://github.com/tinylibs/tinybench)
- Filtering, timeouts, concurrent for suite and tests
- [Workspace](https://vitest.dev/guide/workspace) support
- [Jest-compatible Snapshot](https://vitest.dev/guide/snapshot)
- [Chai](https://www.chaijs.com/) built-in for assertions + [Jest expect](https://jestjs.io/docs/expect) compatible APIs
- [Tinyspy](https://github.com/tinylibs/tinyspy) built-in for mocking
- [happy-dom](https://github.com/capricorn86/happy-dom) or [jsdom](https://github.com/jsdom/jsdom) for DOM mocking
- Code coverage via [v8](https://v8.dev/blog/javascript-code-coverage) or [istanbul](https://istanbul.js.org/)
- Rust-like [in-source testing](https://vitest.dev/guide/in-source)
- Type Testing via [expect-type](https://github.com/mmkal/expect-type)

위와 같은 기능들을 사용할 수 있습니다.

### Shared Config between Test, Dev and Build

vite의 config, transformer, resolver, 그리고 plugins. 이와 같은 설정을 이용하여 App에서 테스트를 실행할 수 있다. 

[더 자세히 알아보기]([[01 Getting Started]])

### Watch Mode

소스 코드나 테스트 파일들을 변경할 때, Vitest는 똑똑하게 module graph를 찾고, test를 재실행한다. [[HMR]]과 비슷하게 동작한다.

`vitest` 는 기본적으로 watch mode로 실행되며, CI 환경에서는 `process.env.CI` 가 존재할 때 `run mode` 로 똑똑하게 전환된다. `vitest watch` 또는 `vitest run` 을 통해 명시적으로 모드를 지정할 수 있다.

### Common Web Idioms Out-Of-The-Box

기본적으로 ES Module / TypeScript / JSX support / PostCSS를 지원한다

### Threads

기본적으로 Vitest는 Tinypool을 통해 `node:worker_threads` 를 사용하여 여러 스테드에서 테스트 파일을 실행한다. 이를 통해 테스트를 동시에 실행할 수 있게 된다. 멀티스레딩과 호환되지 않는 코드를 실행하는 경우, `--pool=forks` 옵션을 사용하여 `node:child_process` 를 통해 여러 프로세스에서 테스트를 수행할 수 있다.

단일 테스트 또는 프로세스에서 테스트를 실행하려면  [`poolOptions`](https://vitest.dev/config/#pooloptions)를 보면 된다.

Vitest는 또한 각 파일의 환경을 격리하여 하나의 파일에서 env 변경이 다른 파일에 영향을 미치지 않도록 한다. Isolation은 CLI에 `--no-isolate` 를 통해 비활성화할 수 있다. (정확도와 성능 향상의 tradeoff)

### Test Filtering

Vitest는 테스트 실행 속도를 높이기 위해 실행할 테스트를 좁히는 다양한 방법을 제공한다.

[더 자세히](https://vitest.dev/guide/filtering.html)

### Running Tests Concurrently

연속적인 테스트들을 병렬적으로 실행하기 위해 `.concurrent` 를 사용할 수 있다.

```ts
import { describe, it } from 'vitest'

describe('suite', () => {
	it('serial test', async () => { /* ... */ })
	it.concurrent('concurrent test 1', async ({expect}) => {})
	it.concurrent('concurrent test 2', async ({expect}) => {})
})
```

만약, suite 저기에 `.concurrent` 를 사용한다면, 모든 테스트는 병렬적으로 실행된다.

```ts
import { describe, it } from 'vitest'

// All tests within this suite will be run in parallel
describe.concurrent('suite', () => {
  it('concurrent test 1', async ({ expect }) => { /* ... */ })
  it('concurrent test 2', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 3', async ({ expect }) => { /* ... */ })
})
```

`.skip` `.only` `.todo` 를 concurrent suite와 test에 사용할 수 있다.

[API Reference](https://vitest.dev/api/#test-concurrent)

> [!warning]
> concurrent test를 실행할 때, snapshot과 assertion은 올바른 테스트가 감지되도록 local test context에서 `expect` 를 사용해야 한다ㅏ

```ts
import { describe, it, expect } from 'vitest'

describe.concurrent('suite', () => {
  it('concurrent test 1', async ({ expect }) => {
    const value = await someAsyncFunction()
    expect(value).toBe(true) // 로컬 테스트 컨텍스트의 expect 사용
  })

  it('concurrent test 2', async ({ expect }) => {
    const result = render()
    expect(result).toMatchSnapshot() // 로컬 테스트 컨텍스트의 expect 사용
  })
})
```

자신의 독립적인 expect 객체를 사용하기 때문에 병렬로 실행되는 다른 테스트와 혼동이 되지 않을 수 있음.

### Snapshot

Jest와 호환되는 snapshot을 제공한다.

[Jest snapshot](https://jestjs.io/docs/snapshot-testing)

### Chai and Jest `expect` Compatibility

Chai는 assertion을 위해 내장되어 있으며 Jest expect와 호환되는 API를 제공한다

> [!NOTE]
> matcher를 추가하는 서드파티 라이브러리를 사용하고 있다면, `test.globals`를 true로 설정하면 더 나은 호환성을 제공한다.

[Chai?](https://www.chaijs.com/)

### Mocking

Tinyspy는 vi 객체에서 jest 호환 API를 사용하여 Mocking을 위해 내장되어 있다.

[Tinyspy](https://github.com/tinylibs/tinyspy)

```ts
import { expect, vi } from 'vitest'

const fn = vi.fn()

fn('hello', 1)

expect(vi.isMockFunction(fn)).toBe(true)
expect(fn.mock.calls[0]).toEqual(['hello', 1])

fn.mockImplementation(arg => arg)

fn('world', 2)

expect(fn.mock.results[1].value).toBe('world')
```

vitest는 DOM 및 브라우저 API를 mocking하는 happy-dom 또는 jsdom을 지원한다.

[happy-dom](https://github.com/capricorn86/happy-dom)
[jsdom](https://github.com/jsdom/jsdom)

vitest에 기본적으로 포함되어 있지 않기 때문에 다운로드 하여 사용해야 한다.

[Mocking](https://vitest.dev/guide/mocking.html)

### Coverage

vitest는 v8을 통한 네이티브 코드 커버리지와 istanbul을 통한 instrumented 코드 커버리지를 지원한다.

```json
{ 
	"scripts": 
	{ 
		"test": "vitest", 
		"coverage": "vitest run --coverage" 
	} 
}
```

[Coverage](https://vitest.dev/guide/coverage.html)

### In-Source Testing

vitest는 소스 코드 내에서 구현과 함께 테스트를 실행할 수 있는 방법을 제공한다. 이는 Rust의 Module Test와 비슷하다.

이 방법은 테스트가 구현과 동일한 클로저를 공유하게 되어, 비공개 상태를 내보내지 않고도 테스트할 수 있도록 한다. 동시에 개발을 위한 피드백 루프를 더 가깝게 만든다.

[Rust Module Test](https://doc.rust-lang.org/book/ch11-03-test-organization.html#the-tests-module-and-cfgtest)

```ts
// src/index.ts

// the implementation
export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0)
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}
```

### Benchmarking

실험버전으로 제공하고 있다.

### Type Testing

실험버전으로 제공하고 있다.

