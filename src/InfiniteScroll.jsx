import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';

const InifiniteScroll = (props) => {
  const {
    getScrollOwnerRef, getContentRef, children, loadMore, threshold, loader,
    hasMore, isLoading
  } = props;

  const getScrollOwnerEl = useCallback(() => getScrollOwnerRef().current,
    [getScrollOwnerRef]);

  const getContentEl = useCallback(() => getContentRef().current,
    [getContentRef]);

  const [listenersAttached, setListenersAttached] = useState(false);


  const loadMoreData = () => {
    loadMore();
    // eslint-disable-next-line no-use-before-define
    detachScrollListener();
    setListenersAttached(false);
  };

  const shouldLoadMoreData = useCallback(() => {
    const owner = getScrollOwnerEl();
    const content = getContentEl();
    const offset = content.scrollHeight - owner.scrollTop - owner.clientHeight;
    return offset < threshold;
  }, [getScrollOwnerEl, getContentEl, threshold]);

  const scrollListener = debounce(() => {
    if (shouldLoadMoreData()) {
      loadMoreData();
    }
  }, 100);

  const detachScrollListener = () => {
    const scrollOwnerEl = getScrollOwnerEl();
    scrollOwnerEl.removeEventListener(
      'scroll',
      scrollListener
    );
  };

  useEffect(() => {
    const attachScrollListener = () => {
      const scrollOwnerEl = getScrollOwnerEl();

      scrollOwnerEl.addEventListener(
        'scroll',
        scrollListener
      );
      setListenersAttached(true);
    };

    if (hasMore && !isLoading && getScrollOwnerEl() && !listenersAttached) {
      if (shouldLoadMoreData()) {
        loadMore();
      } else {
        attachScrollListener();
      }
    }
  }, [children, hasMore, getScrollOwnerEl, listenersAttached,
    loadMore, shouldLoadMoreData, scrollListener]);


  return (
    <React.Fragment>
      {children}
      {
        hasMore && !listenersAttached
        && loader
      }
    </React.Fragment>
  );
};

InifiniteScroll.propTypes = {
  getScrollOwnerRef: PropTypes.func.isRequired,
  getContentRef: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  loadMore: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  hasMore: PropTypes.bool,
  loader: PropTypes.node,
  isLoading: PropTypes.bool
};

InifiniteScroll.defaultProps = {
  threshold: 100,
  hasMore: true,
  loader: <div>Loading...</div>,
  isLoading: false
};

export default InifiniteScroll;
