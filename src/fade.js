export const fadeOut = el => {
  const intervalID = setInterval(() => {
    if (!el.style.opacity) el.style.opacity = 1;
    if (el.style.opacity > 0) el.style.opacity -= 0.02;
    else clearInterval(intervalID);
  }, 5);
};

export const fadeIn = el => {
  el.style.opacity = el.style.opacity && !isNaN(Number(el.style.opacity)) ? Number(el.style.opacity) : 0;
  const intervalID = setInterval(() => {
    let opacity = parseFloat(el.style.opacity);
    if (opacity < 1) {
      opacity += 0.02;
      el.style.opacity = opacity;
    } else {
      el.style.opacity = 1;
      clearInterval(intervalID);
    }
  }, 5);
};
