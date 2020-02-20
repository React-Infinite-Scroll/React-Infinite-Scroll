# React-Infinite-Scroll

## Installation
`npm i --save @react-infinite-scroll/react-infinite-scroll`

## Usage
`import InfiniteScroll from '@react-infinite-scroll/react-infinite-scroll'`

## Example
```
<InfiniteScroll
  getScrollOwnerRef={() => scrollOwnerRef} // the element which will have scrollbar
  getContentRef={() => contentRef} // the element which is overflowing in owner element, will contain content
  loadMore={loadUsers} // callback to load more items  
  threshold={300} // distance in pixels to trigger load more callback
>
  <div ref={scrollOwnerRef} style={{overflow: 'auto'}}>
    <div ref={contentRef}>
      {items}
    </div>
  </div>
</InfiniteScroll>
```
