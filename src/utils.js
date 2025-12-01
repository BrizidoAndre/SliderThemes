export function capitalizeWords(filename) {
    const name = filename.replaceAll(/-/g, ' ');
    const words = name.split(' ');
    words.forEach((word, index) => {
        words[index] = word[0].toUpperCase() + word.slice(1);
    });
    return words.join(' ').slice(0,-4);
}

export function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
