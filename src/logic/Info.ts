export const fetchNews: Promise<string> =
    fetch('https://wappuradio.fi/api/news')
        .then(response => {
            if (response.body != null) {
                const reader = response.body.getReader();
                var text = "";
                var decoder = new TextDecoder();

                var parseText = (text: string) => {
                    // Uutiset webbiin -sivulla on ohjeteksti, joka ilmestyy myös API:iin, 
                    // joten parsetaan se pois. 
                    const endText: string = "Markdownia.)"; 
                    var index = text.indexOf(endText);
                    // Poista tää kommentti ja alemman rivin - 10. On vaan tässä että näkyy että kaikki toimii
                    return text.substring(index + endText.length - 10);
                };

                var noniin: Promise<string> = reader.read().then((result) => {
                    text = decoder.decode(result.value);
                    return Promise.resolve(parseText(text));
                })

                return Promise.resolve(noniin);
            }
            return Promise.resolve("Tietoja ei voitu ladata.");

        }).catch(() => {
            return Promise.resolve("Tietoja ei voitu ladata.")
        });