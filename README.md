# React-Infinite-Scroll
[![npm (scoped)](https://img.shields.io/npm/v/@react-infinite-scroll/react-infinite-scroll)](https://www.npmjs.com/package/@react-infinite-scroll/react-infinite-scroll)
[![Build Status](https://travis-ci.com/React-Infinite-Scroll/React-Infinite-Scroll.svg?branch=master)](https://travis-ci.com/React-Infinite-Scroll/React-Infinite-Scroll)

## Installation
`npm i --save @react-infinite-scroll/react-infinite-scroll`

## Usage
`import InfiniteScroll from '@react-infinite-scroll/react-infinite-scroll'`

## Example
```js
const scrollOwnerRef = useRef(null)
const contentRef = useRef(null)


<div style={{overflow: 'auto'}} ref={scrollOwnerRef}> // this element will hold the scrollbar
  <table>
    <tbody ref={contentRef}> // this element will start overflowing
        <InfiniteScroll
          getScrollOwnerRef={() => scrollOwnerRef}
          getContentRef={() => contentRef}
          loadMore={loadItems} // callback to load more items  
          threshold={300} // distance of remaining scroll in pixels to trigger loadMore callback
          loader={<div>Loading items...</div>}
          hasMore={true} // boolean value, set false when you reach your last page.
        >
            {items} // wrap your list of items by InfiniteScroll, loader will be appended to children of InfiniteScroll
        </InfiniteScroll>
    </tbody>
  </table>
</div>
```
## Tips
The loadMore call is dependent on hasMore and items. If both values change and trigger two re renders on the InfiniteScroll component, then loadMore will be called for each re render resulting in total two calls. One of these calls may be duplicate for you.

To avoid unncessary loadMore calls for the same page, try to change these values together and trigger a single re render on the component.

For example, when using Redux, set these two values using the same action.

PS: Please do report issues :)
