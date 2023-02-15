import Tailwind from '../src/index'

const html = `
  <button class="bg-blue-500 ring-2 p-3 rounded-lg hover:bg-blue-400 m-10">Click me!</button>
`

const tailwind = new Tailwind();
const css = await tailwind.process({ html, classes: ['bg-blue'] })

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html;

const style = document.createElement('style');
style.innerHTML = css;
document.head.appendChild(style);
