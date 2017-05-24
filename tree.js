const ramda = require('ramda');
const treeFromPath = require('./treeFromPath');

function mergeChildren(key, left, right) {
  switch(key) {
    case 'childrenFiles':
      const result = ramda.concat(left, right);
      return result;
      break;
    case 'childrenDirs':
      return right;
      break;
    default:
      return right;
  }
}

function tree(paths) {
  return paths.reduce((tree, path) => {
    const newTree = treeFromPath(path);
    const mergedTree = ramda.mergeDeepWithKey(
      mergeChildren,
      tree,
      newTree
    );
    return mergedTree;
  }, {});
}

module.exports = tree;
