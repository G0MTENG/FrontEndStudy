### 프로젝트에 Vitest 추가하기

```npm
npm install -D vitest
```

vitest를 package.json에 설치하는 것이 권장된다.

하지만, 직접 Vitest를 실행하고 싶다면 다음과 같이 한다.

```npx
npx install --save-dev vitest
```

### Writing Tests

Example

```js title:"sum.js"
export function sum(a, b) {
	return a + b
}
```

```js title:"sum.test.js"
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3)
})
```

>[!tip] TIP
>기본적으로, test는 ".test" 혹은 ".spec" 내에 포함되어야 한다

test를 실행하기 위해 `package.json` 에 추가하면 된다

```json title:"package.json"
{
	"scripts": {
		"test": "vitest"
	}
}
```

`npm run test` 다음과 같이 명령어 입력하면 test를 실행할 수 있다.

