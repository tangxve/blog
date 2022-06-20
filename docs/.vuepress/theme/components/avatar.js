import html2canvas from 'html2canvas'

export const AvatarStyleCount = {
  face: 15,
  nose: 13,
  mouth: 19,
  eyes: 13,
  eyebrows: 15,
  glasses: 14,
  hair: 58,
  accessories: 14,
  details: 13,
  beard: 16,
}

export const SVGFilter = `<defs>
  <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
    <feMorphology operator="dilate" radius="20 20" in="SourceAlpha" result="morphology"/>
    <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
    <feComposite in="flood" in2="morphology" operator="in" result="composite"/>
    <feMerge result="merge">
          <feMergeNode in="composite" result="mergeNode"/>
      <feMergeNode in="SourceGraphic" result="mergeNode1"/>
      </feMerge>
  </filter>
</defs>`;

export const generatePreview = async function (flipped = true) {
  const config = getRandomStyle()

  const avatarStyleCounts = Object.keys(AvatarStyleCount).map(async (type) => {
    const svgRaw = (
      await require(`!!raw-loader!/docs/.vuepress/public/avatar/preview/${type}/${config[type]}.svg`)
    ).default

    return `\n<g id="notion-avatar-${type}" ${
      type === 'face' ? 'fill="#ffffff"' : ''
    } ${flipped ? 'transform="scale(-1,1) translate(-1080, 0)"' : ''}>\n
      ${svgRaw.replace(/<svg.*(?=>)>/, '').replace('</svg>', '')}
    \n</g>\n`;
  });

  const groups = await Promise.all(avatarStyleCounts);

  const previewSvg =
    `<svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${SVGFilter}
      <g id="notion-avatar" filter="url(#filter)">
        ${groups.join('\n\n')}
      </g>
      </svg>`
      .trim()
      .replace(/(\n|\t)/g, '');

  console.log('previewSvg', previewSvg)

  return previewSvg
}

export const getRandomStyle = function () {
  const config = Object.keys(AvatarStyleCount).reduce((prev, next) => {
    return Object.assign(prev, {
      [next]: Math.floor(Math.random() * AvatarStyleCount[next] + 1)
    })
  }, {})


  // for harmony
  // config.beard = 0;
  // config.details = 0;
  // config.accessories = 0;


  // for festival
  // const festival = getCurrentFestival();
  // if (festival) {
  //   config[festival] = Math.floor(
  //     Math.random() * (Number(AvatarStyleCountExtra[festival]) + 1),
  //   );
  // }


  return config
}

export const downloadAvatar = async function () {
  const innerHTML = await generatePreview()
  const svgElement = document.createElement('div')
  svgElement.innerHTML = innerHTML
  svgElement.style.display = 'none'

  document.body.appendChild(svgElement);

  const canvas = await html2canvas(svgElement, {
    logging: false,
    scale: window.devicePixelRatio,
    width: svgElement.offsetWidth,
    height: svgElement.offsetHeight,
  })


  let imageURL = canvas.toDataURL()

  return imageURL
}
