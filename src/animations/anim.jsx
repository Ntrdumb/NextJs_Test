import { delay } from "framer-motion"

export const introSlide = {
    initial: {
        x: "calc(-50% - 100px)"
    },
    enter: {
        x: "0%",
        transition: {duration: 1.5, ease: [0.65, 0, 0.35, 1]}
    }
}

export const filterSlide = {
    initial: {
        y: "40px",
        opacity: 0
    },
    enter: (i) => ({
        y: "0px",
        opacity: 1,
        transition: {duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.08 * i}
    })
}

export const priceOpac = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {duration: 2.5, ease: [0.65, 0, 0.35, 1]}
    }
}