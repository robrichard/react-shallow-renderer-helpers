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
shallowHelpers.findType(component, 'test');

// returns
<div className="test">Test</div>
```

### renderWithContext
Workaround for shallow rendering components with context.
see https://github.com/facebook/react/issues/3721#issuecomment-106318499

```javascript
var output = shallowHelpers.renderWithContext(() =>
  <MyComponent
    with={props}
    and={stuff}
  />,
  { here: 'is', my: 'context'}
);
```
