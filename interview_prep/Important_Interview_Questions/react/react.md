## What is React?
React is a JavaScript library for building user interfaces, developed by Facebook. It allows developers to create reusable UI components and manage the state of the application efficiently.

## What are the key features of React?
Virtual DOM for efficient rendering
Component-based architecture
JSX syntax for writing components
One-way data binding
React Native for building mobile applications

## Explain the Virtual DOM in React.
The Virtual DOM is an in-memory representation of the actual DOM. React uses it to perform efficient updates to the UI. When the state of a component changes, React compares the virtual DOM with the previous version, computes the minimal set of changes needed, and then updates the actual DOM.

## What is JSX?
JSX (JavaScript XML) is a syntax extension for JavaScript that allows developers to write HTML-like code within JavaScript. It makes React component development more intuitive and readable.

## What is the significance of keys in React lists?
Keys are used by React to identify which items have changed, are added, or are removed from a list. They help React efficiently update the UI without re-rendering the entire list.

## What is the difference between props and state in React?
Props (short for properties) are immutable data passed from parent components to child components. They are read-only for the child components.
State is mutable data managed within a component. Changes to state trigger re-rendering of the component.



## What is the significance of useCallback and useMemo hooks?
useCallback: Memoizes a function to prevent unnecessary re-renders of child components that depend on that function.
useMemo: Memoizes the result of a function to prevent unnecessary recalculations.

## What are React Fragments?
React Fragments allow developers to return multiple elements from a component without adding unnecessary nodes to the DOM. They are useful when you don't want to add an extra DOM node.

## What is the Context API in React?
The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It's useful for sharing state between components that are not directly connected in the component tree.

## Explain the purpose of React Router.
React Router is a routing library for React applications. It allows developers to define multiple routes in a single-page application and enables navigation between different components/pages without a full page reload.

## What is Redux, and how does it work with React?
Redux is a predictable state container for JavaScript applications. It helps manage the state of the entire application in a single immutable state tree. React Redux is the official React bindings for Redux, which allows React components to interact with the Redux store.

## What are higher-order components (HOCs) in React?
Higher-order components are functions that take a component as input and return a new component with enhanced functionality. They are used for code reuse, logic abstraction, and composition.

## What are React hooks rules?
Hooks should only be called at the top level of a functional component or from custom hooks.
Hooks should always be called in the same order.
Only call hooks from React functional components or custom hooks.

## How does React handle forms?
React handles forms using controlled components or uncontrolled components. Controlled components manage form data through state, while uncontrolled components manage form data internally using refs.

## What is the purpose of Error Boundaries in React?
Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application.

## Explain the concept of server-side rendering (SSR) in React.
Server-side rendering is the process of rendering React components on the server and sending the generated HTML to the client. It improves performance, SEO, and initial page load time by delivering a fully rendered page to the client.

## What are controlled and uncontrolled components in React?
Controlled components: Components whose behavior is controlled by React using state. Form elements like input fields are controlled components.

Uncontrolled components: Components that maintain their own state internally, typically accessed via refs. They are not controlled by React.
What is the purpose of React hooks?
React hooks are functions that allow functional components to use state and other React features without writing a class. They enable developers to reuse stateful logic across components.
Explain useEffect hook in React.
useEffect is a hook used for performing side effects in functional components. It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.