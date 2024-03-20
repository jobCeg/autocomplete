# Part 2

### Please answer the following questions to the best of your knowledge, in clear English. Elaborate and demonstrate the React knowledge you have. Feel free to give examples and use cases.

#### DO NOT USE ANY WEB OR OTHER RESOURCE.

1. What is the difference between Component and PureComponent? Give an example where it might break my app.

```
The main difference is how they respond to the parent's prop changes; the PureComponent class component will not re-render until his state or props have changed, since it is doing a shallow comparison. With modern code bases, we can achieve the same with the HOC memo.
Since pure component is doing a shallow comparison before doing the next render, we need to ensure that we are passing all the required info to re-render, including nested object that my mutate.
```

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

```
The same issue happens to memo HOC, if the component relies on context values passed as props even if the context value changes but not the reference (remember that purecomponent/memo are doing shallow comparison), the component itself will face incorrect behaviors. To avoid this it's a better idea to consume the context values directly inside the component.
```

3. Describe 3 ways to pass information from a component to its PARENT.

```
- Passing down a callback function to set the state from the parent > child, calling the callback from the child will mutate the parent state.
- Implement a provider/context, once we wrap our component with the provider, we can access to the function to mutate the parent value (also stored in the context)
- We can rely on third-party state managers, for example redux: we can use a selector to read the store in the parent, and, in the other hand, we can dispatch an action in the child to mutate the property from the store used by the parent.
```

4. Give 2ways to prevent components from re-rendering.

```
- Avoid passing complete objects with data not required as props, if  for some reason, any of the properties are not used but mutated, this will trigger a re-render. We can always use the Memo HOC for shallow comparison, taking into consideration previous comments.
- Memoizing functions or values using useMemo/useCallback hooks, in certain situations, non-memorized functions used as dependencies from other hooks will lead to unwanted re-renders or memory leaks.
```

5. What is afragment and why do weneed it? Givean example where it might break my app.

```
A fragment is a light/invisible wrapper for group children's without adding extra DOM elements. In certain situations, our flex/grid layout can be displayed in unexpected ways, if they expect a single child/parent. Since the fragment itself is not an element in the DOM the childs from the fragment will be rendered in the DOM instead as a single child.
```

6. Give 3 examples of the HOC pattern.

- We can use a HOC to share a logger functionality across components.
- Another example can be a HOC to access the theme values and pass them as props
- And last but not least, we can create a HOC to handle the error boundaries.

Quick example:

```tsx

const withTheme = (WrappedComponent) => {
  return (props) => {
    const theme = useContext(ThemeContext);
    return <WrappedComponent {...props} theme={theme} />;
  };
};
...

const CoolComponent = ({ theme }) => {
  return (
    <div style={{ backgroundColor: theme.background}}>
      <h1>Hello</h1>
    </div>
  );
};

// Wrap MyComponent with withTheme HOC
export const CoolThemedComponent = withTheme(CoolComponent);
```

7. What's the difference in handling exceptions in promises, callbacks and async...await?

```ts
// In promises the exceptions are handled in the method catch
coolPromise.catch(error => {
  // handle your error here
})

// ussing callbacks you need to pass a callback function
const onSuccess = () => {}
const onFail = () => {
 // handle your error here
}

fuction coolFunction(onSuccess, onFail){
  if(something bad happen){
    onfail()
  }
}
coolFunction(onSuccess, onFail)

// Using async/await is a bit similar to promises, since await is waiting for promise resolve
try{
  await coolPromise()
}catch (error){
   // handle your error here
}
```

8. How many arguments does setState take and why is it async.

```
It can take an object or a function as argument, with the function argument you can access to the previous value.
About being async, react under the hood handle the state updates in batches to optimize the amount of re-renders.
```

9. List the steps needed tomigrate a Class to Function Component.

```
- Understand the state and props required by the component
- Check for Lifecycle methods used in order to include them as useEffects.
- identify event handlers used by the component
- refactor class methods and update references to state or handlers inside functional component
```

10. List a few ways styles can be used with components.

- inline style prop
- classNames
- CSS-in-JS like Styled components or emotion
- css utility framework like tailwind (via classNames)

11. How to render an HTML string coming from the server.

```tsx
// You can always use the dangerouslySetInnerHTML attribute, just be careful and dont avoid use user input without sanitize it
<div dangerouslySetInnerHTML={{ __html: htmlString }} />
```
