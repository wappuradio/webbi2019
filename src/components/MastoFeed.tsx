import React, {
  useEffect,
  useRef,
  useState,
} from "react";

const createMastodonDom = () => {
  // Side-dom outside of our react app
  const placeholder = document.createElement('div')
  placeholder.id = 'mastodon-loader'
  placeholder.style = 'display:none'
  document.body.appendChild(placeholder)
  
  // The link element below is a magic element which emfed locates & replaces with fetched list
  var link = document.createElement('a');
  link.href = 'https://mementomori.social/@wappuradio'
  link.setAttribute('data-toot-limit', '8')
  link.className = 'mastodon-feed'
  placeholder.appendChild(link)  

  // Dynamically appending emfed script to trigger loading
  var script = document.createElement('script');
  script.type = 'module'
  script.src =  'https://esm.sh/emfed@1'
  script.crossOrigin = 'anonymous'
  script.async = true
  placeholder.appendChild(script)
}

const MastoFeed = () => {
  const [feedDom, setFeedDom] = useState('');
  const intervalId = useRef(null as any)
  
  useEffect(() => {
    if(intervalId.current == 0){
      return;
    }
    // emfed directly changes DOM. This effect renders mastodon feed to hidden dom element, which is then displayed for react to render
    // This is due to two things:
    // - if user would navigate between routes fast enough, then the dom element might be missing when script is loaded
    // - since emfed is es6 module, side-effects only get triggered when module is evaluated. Re-evaluation doesn't happen if script is removed & re-added
    const findToots = () => {
      return document.querySelectorAll("#mastodon-loader .toots .toot").length > 0
    }
    
    if(findToots()){
      // We have our side dom loaded, we can safely set toots
      const mastodonLoader = document.getElementById('mastodon-loader')!;
      setFeedDom(mastodonLoader.innerHTML);
      return;
    }
    // Using interval to force re-render of mastofeed. This works due to intervalId changing and being marked in our effect deps
    // This is needed since we have no other easy way to hook into emfed mastodon calls at component level
    intervalId.current = setTimeout(() => {
      if(findToots()){
        // Toots loaded, clearing interval 
        clearTimeout(intervalId.current)
        intervalId.current = 0;
      }
    }, 100)
    
    // Creating the actual side-dom
    createMastodonDom();

  }, [intervalId.current])

  return (
    <>  
      <section id="mastodon-feed">
        <div dangerouslySetInnerHTML={{ __html: feedDom}}></div>
        <link rel="stylesheet" type="text/css" href="/toots.css"></link>
      </section>
    </>
  );
};

export default MastoFeed;
