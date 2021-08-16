// eslint-disable-next-line no-unused-vars
import colors from 'tailwindcss/colors';

export default () => {
  let userConfig = {};

  try {
    let customConfig = document.querySelector('script[type="tailwind-config"]').innerText;

    userConfig = eval(`(${customConfig})`) || {};
  } catch (err) {
    //
  }

  return userConfig;
};
