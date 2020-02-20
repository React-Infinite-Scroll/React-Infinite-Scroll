import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';

const InifiniteScroll = (props) => {
  const {
    getScrollOwnerRef, getContentRef, children, loadMore, threshold
  } = props;

  const getScrollOwnerEl = () => getScrollOwnerRef().current;

  const getContentEl = () => getContentRef().current;

  const [listenersAttached, setListenersAttached] = useState(false);

  const scrollListener = debounce(() => {
    const owner = getScrollOwnerEl();
    const content = getContentEl();
    const offset = content.scrollHeight - owner.scrollTop - owner.clientHeight;
    if (offset < threshold) {
      loadMore();
      // eslint-disable-next-line no-use-before-define
      detachScrollListener();
      setListenersAttached(false);
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
    if (getScrollOwnerEl() && !listenersAttached) {
      attachScrollListener();
    }
  }, [children]);


  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

InifiniteScroll.propTypes = {
  getScrollOwnerRef: PropTypes.func.isRequired,
  getContentRef: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  loadMore: PropTypes.func.isRequired,
  threshold: PropTypes.number
};

InifiniteScroll.defaultProps = {
  threshold: 500
};

export default InifiniteScroll;
