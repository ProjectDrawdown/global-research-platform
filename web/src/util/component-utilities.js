import objectPath from "object-path";

export function findChildByContainerType(children, ContainerType) {
  return (typeof children.find === "function" ? children : [children]).find(
    comp => {
      return ContainerType === comp.type;
    }
  );
}

export function getChildrenByContainerType(children, ContainerType) {
  return (typeof children.filter === "function" ? children : [children]).filter(
    comp => {
      return ContainerType === comp.type;
    }
  );
}

export function getModalContent(children, path = "default") {
  let content;
  (typeof children.forEach === "function" ? children : [children]).forEach(
    comp =>
      !content &&
      comp.props &&
      (comp.props.path === path
        ? (content = comp.props.children.props.children || comp.props.children)
        : comp.props.children &&
          (content = getModalContent(comp.props.children, path)))
  );
  return content;
}

export function getDrawerContent(children, path = "default") {
  let content;
  (typeof children.forEach === "function" ? children : [children]).forEach(
    comp =>
      !content &&
      comp.props &&
      (comp.props.path === path
        ? (content = comp.props.children)
        : comp.props.children &&
          (content = getDrawerContent(comp.props.children, path)))
  );
  return content;
}

export function getChildrenByKey(children, key = undefined) {
  return (typeof children === "object" ? children : []).find(comp => {
    return typeof key === "undefined"
      ? typeof comp.key === "undefined"
      : comp.key === key;
  });
}

export function hasChildOfContainer(children, Container) {
  return findChildByContainerType(children, Container) !== undefined;
}

export function ChildByContainer({ children, container }) {
  return findChildByContainerType(children, container) || [];
}

export function ChildrenByContainer({ children, container }) {
  return findChildByContainerType(children, container) || [];
}

export function objectHasAll(obj, arrayOfProps, checkUndefined = false) {
  return arrayOfProps.reduce((acc, prop) => {
    return acc && objectPath.has(obj, prop) && (checkUndefined ? obj[prop] !== undefined : true);
  }, true);
}

export function rotateAnnualData(data) {
  return data.map(p => {
    return {
      x: p.year,
      y: p.value
    };
  });
}

export function rotateRegionalData(obj) {
  return Object.entries(obj).reduce((acc, [region, data]) => {
    acc[region] = rotateAnnualData(data);
    return acc;
  }, {});
}

export function getPathByHash(root, hash) {
  const hashArray = hash.split("/");
  return hashArray[0] === "#" + root
    ? hashArray[2]
      ? hashArray[1] + "/" + hashArray[2]
      : hashArray[1]
    : false;
}

export function inputsPaneResizeSettings(width) {
  return width >= 400 ? {
    template: "repeat(12, 1fr)",
    leftCol: 3,
    rightCol: 3,
    xPadding: "0",
    align: "center",
    gap: 1,
    offset: 7,
    width
  } : {
    template: "repeat(6, 1fr)",
    leftCol: 3,
    rightCol: 3,
    xPadding: "1rem",
    align: "flex-end",
    gap: 3,
    offset: 0,
    width
  };
}

export function humanize(str) {
  var i, frags = str.split('_');
  for (i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}
