/*
1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리
*/

//로그인 버튼 클릭 시 함수 실행
document
  .querySelector(".btn-login")
  .addEventListener("click", function (event) {
    const email = document.querySelector("#userEmail");
    const pw = document.querySelector("#userPassword");

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

    //isLogin 함수 실행
    //idCheck, pwCheck 함수를 매개변수로 받아
    //각 함수를 실행하고 return 값으로 진행 여부 결정
    return isLogin(idCheck(), pwCheck());
  });

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-~]).{10,16}$/;
  return re.test(String(text).toLowerCase());
}
