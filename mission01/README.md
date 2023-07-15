# 네이버 로그인 페이지 구현


로그인과 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다.

- [x] 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.

---

- [네이버 로그인 페이지 구현](#네이버-로그인-페이지-구현)
  - [로그인 실행 함수](#로그인-실행-함수)
    - [아이디 체크 함수](#아이디-체크-함수)
    - [비밀번호 체크 함수](#비밀번호-체크-함수)
    - [아이디, 비밀번호 일치 체크 함수](#아이디-비밀번호-일치-체크-함수)
  - [고민점](#고민점)


## 로그인 실행 함수

```js
document
  .querySelector(".btn-login")
  .addEventListener("click", function (event) {
   const email = document.querySelector("#userEmail");
   const pw = document.querySelector("#userPassword");

   function idCheck(email) { /* ... */ }
   function pwCheck(pw) { /* ... */ }
   function isLogin(emailCheck, pwCheck) { /* ... */ } 

   return isLogin(idCheck(email), pwCheck(pw));
  });
```

1. 로그인 클릭 시 `익명 함수` 실행
   - 함수 실행 순서
     1. `idCheck(email)`
     2. `pwCheck(pw)`
     3. `isLogin(emailCheck, pwCheck)`
   - 함수 return으로 isLogin 함수 실행
     - 전달인자로 `idCheck(email)`, `pwCheck(pw)` 함수 설정

### 아이디 체크 함수
```js
  //아이디 유효성 검사 함수
  function idCheck() {
    if (email.value.length > 0 && !emailReg(email.value)) {
      event.preventDefault();
      email.classList.add("is--invalid");
      return;
    } else {
      email.classList.remove("is--invalid");
      return email.value;
    }
  }
```

1. 한 글자라도 작성하지 않거나 유효성 통과하지 못하면 input 태그에 `'is--invalid'` 클래스 추가하여 html의 error message가 `display: block`으로 변경되어 보이도록 함. 그리고 return으로 함수 종료되며 undefined 값을 냄.
   - 한 글자 이상 조건을 준 이유 : html의 required 속성을 이용하기 위해 - 한 글자라도 적지 않으면 html에서 다음으로 넘어가지 않도록 막아줌
2. 유효성 통과 시 함수 리턴 값으로 input의 value 값 전달

### 비밀번호 체크 함수
```js
  //비밀번호 유효성 검사 함수
  function pwCheck() {
   
    if (pw.value.length > 0 && !pwReg(pw.value)) {
      event.preventDefault();
      pw.classList.add("is--invalid");
      return;
    } else {
      pw.classList.remove("is--invalid");
      return pw.value;
    }
  }
```

- `아이디 체크 함수`랑 과정 동일

### 아이디, 비밀번호 일치 체크 함수
```js
  //로그인 아이디, 비밀번호 일치 확인 함수
  function isLogin(emailCheck, pwCheck) {
    const user = {
      id: "asd@naver.com",
      pw: "spdlqj123!@",
    };
    
    if (emailCheck && pwCheck) {
      if (emailCheck === user.id && pwCheck === user.pw) {
        event.preventDefault();
        window.location.href = "./welcome.html";
      } else if (emailCheck || pwCheck) {
        event.preventDefault();
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }
    }
  }
```

1. const 변수를 전역으로 둘 경우 외부에서 객체의 value 값을 쉽게 변경할 수 있는 문제가 있음. user 객체의 id, pw 값을 로그인 시도 시에만 값을 확인할 수 있도록 `아이디, 비밀번호 일치 체크 함수` 안에 넣음. 
2. 매개변수로 넣은 `idCheck(email)`, `pwCheck(pw)` 실행하여 유효성 검사 통과 여부를 return으로 반환
3. 통과 시 input의 value를 return하도록 하여, boolean 값으로 변환 시 true로 변환되도록 함. 그리고 전달 받은 value을 그대로 user의 id, pw와 비교하도록 하고 통과 시 페이지 이동.
4. 통과하지 못할 시 undefined가 return 되므로 false로 변환되어 alert 창이 뜨도록 조건문 설정.


## 고민점
- 전역 함수, 내부 함수
  - 전역 함수 대신 익명 함수 내부 안에 함수를 넣어 놓았고, 각 기능을 함수 별로 나눔.
  - isLogin 함수 안에 전달 인자로 함수를 주어, isLogin 함수 하나를 실행하면 로그인 구현 로직이 이루어지도록 함
  - 함수 컨텍스트 내에서 외부 함수에 설정한 변수를 내부 함수에게 전달 인자로 값을 주지 않아도 되는 이점이 있었음.