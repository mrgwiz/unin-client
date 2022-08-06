export const colorNames = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
const colors = {
    red: "#e53e3e",
    orange: "#dd6b20",
    yellow: "#d69e2e",
    green: "#38a169",
    blue: "#3182ce",
    purple: "#805ad5",
    pink: "#d53f8c"
};
export default colors;

export const makeLinearGradient = (percents:number[]): string => {
    const colorList = colorNames.map(c => colors[c]);

    let gradients = [];
    let total = 0;
    for (let i = 0; i < colorList.length; i++) {
        let percent = percents[i];
        gradients.push(`${colorList[i]} ${percent + (i) ? total : 0}%`);
        total += percent;
        gradients.push(`${colorList[i]} ${total}%`);
    }
    return `linear-gradient(to right, ${gradients.join(',')})`;
}
