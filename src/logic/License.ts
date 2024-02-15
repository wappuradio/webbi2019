export const fetchLicenses: Promise<string> =
    fetch('https://wappuradio.fi/api/licenses')
        .then(response => {
            if (response.body != null) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                const textFromIntra: Promise<string> = reader.read().then((result) => {
                    const decodedText = decoder.decode(result.value);
                    return Promise.resolve(decodedText);
                })

                return Promise.resolve(textFromIntra);
            }
            return Promise.resolve("Tietoja ei voitu ladata.");

        }).catch(() => {
            return Promise.resolve("Tietoja ei voitu ladata.")
        });
