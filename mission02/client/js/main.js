/* 
1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리
*/

const navigation = document.querySelector(".nav");
const list = document.querySelectorAll(".nav li");
const visualImage = document.querySelector(".visual img");
const char = document.querySelector(".nickName");
const body = document.querySelector("body");

function handleSlider(e) {
  e.preventDefault();

  const target = e.target.closest("li");
  const index = target.getAttribute("data-index");
  const dataSet = data[index - 1];

  if (!target) return;

  list.forEach((li) => li.classList.remove("is-active"));

  target.classList.add("is-active");

  visualImage.setAttribute("src", `./assets/${dataSet.name}.jpeg`);
  visualImage.setAttribute("alt", `${dataSet.alt}`);

  char.textContent = dataSet.name;

  body.style.background = `linear-gradient(to bottom, ${dataSet.color[0]}, ${dataSet.color[1]})`;
}

navigation.addEventListener("click", handleSlider);

function setBgcolor(node, value) {
  node.style.background = `linear-gradient(to bottom, ${value.color[0]}, ${value.color[1]})`;
}

function setImage(node, attr, value) {
  if (attr === "src") {
    return node.setAttribute(attr, `./assets/${value}.jpeg`);
  }
  node.setAttribute(attr, value);
}

function setNameText(node, value) {
  node.textContent = value.name;
}
