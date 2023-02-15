import Tailwind from '../lib/index'

const html = `
  <button class="bg-blue">Click me!</button>
`

const tailwind = new Tailwind();
const css = await tailwind.process({ html })

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html;

const style = document.createElement('style');
style.innerHTML = css;
document.head.appendChild(style);
