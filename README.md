# React-Infinite-Scroll

## Installation
`npm i --save @react-infinite-scroll/react-infinite-scroll`

## Usage
`import InfiniteScroll from '@react-infinite-scroll/react-infinite-scroll'`

## Example
```
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
        >
            {items} // wrap your list of items by InfiniteScroll, loader will be appended to children of InfiniteScroll
        </InfiniteScroll>
    </tbody>
  </table>
</div>
```
