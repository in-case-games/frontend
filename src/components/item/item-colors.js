function generateGradient(color){
    return `linear-gradient(180deg, rgb(${color}, 0) 0%, rgb(${color}, 0.6) 60%)`
}
export const itemGradients = {
    blue: generateGradient("5, 0, 255"),
    gold: generateGradient("255, 199, 0"),
    red: generateGradient("255, 0, 0"),
    pink: generateGradient("173, 0, 255"),
    violet: generateGradient("255, 0, 199"),
    white: generateGradient("255, 255, 255"),
    green: generateGradient("0, 255, 30"),
    gray: generateGradient("211, 211, 211"),
    orange: generateGradient("255, 230, 101")
}

export const itemColors = {
    blue: "#0500FF",
    gold: "#FFC700",
    red: "#FF0000",
    pink: "#AD00FF",
    violet: "#FF00C7",
    white: "#FFFFFF",
    gray: "#d3d3d3",
    orange: "#fe7324",
    green: "#008000"
}