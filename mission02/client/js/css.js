export function addClass(node, className) {
  if (typeof node === "string") node = node(node);

  if (typeof className !== "string") {
    throw new TypeError(
      "addClass 함수의 두 번째 인수는 문자 타입 이어야 합니다."
    );
  }

  node.classList.add(className);
}
