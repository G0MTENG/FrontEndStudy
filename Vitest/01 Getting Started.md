### 프로젝트에 Vitest 추가하기

```npm
npm install -D vitest
```

vitest를 package.json에 설치하는 것이 권장됩니다.

하지만, 직접 Vitest를 실행하고 싶다면 다음과 같이 합니다.

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

test('1 + 2 = 3', () => {
	expect(sum(1, 2)).toBe(3)
})
```

>[!TIP]
>기본적으로, test는 ".test" 혹은 ".spec" 내에 포함되어야 한다

test를 실행하기 위해 `package.json` 에 추가하면 됩니다.

```json title:"package.json"
{
	"scripts": {
		"test": "vitest"
	}
}
```

`npm run test` 다음과 같이 명령어 입력하면 test를 실행할 수 있습니다.

[예제 코드 실행해보기](https://github.com/G0MTENG/FrontEndStudy)
`/Vitest/_sum_test` 폴더에 예제 코드가 있습니다.

### Configuring Vitest

One of the main advantages of Vitest is its unified configuration with Vite. If present, `vitest` will read your root `vite.config.ts` to match with the plugins and setup as your Vite app. For example, your Vite [resolve.alias](https://vitejs.dev/config/shared-options.html#resolve-alias) and [plugins](https://vitejs.dev/guide/using-plugins.html) configuration will work out-of-the-box. If you want a different configuration during testing, you can:

- Create `vitest.config.ts`, which will have the higher priority
- Pass `--config` option to CLI, e.g. `vitest --config ./path/to/vitest.config.ts`
- Use `process.env.VITEST` or `mode` property on `defineConfig` (will be set to `test` if not overridden) to conditionally apply different configuration in `vite.config.ts`

__해석__
Vitest의 주요 장점 중 하나는 Vite의 통합된 구성이다. vitest는 루트 vite.config.ts를 읽어서 플러그인과 일치하도록 설정하고 vite 앱으로 설정한다. 예를 들어, Vite resolve.alias 및 플러그인 구성이 즉시 작동한다. 테스트 중에 다른 구성을 원한다면 가능하다.

- 우선순위가 더 높은 vitest.config.ts를 생성한다
- CLI에 --config 옵션을 전달한다
	Ex ) vitest --config ./path/to/vitest.config.ts
- vite.config.ts에서 다른 구성을 조건부로 적용하려면 process.env.VITEST 또는 defineConfig의 mode 속성(재정의하지 않으면 테스트하도록 설정됨)을 사용한다

>[!Note]
>vitest는 vite와 동일한 구성 파일 확장자(.js, .mjs, .cjs, .ts, .cts, .mts)를 지원합니다. .json 확장자를 지원하지 않습니다.

```ts title:"vite.config.ts"
import { defineConfig } from 'vitest/config'

export default defineConfig ({
	test: {
		// ...
	}
})
```

만약, 이미 vite를 사용하고 있다면, vite 설정에 test 속성을 추가하면 됩니다. 또한 설정 파일 상단에 삼중 슬래시 지시문을 사용하여 Vite 유형에 대한 참조를 추가해야 합니다.

```ts
/// <reference type="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
	test: {
		// ...
	}
})
```

### Workspaces Support

[Vitest Workspaces](https://vitest.dev/guide/workspace.html)로 동일한 프로젝트 내에서 다양한 프로젝트 구성을 실행할 수 있습니다. workspace를 정의하는 파일 및 폴더 목록을 `vitest.workspace` 파일에서 정의할 수 있다.
그 파일은 `js / ts / json` 확장자를 사용할 수 있습니다. 이 기능은 [[모노레포 (미완)]]설정에서 잘 동작합니다. 

```ts title="작업공간 정의"
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // you can use a list of glob patterns to define your workspaces
  // Vitest expects a list of config files
  // or directories where there is a config file
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  // you can even run the same tests,
  // but with different configs in the same "vitest" process
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
])
```

defineWorkspace : 여러 테스트 작업 공간 (workspace)를 정의하기 위한 함수로 설정에 관한 배열을 인자로 받습니다.
[glob]([[glob imports]]) 패턴도 적용할 수 있습니다.

### Command Line Interface

Vitest가 설치된 프로젝트에서 npm script에서 vitest binary를 사용하거나 `npx vitest`를 사용하여 직접 실행할 수 있습니다. 밑에는 Vitest 프로젝트를 초기화할 때 제공하는 기본 npm script입니다.

```json
{
	"script": {
		"test": "vitest",.
		"coverage": "vitest run --coverage"
	}
}
```

파일 변경 사항을 확인하지 않고 테스트를 한 번 실행하려면 `vitest run` 을 사용하면 됩니다. `--port` 혹은 `--https` 와 같은 추가적인 CLI option들도 지정할 수 있습니다. 더 다양한 CLI option들은 `npx vitest --help` 를 이용할 수 있습니다.

### IDE Integrations

[VSCode](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) IDE에서도 Vitest를 사용할 수 있습니다.