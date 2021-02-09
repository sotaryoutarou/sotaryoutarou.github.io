import Typography from "typography"

const typography = new Typography({
  headerFontFamily: [
    "Hiragino Kaku Gothic Pro",
    "ヒラギノ角ゴ Pro",
    "Yu Gothic Medium",
    "游ゴシック Medium",
    "YuGothic",
    "游ゴシック体",
    "メイリオ",
    "sans-serif",
  ],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
