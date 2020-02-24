import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';

const InifiniteScroll = (props) => {
  const {
    getScrollOwnerRef, getContentRef, children, loadMore, threshold, loader, hasMore
  } = props;

  const getScrollOwnerEl = () => getScrollOwnerRef().current;

  const getContentEl = () => getContentRef().current;

  const [listenersAttached, setListenersAttached] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const scrollListener = debounce(() => {
    const owner = getScrollOwnerEl();
    const content = getContentEl();
    const offset = content.scrollHeight - owner.scrollTop - owner.clientHeight;
    if (offset < threshold) {
      loadMore();
      // eslint-disable-next-line no-use-before-define
      detachScrollListener();
      setListenersAttached(false);
      setShowLoader(true);
    }
  }, 100);

  const attachScrollListener = () => {
    const scrollOwnerEl = getScrollOwnerEl();

    scrollOwnerEl.addEventListener(
      'scroll',
      scrollListener
    );
    setListenersAttached(true);
  };

  const detachScrollListener = () => {
    const scrollOwnerEl = getScrollOwnerEl();
    scrollOwnerEl.removeEventListener(
      'scroll',
      scrollListener
    );
  };

  useEffect(() => {
    if (hasMore && getScrollOwnerEl() && !listenersAttached) {
      attachScrollListener();
      setShowLoader(false);
    }
  }, [children, hasMore]);


  return (
    <React.Fragment>
      {children}
      {
        hasMore && showLoader
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
  loader: PropTypes.node
};

InifiniteScroll.defaultProps = {
  threshold: 500,
  hasMore: false,
  loader: <div>Loading...</div>
};

export default InifiniteScroll;
