/* 
1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리
*/

function handleSlider(e) {
  e.preventDefault();

  const target = e.target.closest("li");
  if (!target) return;

  const list = nodes(".character__li");
  const visualImage = node(".visual__img");
  const visualAudio = node(".visual__audio");
  const name = node(".nickName");
  const body = node(".posterBody");

  const index = attr(target, "data-index");
  const dataSet = data[index - 1];

  classReset(list, "is-active");
  target.classList.add("is-active");

  setContent(visualImage, { src: dataSet.name, alt: dataSet.alt });
  setContent(visualAudio, { src: dataSet.name });
  setNameText(name, dataSet.name);
  setBgcolor(body, dataSet.color);
}

node(".nav").addEventListener("click", handleSlider);

function classReset(node, className) {
  node.forEach((item) => item.classList.remove(className));
}

function setBgcolor(node, color) {
  if (!Array.isArray(color) || !color[1]) {
    node.style.background = `linear-gradient(to bottom, ${color}, #000)`;
  } else {
    node.style.background = `linear-gradient(to bottom, ${color[0]}, ${color[1]})`;
  }
}

function setContent(node, attr) {
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

function setNameText(node, value) {
  node.textContent = value;
}
