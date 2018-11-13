import React from './react.js'
import ReactDOM from './react-dom.js'

// 测试一
/* const element = (
  <div className="title">
    hello
    <span className="content"> world!</span>
    <br />
    <a>welcome to suporka.js</a>
  </div>
);
*/
// console.log(element) // 打印结果符合预期

// const A = () => <div>I'm componentA</div>

class A extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1,
        }
    }
    componentWillMount() {
        console.log('componentWillMount')
    }
    componentDidMount() {
        console.log('componentDidMount')
    }
    click() {
        console.log(this)
        this.setState({
            count: ++this.state.count,
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.click.bind(this)}>Click Me!</button>
                <div style={{ marginTop: '16px' }}>
                    {this.props.name}:{this.state.count}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <A name="componentA" />, // 上文的 element，即虚拟 dom
    document.getElementById('root')
)

let t = '222'
let aa = '222'
