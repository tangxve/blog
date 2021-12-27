// 盒子模型尺寸以及位置
export interface LayoutSchema {
  layerWidth: number,
  layerHeight: number,
  boxWidth: number,
  boxHeight: number,
  contentWidth: number,
  contentHeight: number,
  origin: {
    x: number,
    y: number
  }
}
