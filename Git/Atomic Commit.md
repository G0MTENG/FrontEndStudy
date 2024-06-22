> 커밋의 크기를 가능한 작게 하는 것

[__위키__](https://ko.wikipedia.org/wiki/%EC%9B%90%EC%9E%90%EC%A0%81_%EC%BB%A4%EB%B0%8B)
> 구별되는 여러 변경사항들을 하나의 운용 단위로 적용하는 것이다. 변경사항이 적용되면 원자적 커밋은 성공하였다고 이야기된다. 원자적 커밋이 끝나기 전에 실패한 것이 하나라도 있다면 원자적 커밋에서 완수되는 모든 변경사항들이 되돌려진다.

데이터베이스 시스템과 버전 관리 시스템(git)에서 사용되며, 데이터베이스의 트랜잭션과 유사합니다.

>[!tip]
>코드의 수는 중요하지 않습니다. 하지만, 간단한 짧은 한 문장으로 코드 내용을 설명할 수 있어야 합니다.

### 왜 사용할까 ?

1. 원자 변화는 가역적 변화이다
   말이 어렵지만, 영어로 보면 쉽게 이해할 수 있습니다.
   atomic change = revert change
   atomic commit을 사용하면 간단한 commit revert(커밋 되돌리기)를 통해 모든 변경 사항을 되돌릴 수 있습니다.
   
2. 깔끔한 Git history
   
3. Pull Request 시 검토하기 쉬움
   
4. 좋은 workflow
   크고 복잡한 작업을 쉽고 작게 나눠 문제를 해결할 수 있습니다.

[참고문서](https://dev.to/samuelfaure/how-atomic-git-commits-dramatically-increased-my-productivity-and-will-increase-yours-too-4a84)

   
   