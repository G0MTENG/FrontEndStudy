>[!note] note
>This guide assumes that you are familiar with Vite. A good way to start learning more is to read the [Why Vite Guide](https://vitejs.dev/guide/why), and [Next generation frontend tooling with ViteJS](https://www.youtube.com/watch?v=UJypSr8IhKY), a stream where [Evan You](https://twitter.com/youyuxi) did a demo explaining the main concepts.

__해석__
이 가이드는 Vite에 친숙하다는 것을 가정한다. 더 자세하게 배우고 싶다면, https://vitejs.dev/guide/why

## The Need for a Vite Native Test Runner

Vite's out-of-the-box support for common web patterns, features like [[glob imports]] and SSR primitives, and its many plugins and integrations are fostering a vibrant ecosystem. Its dev and build story are key to its success. For docs, there are several SSG-based alternatives powered by Vite. Vite's Unit Testing story hasn't been clear though. Existing options like [Jest](https://jestjs.io/) were created in a different context. There is a lot of duplication between Jest and Vite, forcing users to configure two different pipelines.

__해석__
Vite는 일반적인 Web Pattern에 대한 기본 지원과 [[glob imports]] 및 SSR primitives와 같은 기능, 그리고 다양한 플러그인과 통합을 통해 활발한 생태계를 조성하고 있다. Vite의 개발 및 빌드 스토리는 성공의 핵심 요소이다. 문서화 작업을 위해, Vite를 기반으로 하는 SSG (static site generator) 기반 대안이 있었다. 하지만, Vite의 유닛 테스트 관련 이야기는 명확하지 않았다. ==Jest==와 같은 기존 옵션들은 다른 맥락에서 만들어졌다. Jest와 Vite 사이에는 많은 중복들이 존재해서 user들은 두 가지 다른 pipeline을 구성해야 하는 문제가 존재했다.

Using Vite dev server to transform your files during testing, enables the creation of a simple runner that doesn't need to deal with the complexity of transforming source files and can solely focus on providing the best DX during testing. A test runner that uses the same configuration of your App (through `vite.config.js`), sharing a common transformation pipeline during dev, build, and test time. That is extensible with the same plugin API that lets you and the maintainers of your tools provide first-class integration with Vite. A tool that is built with Vite in mind from the start, taking advantage of its improvements in DX, like its instant Hot Module Reload ([[HMR]]). This is Vitest, a next generation testing framework powered by Vite.

__해석__
Vite 개발 서버를 사용하여 테스트 중에 파일을 변환(Ex. Javascript로 컴파일, CSS 전처리)하면, 소스 파일 변환의 복잡성을 처리할 필요 없이 테스트 중 최고의 개발자 경험(DX)을 제공하는 간단한 러너를 만들 수 있다. 이 러너는 애플리케이션의 설정(vite.config.js)을 사용하여 개발, 빌드, 테스트 시간 동안 공통 변환 파이프라인을 공유한다. 또한, Vite와 동일한 플러그인 API로 확장 가능하여, 너와 도구 유지 관리자가 Vite와 first-class 통합을 제공할 수 있다. Vite의 향상된 DX, 예를 들어 Hot Module Reload([[HMR]])과 같은 기능을 활용하여 처음부터 Vite를 염두에 두고 설계된 도구이다. 이것이 바로 Vite에서 동작하는 차세대 testing library Vitest이다.

__축약__
Vite 개발 서버를 사용하면 테스트 중 파일을 변환하는 복잡성 없이, 테스트에만 집중할 수 있다. 이 테스트 러너는 애플리케이션 설정을 공유하여 개발, 빌드, 테스트 시간 동안 동일한 변환 파이프라인을 사용한다. Vitest는 Vite의 장점을 최대한 사용하는 test framework이다.

Given Jest's massive adoption, Vitest provides a compatible API that allows you to use it as a drop-in replacement in most projects. It also includes the most common features required when setting up your unit tests (mocking, snapshots, coverage). Vitest cares a lot about performance and uses Worker threads to run as much as possible in parallel. Some ports have seen test running an order of magnitude faster. Watch mode is enabled by default, aligning itself with the way Vite pushes for a dev first experience. Even with all these improvements in DX, Vitest stays lightweight by carefully choosing its dependencies (or directly inlining needed pieces).

__해석__
jest의 대규모 채택을 감안하여, Vitest는 대부분의 프로젝트에서 drop-in(잠깐 들어가다) 대체용으로 사용할 수 있는 호환 가능성 API를 제공한다. 또한, 단위 테스트를 설정할 때 필요한 가장 일반적인 기능 (Mocking, Snapshot, Coverage)도 포함되어 있다. Vitest는 성능에 많은 신경을 쓰며 가능한 한 많이 병렬로 실행하기 위해 worker thread를 사용한다. 일부 포트에서는 테스트 실행 속도가 훨씬 빨라졌다. watch mode(파일이 변경될 때마다 자동으로 테스트를 다시 실행하는 기능)는 기본적으로 활성화되어 있으며, 이는 개발자 우선 경험을 추구하는 Vite의 방향과 일치한다. 이러한 DX의 모든 개선에도 불구하고 Vitest는 종속성을 신중하게 선택하거나 필요한 부분을 직접 inlining하여 경량화를 유지한다.

**Vitest aims to position itself as the Test Runner of choice for Vite projects, and as a solid alternative even for projects not using Vite.**

__해석__
Vitest는 vite 프로젝트를 위한 테스트 러너로서, 그리고 Vitest를 사용하지 않는 프로젝트의 경우에도 확실한 대안으로 자리매김하는 것을 목표로 한다.

다음 [[01 Getting Started]]



