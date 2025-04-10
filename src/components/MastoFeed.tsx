import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import * as emfed from 'emfed/dist/core.js';

import '../style/toots.scss';

const createMastodonDom = () => {
  // Side-dom outside of our react app
  const placeholder = document.createElement('div')
  placeholder.id = 'mastodon-loader'
  placeholder.setAttribute('style', 'display:none');
  document.body.appendChild(placeholder)

  // The link element below is a magic element which emfed locates & replaces with fetched list
  const link = document.createElement('a');
  link.href = 'https://mementomori.social/@wappuradio'
  link.setAttribute('data-toot-limit', '8')
  link.setAttribute('class', 'mastodon-feed')
  placeholder.appendChild(link)
}

const MastoFeed = () => {
  const [feedDom, setFeedDom] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const intervalId = useRef(null as any)

  useEffect(() => {
    // emfed directly changes DOM. This effect renders mastodon feed to hidden dom element, which is then displayed for react to render
    // This is due to two things:
    // - if user would navigate between routes fast enough, then the dom element might be missing when script is loaded
    // - since emfed is es6 module, side-effects only get triggered when module is evaluated. Re-evaluation doesn't happen if script is removed & re-added
    const findToots = () => {
      return document.querySelectorAll("#mastodon-loader .toots .toot").length > 0
    }

    const setToots = () => {
      const mastodonLoader = document.getElementById('mastodon-loader')!;
      setFeedDom(mastodonLoader.innerHTML);
      setIsLoading(false)
    }

    if(intervalId.current === 0 || findToots()){
      setToots()
      return;
    }

    // Creating the actual side-dom
    createMastodonDom();
    emfed.loadAll();

    // Using interval to force re-render of mastofeed. This causes re-render when we set feed dom
    // This is needed since we have no other easy way to hook into emfed mastodon calls at component level
    const checkToots = () => {
      if(findToots()){
        // Toots loaded, clearing interval
        clearTimeout(intervalId.current)
        intervalId.current = 0;
        setToots();
        return;
      }
      intervalId.current = setTimeout(() => checkToots(), 100)
    }
    intervalId.current = setTimeout(() => checkToots(), 100)

    return () => {
      // clearing timeout if it is still present
      if(intervalId && intervalId.current !== 0){
        clearTimeout(intervalId.current)
      }
    }
  }, [])

  return (
    <>
      {isLoading && <div className='spinner'>Uutineet...</div>}
      <section id="mastodon-feed">
        <div dangerouslySetInnerHTML={{ __html: feedDom}}></div>
      </section>
    </>
  );
};

export default MastoFeed;
