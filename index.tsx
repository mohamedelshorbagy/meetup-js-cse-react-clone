const React = {
    createElement: (tag, props, ...children) => {
        if (typeof tag === 'function') {
            return tag(props);
        }
        const $elm = { tag, props: { ...props, children } };
        return $elm;
    }
};


const states = [];
let stateCursor = 0;



function useState(initialState) {
    const __INTERNAL_STATE = stateCursor;
    states[__INTERNAL_STATE] = states[__INTERNAL_STATE] !== undefined ? states[__INTERNAL_STATE] : initialState;


    const setState = (newState) => {
        states[__INTERNAL_STATE] = newState;
        dispatchRender();
    }

    stateCursor++;


    return [states[__INTERNAL_STATE], setState];
}


const App = () => {

    const [value, setValue] = useState('mohamed');
    const [count, setCount] = useState(0);

    return (
        <div className="container">
            <p>Hello</p>
            <input value={value} type="text" onchange={(ev) => setValue(ev.target.value)} />
            <p>{value}</p>
            <button onclick={() => setCount(count + 1)}>+</button>
            <button onclick={() => setCount(count - 1)}>-</button>
            <p>{count}</p>
        </div>
    )
};


function render(reactComponent, $container) {

    if (typeof reactComponent === 'string' || typeof reactComponent === 'number') {
        $container.appendChild(document.createTextNode(reactComponent + ''));
        return;
    }


    const $domElm = document.createElement(reactComponent.tag);

    // loop over props (not `children`)
    if (reactComponent.props) {
        Object.keys(reactComponent.props)
            .filter(prop => prop !== 'children')
            .forEach((prop) => {
                $domElm[prop] = reactComponent.props[prop];
            })
    }
    // loop over children
    if (reactComponent.props.children) {
        reactComponent.props.children
            .forEach((child) => {
                render(child, $domElm);
            })

    }

    // append this element

    $container.appendChild($domElm)

}



const dispatchRender = () => {
    stateCursor = 0;
    document.querySelector('#app').firstChild.remove();
    render(<App />, document.querySelector('#app'));
}

render(<App />, document.querySelector('#app'));

