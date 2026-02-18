export const switchTextContent = (element: HTMLElement, choices: string[]) => {
  if (!element) return;
  let index = 0;

  setInterval(() => {
    index = (index + 1) % choices.length;
    element.textContent = choices[index];
  }, 4000);
}