let i = 0;

export default {
  statSync: () => {
    return { mtimeMs: ++i };
  },
  readFileSync: id => self[id] || ''
};
