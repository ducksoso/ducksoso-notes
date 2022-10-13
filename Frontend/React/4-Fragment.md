























## Fragment or <></>

页面上多级结构，需要包很多的div

react 新特性：Fragment

`import { Fragment } from 'react'`



```jsx
import React, { Component, Fragment } from 'react';

export default class Demo extends Component {
  render() {
    return (
    	<Fragment>
        <input type="text"/>
        <input type="text"/>
      </Fragment>
    )
  }
}
```

在react渲染的时候会舍去 Fragment 元素



也可以使用空标签，是一样的效果









