import React, { FunctionComponent } from 'react';

interface InfoProps {
  infoData: string
}

const Info: FunctionComponent<InfoProps> = ({infoData}) => (
  <section className='view-container'>
    <h1>Rakkauden Wappuradio</h1>
    <p><strong>Rakkauden Wappuradio&trade;</strong> lähettää ohjelmaa taas <strong>15.4.2019 klo 14</strong> alkaen ympäri vuorokauden aina wappuaattoon asti. Kuuntele Tampereen alueella taajuudella <strong>106,4 MHz</strong> tai netissä. Meillä on tänä vuonna nopeesti laskien kymmenes lähetys, joten se on varmaan sitten jotenkin juhlavampi! Liity siis hypetysjoukkoihin <a href='https://t.me/wappuradio' target='_blank'>Telegram</a>-ryhmässä tai IRCnetissä kanavalla <strong>#wappuradio</strong>.</p>
    <p>Rakkauden Wappuradio sai alkunsa vuonna 2010 Tampereen Teekkarien PerinneSeuran ja Tampereen teekkarien radiokerhon yhteistyöprojektista, mutta noista päivistä tekijäjoukko on laajentunut rajusti. Wappuradiossa toimii tällä hetkellä monipuolinen tiimi, joita yhdistää kiinnostus tekniikkaan, radion tekemiseen ja Wappuun. Rakkauden Wappuradio jatkaa viimevuosien perinteitä ja tulee korvaasi radion välityksellä taas 15.4.–30.4. Välitämme Wapun ilosanomaa teekkarihengessä radiotaajuuksilla ja internetissä. Tänäkin vuonna aiomme olla maailman paras tamperelainen Wappuradio.</p>
    {infoData.trim().length > 0 && (
      <div>
        <h2>Infoa Wappuradiosta</h2>
        <p>
          {infoData}
        </p>
      </div>
    )}
    <h2>Ota yhteyttä</h2>
    <p>Onko jutut huonoja? Onko musiikki väärää? Eikö mielipidettäsi kuunnella? Voiko miehet tehdä täydellistä fronside ollieta? Ota yhteyttä, kysy, kehu, valita.</p>
    <p>Päätoimitus: <a href='mailto:wappuradio@wappuradio.fi'>wappuradio@wappuradio.fi</a><br />Nettisivut: <a href='mailto:webmaster@wappuradio.fi'>webmaster@wappuradio.fi</a><br />Mainosmyynti: <a href='mailto:mainosmyynti@wappuradio.fi'>mainosmyynti@wappuradio.fi</a></p>
    <p>Päätoimitus 2019: Jaakko Airasmaa, Helky Kouri, Ruut Luoto, Tuulia Kusmin.</p>
  </section>
);

export default Info;
