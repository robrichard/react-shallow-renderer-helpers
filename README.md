# react-shallow-renderer-helpers
Helpers for testing with React's shallow renderer

## Documentation

### Example
```javascript
const shallowHelpers = require('react-shallow-renderer-helpers');
class MyInput extends React.Component {
  render() {
      return <div>MyInput</div>
  }
}
const renderer = TestUtils.createRenderer();
const component = renderer.render(
  <div>
    <div className="test">Test</div>
    <div testProp='1'>
      <div>Foo</div>
      <MyInput testProp='1' />
    </div>
  </div>
);
```


### filter(component, predicate)
Recursively searches `component`, returning an array of all children that pass a `predicate`.
```
shallowHelpers.filter(component, function (c) {
  return c.props.testProp === 1;
});

// returns
[
    <div testProp='1'>
      <div>Foo</div>
      <MyInput testProp='1' />
    </div>,
    <MyInput testProp='1' />
]
```

### find(component, predicate)
Recursively searches `component`, returning the first child that passes a `predicate`.
```
shallowHelpers.find(component, function (c) {
  return c.props.testProp === 1;
});

// returns
<div testProp='1'>
  <div>Foo</div>
  <MyInput testProp='1' />
</div>
```

### filterType(component, type)
Recursively searches `component`, returning an array of all children of `type`.
```
shallowHelpers.filterType(component, MyInput);

// returns
[<MyInput testProp='1' />]
```
### findType(component, type)
Recursively searches `component`, returning the first child of `type`.
```
shallowHelpers.findType(component, MyInput);

// returns
<MyInput testProp='1' />
```

### filterClass(component, className)
Recursively searches `component`, returning an array of all children has a className of `className`.
```
shallowHelpers.filterClass(component, 'test');

// returns
[<div className="test">Test</div>]
```
### findClass(component, className)
Recursively searches `component`, returning the first child that has a className of `className`.
```
shallowHelpers.findClass(component, 'test');

// returns
<div className="test">Test</div>
```

### createRenderer
Returns a wrapper around React's shallow renderer that renders with the given context. Also exposes a `getMountedInstance`
method that returns the rendered component instance. This allows for testing state and calling methods directly on the
instance. See https://github.com/facebook/react/issues/3721#issuecomment-106318499 and https://github.com/facebook/react/pull/4918

```javascript
var renderer = shallowHelpers.createRenderer();
renderer.render(() =>
  <MyComponent
    with={props}
    and={stuff}
  />,
  {here: 'is', my: 'context'}
);

var instance = renderer.getMountedInstance();
var testState = instance.state.test;
```

### renderWithContext
Shorthand method for rendering with context without needing to explicitly create a renderer. Useful if you never need
to access the component instance.

```javascript
var output = shallowHelpers.renderWithContext(() =>
  <MyComponent
    with={props}
    and={stuff}
  />,
  {here: 'is', my: 'context'}
);
```

### renderFactory
Returns a method for rendering with context the component passed as a parameter. Useful for testing if
you need a helper method for rendering your component before multiple unit tests.

```javascript
var Component = React.createClass({});
var renderMethod = shallowHelpers.renderFactory(Component);
var renderedComponent = renderMethod(props, context);
```
