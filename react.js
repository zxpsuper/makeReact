import { _render } from './react-dom.js'
let aa = ''
function createElement(tag, attr, ...child) {
    return {
        attributes: attr,
        children: child,
        key: undefined,
        nodeName: tag,
    }
}

function Component(props) {
    this.props = props
    this.state = this.state || {}
}

Component.prototype.setState = function(updateObj) {
    this.state = Object.assign({}, this.state, updateObj) // 这里简单实现，后续篇章会深入探究
    _render(this) // 重新渲染
}

export default {
    createElement,
    Component,
}
