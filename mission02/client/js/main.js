import { addClass, attr, data, node, nodes } from "./index.js";

/* 
1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리
*/

//클릭 이벤트 발생 시 실행 함수
function handleSlider(e) {
  e.preventDefault();

  const target = e.target.closest("li");
  if (!target) return;
  //선택한 요소의 인덱스 및 data 가져오기
  const index = attr(target, "data-index");
  const dataSet = data[index - 1];

  //html 제어할 요소 가져오기
  const list = nodes(".character__li");
  const visualImage = node(".visual__img");
  const visualAudio = node(".visual__audio");
  const name = node(".nickName");
  const body = node(".posterBody");

  //1. 클래스 삭제 및 선택한 요소에 is-active 클래스 추가
  classReset(list, "is-active");
  addClass(target, "is-active");

  //2. 배경색 설정
  setBgcolor(body, dataSet.color);

  //3. 메인 이미지, 오디오 설정
  setContent(visualImage, { src: dataSet.name, alt: dataSet.alt });
  setContent(visualAudio, { src: dataSet.name });

  //4. 캐릭터 이름 설정
  setNameText(name, dataSet.name);
}

node(".nav").addEventListener("click", handleSlider);

//클래스 삭제 함수
function classReset(node, className) {
  if (typeof node === "string") {
    node = nodes(node);
  }

  node.forEach((item) => item.classList.remove(className));
}

//배경색 설정 함수
function setBgcolor(node, color) {
  if (typeof node === "string") {
    node = node(node);
  }

  if (!Array.isArray(color)) {
    node.style.background = `linear-gradient(to bottom, ${color}, #000)`;
  } else {
    const [colorA, colorB = "#000"] = color;
    node.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
  }
}

//이미지, 오디오 변경 함수
function setContent(node, value) {
  if (typeof node === "string") {
    node = node(node);
  }

  const imgSrc = `./assets/${value.src}.jpeg`;
  const audioSrc = `./assets/audio/${value.src}.m4a`;
  const attrSrc = Object.keys(value).find((key) => key === "src");
  const attrAlt = Object.keys(value).find((key) => key === "alt");

  if (node.tagName === "IMG") {
    attr(node, attrAlt, value.alt);
    return attr(node, attrSrc, imgSrc);
  } else if (node.tagName === "AUDIO") {
    return attr(node, attrSrc, audioSrc);
  }
}

//텍스트 변경 함수
function setNameText(node, value) {
  if (typeof node === "string") {
    node = node(node);
  }

  node.textContent = `${value}`;
}
