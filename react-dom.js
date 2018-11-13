import _ from "./methods.js";

/**
 * 将虚拟 DOM 转化为真实 DOM
 * @param {*} vdom      虚拟 DOM
 * @param {*} container 需要插入的位置
 */
function render(vdom, container) {
  console.log(vdom);
  vdomToDom(vdom, container);
}
function vdomToDom(vdom, container) {
  let component;
  if (_.isFunction(vdom.nodeName)) {
    component = createComponent(vdom); // 构造组件
    setProps(component); // 更改组件 props
    renderComponent(component); // 渲染组件，将 dom 节点赋值到 component
    return component.base; // 返回真实 dom
  }
  if (component) {
    return _render(component, container);
  } else {
    return _render(vdom, container);
  }
}
/**
 * 渲染组件，将 dom 节点赋值到 component
 * @param {*} component
 */
function renderComponent(component) {
  if (component.base && component.shouldComponentUpdate) {
    const bool = component.shouldComponentUpdate(
      component.props,
      component.state
    );
    if (!bool && bool !== undefined) {
      return false; // shouldComponentUpdate() 返回 false，则生命周期终止
    }
  }
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  const rendered = component.render();
  const base = vdomToDom(rendered);

  if (component.base && component.componentDidUpdate) {
    component.componentDidUpdate();
  } else if (component && component.componentDidMount) {
    component.componentDidMount();
  }

  if (component.base && component.base.parentNode) {
    // setState 进入此逻辑
    component.base.parentNode.replaceChild(base, component.base);
  }

  component.base = base; // 标志符
}
/**
 * 设置属性
 * @param {*} component
 */
function setProps(component) {
  if (component && component.componentWillMount) {
    component.componentWillMount();
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props); // 后面待实现
  }
}
/**
 * 创建 component
 * @param {*} vdom 虚拟dom
 */
function createComponent(vdom) {
  if (vdom.nodeName.prototype.render) {
    // vdom.nodeName 就是 class, 将属性以 props 方式传给 class
    return new vdom.nodeName(vdom.attributes);
  } else {
    // 处理无状态组件：const A = (props) => <div>I'm {props.name}</div>
    return vdom.nodeName(vdom.attributes);
  }
}
/**
 * render函数续
 * @param {*} component
 * @param {*} container
 */
export function _render(component, container) {
  const vdom = component.render ? component.render() : component;

  if (_.isString(vdom) || _.isNumber(vdom)) {
    container.innerText = container.innerText + vdom;
    return;
  }

  const dom = document.createElement(vdom.nodeName);

  for (let attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr]);
  }

  vdom.children.forEach(vdomChild => render(vdomChild, dom));

  if (component.container) {
    // 如果组件有容器属性，则将组件插入该容器
    // 注意：调用 setState 方法时是进入这段逻辑，从而实现我们将 dom 的逻辑与 setState 函数分离的目标；知识点: new 出来的同一个实例
    component.container.innerHTML = null;
    component.container.appendChild(dom);
    return;
  }
  // 如果组件没有容器属性，则赋值改组件的容器属性，再插入
  component.container = container;
  container.appendChild(dom); // 兼容沙盒模式
}

/**
 * 给节点设置属性
 * @param {*} dom   操作元素
 * @param {*} attr  操作元素属性
 * @param {*} value 操作元素值
 */
function setAttribute(dom, attr, value) {
  if (attr === "className") {
    attr = "class";
  }
  if (/on\w+/.test(attr)) {
    // 处理事件的属性:
    const eventName = attr.toLowerCase().substr(2);
    dom.addEventListener(eventName, value);
  } else if (attr === "style") {
    // 处理样式的属性:
    let styleStr = "";
    let standardCss;
    for (let klass in value) {
      standardCss = humpToStandard(klass); // 处理驼峰样式为标准样式
      value[klass] = _.isNumber(value[klass])
        ? value[klass] + "px"
        : value[klass]; // style={{ className: '20' || '20px' }}>
      styleStr += `${standardCss}: ${value[klass]};`;
    }
    dom.setAttribute(attr, styleStr);
  } else {
    // 其它属性
    dom.setAttribute(attr, value);
  }
}

/**
 * 处理驼峰样式属性名
 * @param {string} hump 驼峰命名属性
 * @returns {string}
 */
function humpToStandard(klass) {
  return klass.replace(/[A-Z]/, match => "-" + match.toLowerCase());
}
export default {
  render
};
