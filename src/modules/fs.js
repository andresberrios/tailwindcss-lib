let i = 0;

export default {
  statSync: () => {
    return { mtimeMs: ++i };
  },
  readFileSync: filename => self[filename] || ''
};
