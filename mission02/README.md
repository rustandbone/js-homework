# 엘리멘탈 포스터 슬라이드 구현

- [엘리멘탈 포스터 슬라이드 구현](#엘리멘탈-포스터-슬라이드-구현)
  - [클릭 이벤트 발생 시 실행 함수](#클릭-이벤트-발생-시-실행-함수)
    - [클래스 순환 삭제 함수](#클래스-순환-삭제-함수)
    - [배경색 설정 함수](#배경색-설정-함수)
    - [메인 이미지, 오디오 설정 함수](#메인-이미지-오디오-설정-함수)
    - [텍스트 변경 함수](#텍스트-변경-함수)
  - [모듈화](#모듈화)


## 클릭 이벤트 발생 시 실행 함수
```js
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
```

1. `.nav` 요소 클릭 시 `handleSlider` 함수 실행
2. `e.target.closest("li")`로 가장 가까운 `li` 태그를 찾고 만약 없으면 함수 종료시킴.
3. html에서 js로 값을 변경할 요소들(li, img, audio, body, h1 등)에 클래스를 주고, `node`, `nodes` 유틸 함수 사용해 `element` 선택해서 변수에 담음
4. 클릭한 요소에 li가 있을 경우 `data-index` 속성값을 불러오고, `data` 배열에서 인덱스에 해당하는 객체 가져옴  
  
  
- **함수 실행 순서**
1. `is-active` 클래스를 `li`에서 제거하고 선택한 `li`에만 `is-active` 클래스 부여
2. 클릭한 캐릭터의 색깔에 맞게 배경색(그래디언트)을 변경
3. 클릭한 캐릭터의 이미지와 오디오에 맞게 `visual` 태그 안의 `img`, `audio` 태그의 경로, `alt` 값 변경
4. 클릭한 캐릭터의 이름으로 `h1`의 텍스트를 변경 

---

### 클래스 순환 삭제 함수
```js
function classReset(node, className) {
  if (typeof node === "string") {
    node = nodes(node);
  }

  node.forEach((item) => item.classList.remove(className));
}
```

1. 요소를 배열로 받아, 각 요소에 있는 className으로 전달한 클래스를 삭제
2. 요소가 여러 개일 것을 고려해 `node`를 태그명, 클래스명, 아이디명(string)으로 입력한 경우, `nodes()` 함수로 `querySelectorAll에` 담기도록 함

### 배경색 설정 함수
```js
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
```

1. 배경색을 그래디언트로 입히는 함수. 두 가지 색깔을 배열로 받아 배경색을 설정하도록 함.
   1. `string`으로 한 가지 색깔만 넣은 경우 그래디언트 두 번째 색깔로 #000 설정
   2. 배열로 값을 받은 경우 구조 분해 할당으로 첫 번째, 두 번째 색깔을 받아 그래디언트로 배경 설정
   3. 배열에 한 가지 색깔만 넣은 경우에는 두 번째 색깔은 기본 값으로 #000 설정
2. `node`를 태그명, 클래스명, 아이디명(string)으로 입력한 경우, `nodes()` 함수로 `querySelector`에 담기도록 함(아래 함수들도 동일)


### 메인 이미지, 오디오 설정 함수
```js
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
```

1. `img`, `audio` 파일 경로를 전달 인자를 반영하는 변수에 담음
2. `value` 전달인자를 객체로 받아 `src`, `alt` 값을 찾아 값이 설정되도록 함
3. 태그가 `img`인 경우 이미지 파일 경로와 `alt`가 바뀌도록 함
4. 태그가 `audio`인 경우 오디오 파일 경로가 바뀌도록 함


### 텍스트 변경 함수
```js
function setNameText(node, value) {
    if (typeof node === "string") {
    node = node(node);
  }

  node.textContent = `${value}`;
}
```

1. `textContent`로 해당 요소의 `text`가 `value` 전달 인자값으로 바뀌도록 설정

## 모듈화
```js
//index.js
export * from "./attr.js";
export * from "./css.js";
export * from "./data.js";
export * from "./node.js";
```
```js
//main.js
import { addClass, attr, data, node, nodes } from "./index.js";
```
```html
<!-- index.html -->
<script src="./js/main.js" type="module"></script>
```

1. `data`의 배열과 유틸 함수를 모듈로 `export`해서 `main.js`에서 `import`해서 사용함