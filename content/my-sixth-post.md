+++
title = 'Understanding useEffect in React: Use Cases, Examples & Best Practices'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "React’s useEffect is one of the most powerful and essential hooks in the React ecosystem. Yet, it’s also one of the most misunderstood. Whether you're fetching data, manipulating the DOM, or syncing with external systems—useEffect is your go-to solution."
image = "https://kinsta.com/wp-content/uploads/2023/05/react-useeffect.jpg"
imageBig = "https://kinsta.com/wp-content/uploads/2023/05/react-useeffect.jpg"
categories = ["general", "technology", "coding","react"]
authors = ["MK Dev"]
avatar = "/images/avatar.webp"
+++

The `useEffect` Hook is a fundamental aspect of React that allows developers to handle side effects in functional components. Introduced in React 16.8, it replaces the need for class-based lifecycle methods, enabling a more streamlined approach to managing side effects such as data fetching, subscriptions, or manually changing the DOM.

**Understanding `useEffect`**

In functional components, side effects are operations that interact with the outside world or affect the component outside of rendering, such as fetching data from an API, setting up a subscription, or manually manipulating the DOM. The `useEffect` Hook provides a way to perform these side effects.

The basic syntax of `useEffect` is:

```jsx
useEffect(() => {
  // Side effect logic here

  return () => {
    // Cleanup logic here (optional)
  };
}, [dependencies]);
```


Here, the first argument is a function containing the side effect logic, and the second argument is an optional array of dependencies that determine when the effect should re-run. If the dependencies change, the effect is executed again.

**Common Use Cases for `useEffect`**

**Fetching Data from an API**

   One of the most common use cases for `useEffect` is fetching data when a component mounts. By providing an empty dependency array, the effect runs only once after the initial render.

   ```jsx
   import React, { useState, useEffect } from 'react';

   function DataFetchingComponent() {
     const [data, setData] = useState([]);

     useEffect(() => {
       async function fetchData() {
         const response = await fetch('https://api.example.com/data');
         const result = await response.json();
         setData(result);
       }
       fetchData();
     }, []); // Empty dependency array ensures this runs once

     return (
       <div>
         {data.map(item => (
           <div key={item.id}>{item.name}</div>
         ))}
       </div>
     );
   }
   ```

   In this example, `fetchData` is called once when the component mounts, and the fetched data is stored in the component's state.

**Subscribing to External Data Sources**

   `useEffect` is also useful for setting up subscriptions to external data sources or event listeners. It's important to clean up these subscriptions to prevent memory leaks.

   ```jsx
   import React, { useState, useEffect } from 'react';

   function WindowWidthComponent() {
     const [width, setWidth] = useState(window.innerWidth);

     useEffect(() => {
       function handleResize() {
         setWidth(window.innerWidth);
       }

       window.addEventListener('resize', handleResize);

       // Cleanup function
       return () => {
         window.removeEventListener('resize', handleResize);
       };
     }, []); // Empty dependency array ensures this runs once

     return <div>Window width: {width}</div>;
   }
   ```

   Here, an event listener is added to track window resize events, and the cleanup function removes the listener when the component unmounts.

**Animating Components on State Change**

   `useEffect` can trigger animations in response to state changes. For instance, you might want to animate a shopping cart icon when a new item is added.

   ```jsx
   import React, { useState, useEffect } from 'react';

   function ShoppingCart({ items }) {
     const [isAnimating, setIsAnimating] = useState(false);

     useEffect(() => {
       if (items.length > 0) {
         setIsAnimating(true);
         const timer = setTimeout(() => setIsAnimating(false), 300);
         return () => clearTimeout(timer);
       }
     }, [items]); // Runs when 'items' changes

     return (
       <div className={isAnimating ? 'cart animate' : 'cart'}>
         {/* Render cart items */}
       </div>
     );
   }
   ```

   In this case, the effect watches the `items` array, and when it changes (i.e., when a new item is added), it triggers an animation that lasts for 300 milliseconds.

**Best Practices for Using `useEffect`**

- **Specify Dependencies Accurately:** Always include all state and props that the effect relies on in the dependency array to ensure the effect runs correctly.

- **Clean Up Side Effects:** Return a cleanup function from within the effect to clean up subscriptions or timers, preventing potential memory leaks.

- **Avoid Overusing `useEffect`:** Not all logic belongs inside `useEffect`. For example, computations that can be performed during rendering should not be placed inside `useEffect`.

**Conclusion**

The `useEffect` Hook is a powerful tool that simplifies handling side effects in React functional components. By understanding its usage and following best practices, developers can write more efficient and maintainable code. Whether it's fetching data, setting up subscriptions, or triggering animations, `useEffect` provides a declarative approach to managing side effects in React applications.

*References:*

- [React useEffect Hooks - W3Schools](https://www.w3schools.com/react/react_useeffect.asp)

- [How the useEffect Hook Works (with Examples) - Dave Ceddia](https://daveceddia.com/useeffect-hook-examples/)

- [6 use cases of the useEffect ReactJS hook - DEV Community](https://dev.to/colocodes/6-use-cases-of-the-useeffect-reactjs-hook-282o) 