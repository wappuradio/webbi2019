import React, { Component } from 'react';
import * as emfed from 'emfed/dist/core.js';

import '../style/toots.scss';

// Very ugly method to fix the issue where emfed doesnt
// rerender correctly if page is changed.
// TODO - someone who knows how to do this properly with React fix this.
// Current solution is very bad but works from browsers point of view -- Henri

// Correct way to use this would be:
// - import loadToots
// - use it to load the feed & render it
// However emfed is not compatible with react+webpack -setup so this insanity is done.
// And the dynamic script import has a immediate side effect of looking up an element and setting feed to it.
let first = true;
let toots: HTMLElement | undefined = undefined;
let elementToLink: HTMLElement | undefined = undefined;

class MastoFeed extends Component {
  state = {}
  containerRef = React.createRef<HTMLElement>();
  componentWillUnmount(): void {
    // Component is unmounting. Check if toots is not yet found, if so, emfed import is not yet done
    // and we need to create a fake <a> mastodon-feed to document so content can be found.
    if(!toots)
    {
      elementToLink = (document.getElementsByClassName("mastodon-feed").item(0) as HTMLElement).parentElement!;
      elementToLink.style.display = "none";
      document.body.appendChild(elementToLink);
    }
  }
  componentDidMount(): void {
    if(first)
    {
      elementToLink = (document.getElementsByClassName("mastodon-feed").item(0) as HTMLElement).parentElement!;
      first = false;
      let interval = 0;
      const findToots = ()=>{
        console.log("Finding toots");
        const tootsOl = elementToLink!.getElementsByClassName("toots");
        if(tootsOl.length>0)
        {
          console.log("Found toots");
          toots = tootsOl.item(0)?.parentElement as HTMLElement;
          window.clearInterval(interval);
        }
      }
      interval = window.setInterval(findToots, 100);
      emfed.loadAll();
    }
    else if(toots){
      this.containerRef.current!.innerHTML = toots.innerHTML;
    }
  }
  render() {
    if(toots)
    {
      return React.createElement("section", {ref: this.containerRef}, null)
    }
    else
    {
      return (
        <section>
          <a className="mastodon-feed" href="https://mementomori.social/@wappuradio" data-toot-limit="8" data-exclude-replies="true" data-exclude-reblogs="true"></a>
        </section>
      )
    }
  }
}

export default MastoFeed;
