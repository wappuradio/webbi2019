export const fetchNews: Promise<string> =
    fetch('https://wappuradio.fi/api/news')
        .then(response => {
            if (response.body != null) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                const parseText = (text: string) => {
                    // Uutiset webbiin -sivulla on ohjeteksti, joka ilmestyy myös API:iin, 
                    // joten parsetaan se pois. 
                    const endText = "Markdownia.)"; 
                    const index = text.indexOf(endText);
                    return text.substring(index + endText.length);
                };

                const textFromIntra: Promise<string> = reader.read().then((result) => {
                    const decodedText = decoder.decode(result.value);
                    return Promise.resolve(parseText(decodedText));
                })

                return Promise.resolve(textFromIntra);
            }
            return Promise.resolve("Tietoja ei voitu ladata.");

        }).catch(() => {
            return Promise.resolve("Tietoja ei voitu ladata.")
        });