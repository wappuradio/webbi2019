import React, { FunctionComponent } from 'react';
const ReactMarkdown = require('react-markdown');

interface InfoProps {
  infoData: string,
  licenseData: string
}

const Info: FunctionComponent<InfoProps> = ({infoData, licenseData}) => (
  <section className='view-container'>
    <h1>Rakkauden Wappuradio</h1>
    <p><i><strong>Rakkauden Wappuradio&trade;</strong> is a student radio station based in Tampere, Finland.
            The station was founded in 2010 and broadcasts every year for two weeks at the end of April.
            Rakkauden Wappuradio reaches over 2,000 listeners over local FM and worldwide over the Internet.
            The target audience is students and young professionals. The primary language is Finnish, with intermittent international programming.
    </i></p>
    <p><strong>Rakkauden Wappuradio&trade;</strong> lähettää ohjelmaa taas <strong>1x.4.2020&nbsp;klo&nbsp;14</strong> alkaen ympäri vuorokauden aina wappuaattoon asti. Kuuntele Tampereen alueella taajuudella <strong>106,4&nbsp;MHz</strong> tai netissä. Liity hypetysjoukkoihin <a href='https://t.me/wappuradio' target='_blank'>Telegram</a>-ryhmässä tai IRCnetissä kanavalla <strong>#wappuradio</strong>.</p>
    <p>Rakkauden Wappuradio sai alkunsa vuonna 2010 Tampereen Teekkarien PerinneSeuran ja Tampereen teekkarien radiokerhon yhteistyöprojektista, mutta noista päivistä tekijäjoukko on laajentunut rajusti. Wappuradiossa toimii tällä hetkellä monipuolinen tiimi, joita yhdistää kiinnostus tekniikkaan, radion tekemiseen ja Wappuun. Rakkauden Wappuradio jatkaa viimevuosien perinteitä ja tulee korvaasi radion välityksellä taas 15.4.–30.4. Välitämme Wapun ilosanomaa teekkarihengessä radiotaajuuksilla ja internetissä. Tänäkin vuonna aiomme olla maailman paras tamperelainen Wappuradio.</p>
    {/*infoData.trim().length > 0 && (
      <div>
        <h2>Infoa Wappuradiosta</h2>
        <p>
          {infoData}
        </p>
      </div>
    )*/}
    <h2>Ota yhteyttä / Contact</h2>
    <p>Onko jutut huonoja? Onko musiikki väärää? Eikö mielipidettäsi kuunnella? Voiko miehet tehdä täydellistä fronside ollieta? Ota yhteyttä, kysy, kehu, valita.</p>
    <p>Päätoimitus / Editors: <a href='mailto:wappuradio@wappuradio.fi'>wappuradio@wappuradio.fi</a><br />Mainosmyynti / Advertisements: <a href='mailto:mainosmyynti@wappuradio.fi'>mainosmyynti@wappuradio.fi</a><br />Webmaster: <a href='mailto:webmaster@wappuradio.fi'>webmaster@wappuradio.fi</a></p>
    <p>Päätoimitus 2019: Jaakko Airasmaa, Helky Kouri, Tuulia Kusmin</p>
    <p>Päätoimitus 2020: Petra Oksa, Jukka-Pekka Venttola, Matti Tuomas</p>
    <div className='licenses'>
      <h3>Lisenssit</h3>
      <p>Radiossa saatetaan käyttää seuraavia lisenssin alaisia äänitteitä:</p>
      <ReactMarkdown source={licenseData} disallowedTypes={['heading']} />
    </div>
  </section>
);

export default Info;
