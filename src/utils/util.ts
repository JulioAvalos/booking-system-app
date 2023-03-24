export const randomColorAvatar = () => {
    const colorArray = [
        '#000000',
        '#003EFF',
        '#008000',
        '#800080',
        '#B22222',
        '#FF69B4',
        '#EEC900',
        '#EE7600'
    ];
    const length = colorArray.length;
    const value = Math.floor(Math.random() * length) + 1;
    return colorArray[value];
}
