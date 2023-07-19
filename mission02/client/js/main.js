/* 
1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리
*/

const navigation = document.querySelector(".nav");

function handleSlider(e) {
  e.preventDefault();
  const list = document.querySelectorAll(".character__li");
  const visualImage = document.querySelector(".visual__img");
  const sound = document.querySelector(".visual__audio");
  const char = document.querySelector(".nickName");
  const body = document.querySelector(".posterBody");
  const target = e.target.closest("li");
  const index = target.getAttribute("data-index");
  const dataSet = data[index - 1];

  if (!target) return;

  classReset(list, "is-active");
  target.classList.add("is-active");

  setTest(visualImage, { src: dataSet.name, alt: dataSet.alt });
  setTest(sound, { src: dataSet.name });
  setNameText(char, dataSet.name);
  // setBgcolor(body, dataSet.color);
  setBgcolor(body, dataSet.color, dataSet.color);
}

navigation.addEventListener("click", handleSlider);

function classReset(node, className) {
  node.forEach((item) => item.classList.remove(className));
}

// function setBgcolor(node, value) {
//   node.style.background = `linear-gradient(to bottom, ${value[0]}, ${value[1]})`;
// }

function setBgcolor(node, colorA, colorB = "#000") {
  colorA = colorA[0];
  colorB = colorB[1];
  // if (style === "gradient") {
  node.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
  // }
  // node.style.background = colorB;
}

function setTest(node, attr) {
  const imgSrc = `./assets/${attr.src}.jpeg`;
  const audioSrc = `./assets/audio/${attr.src}.m4a`;
  const attrSrc = Object.keys(attr).find((key) => key === "src");
  const attrAlt = Object.keys(attr).find((key) => key === "alt");

  if (node.tagName === "IMG") {
    node.setAttribute(attrAlt, attr.alt);
    return node.setAttribute(attrSrc, imgSrc);
  } else if (node.tagName === "AUDIO") {
    return node.setAttribute(attrSrc, audioSrc);
  }
}

function setContent(node, attr, value) {
  const imgSrc = `./assets/${value}.jpeg`;
  const audioSrc = `./assets/audio/${value}.m4a`;

  if (node.tagName === "IMG" && attr === "src") {
    return node.setAttribute(attr, imgSrc);
  } else if (node.tagName === "AUDIO" && attr === "src") {
    return node.setAttribute(attr, audioSrc);
  }
  node.setAttribute(attr, value);
}

function setNameText(node, value) {
  node.textContent = value;
}
