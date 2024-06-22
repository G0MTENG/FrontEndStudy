[YOUTUBE](https://www.youtube.com/watch?v=nkXIpGjVxWU)

### 프론테엔드 상태관리

State: A Component's Memory

Ex )
- 어떤 팝업을 화면에 띄울지 말지
- 주문/배달의 진행은 어떤지

어떠한 데이터는 그 컴포넌트에 종속되어 있다 => 이를 해결하기 위한 개념 **상태관리**

### 상태 관리에 대한 고민

- Redux
- MobX
	=> 공통적으로 Store가 너무 크고 복잡함 또한 비동기 통신에 적합하지 않은 도구

--> React Query (Tanstack Query)

React Query를 도입했지만 ,,,
	=> Store는 간단한데 컴포넌트가 복잡해짐

--> Zustand

> [!note]
> Zustand - Client State
> Client에서 소유 및 관리하며 Client에서 온전히 제어가능한 상태

>[!note]
>React Query - Server State
>Client 외부에서 소유하며 Client에서는 일종의 캐시인 상태

### Tanstack Query

강력한 비동기 상태 관리 도구

- 유용한 옵션과 인터페이스
- 리액트 훅같은 간단한 사용법
- 캐싱, 동기화 등 다양한 기능

query -> CRUD의 READ
mutation -> CRUD의 Create Update Delete

### Zustand

Client State를 관리하기 위한 라이브러리로, 

- 적은 보일러 플레이트 코드
- 직관적인 사용법
- 작은 패키지 사이즈

### 왜 React Query와 Zustand를 선택했나

Client State 관리 : zustand

- 컴포넌트 밖에서도 상태 변경이 가능
- 사용성이 단순해 러닝커브가 낮음
- 상태관리에 필요한 코드도 적음
- Redux Devtools 확장 프로그램 활용 가능

=> 외부 상태관리 도구의 의존도가 낮은 팀 내 코드와 전역 상태를 최소화하는 팀의 방향성에 적합

Server State 관리 : React Query

- API 호출 코드로 비대해진 Store를 목적에 맞게 분리
- 리액트 훅과 비슷한 직관적인 사용성
- 여러 인터페이스 & 옵션을 제공해 적은 코드로 강력한 동작
- 자체 개발도구 제공

=> 팀 내 도메인들이 서버와 유기적으로 얽혀있으면서 비동기 호출 전략이 요구되므로 해당 역할에 적합

### 상태관리는 프로덕트에 어떻게 녹아있을까

__배달의 민족__ 에서는 웹뷰를 많이 이용하고 있음

![[스트린샷1.png]]

[[00 Introduction]]
