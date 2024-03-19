import React, { FunctionComponent } from 'react';
import { Helmet } from "react-helmet";

const MastoFeed: FunctionComponent = () => (
    <section>
    <Helmet>
        <script type="module" src="https://esm.sh/emfed@1" crossOrigin="anonymous" async></script>
    </Helmet>
    <a className="mastodon-feed" href="https://mementomori.social/@Instanssi" data-toot-limit="4"></a>
    <link rel="stylesheet" type="text/css" href="/toots.css"></link>
    </section>
  );

export default MastoFeed;
