function getAttr(node, property) {
  if (typeof node === "string") {
    node = node(node);
  }
  return node.getAttribute(property);
}

function setAttr(node, property, value) {
  if (typeof node === "string") {
    node = node(node);
  }

  if (!node[property] && property !== "class" && property !== "title") {
    node.dataset[property] = value;
    return;
  }

  node.setAttribute(property, value);
}

export function attr(node, prop, value) {
  if (!value) {
    return getAttr(node, prop);
  } else {
    setAttr(node, prop, value);
  }
}
const arrowAttr = (node, prop, value) =>
  !value ? getAttr(node, prop) : setAttr(node, prop, value);
