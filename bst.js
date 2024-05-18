const { count } = require("console");

// For visualization of results
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

class Node {
  constructor(value){
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = Array.from(new Set(array.sort((a, b) => a - b)));
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray) {
    //console.log("Sorted Array:", sortedArray);
    if (sortedArray.length === 0) return null;

    const middle = Math.floor(sortedArray.length / 2);
    const left = sortedArray.slice(0, middle);
    const right = sortedArray.slice(middle + 1);

    //console.log("New node:", sortedArray[middle])
    //console.log("Left:", left)
    //console.log("Right:", right)

    const newNode = new Node(sortedArray[middle]);
    //console.log("New Node:", newNode.value);

    newNode.leftChild = this.buildTree(left);
    //console.log("Left Child of", newNode.value, ":", newNode.leftChild);

    newNode.rightChild = this.buildTree(right);
    //console.log("Right Child of", newNode.value, ":", newNode.rightChild);

    return newNode;
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    } else {
      // Searching tree
      if (root.value < value) {
        root.rightChild = this.insert(value, root.rightChild);
      } else if (root.value > value) {
        root.leftChild = this.insert(value, root.leftChild);
      } else {
        return null;
      }
      return root;
    }
  }

  find(value, root = this.root) {
    if (root === null || root.value === value) {
      return root;
    } 
    if (value < root.value) {
      return this.find(value, root.leftChild);
    } 
    else if (value > root.value) {
      return this.find(value, root.rightChild);
    }
    return null;
  }

  deleteItem(value, root = this.root) {
    // Base case: if root is null return null
    if (root === null) {
      return null;
    }
    if (value < root.value) {
      root.leftChild = this.deleteItem(value, root.leftChild);
    } else if (value > root.value) {
      root.rightChild = this.deleteItem(value, root.rightChild);
    } else { // value = root
      // 3 cases: 
      // 1) no children - delete node
      if (root.leftChild === null && root.rightChild === null) {
        return null;
      }
      // 2) one child - bump up child?
      if (root.leftChild === null) {
        return root.rightChild;
      }
      if (root.rightChild === null) {
        return root.leftChild;
      }
      // 3) two children 
      let tempNode = root.rightChild;
      while (tempNode.leftChild !== null) {
        tempNode = tempNode.leftChild
      }
      root.value = tempNode.value;
      root.rightChild = this.deleteItem(tempNode.value, root.rightChild);
    }

    return root;
  }

  levelOrder(root = this.root) {
    if (root === null) {
      return [];
    }
    let queue = []; //FIFO
    let orderResult = [];
    queue.push(root);
    while (queue.length > 0) {
      let current = queue.shift();
      orderResult.push(current.value);
      if (current.leftChild !== null) {
        queue.push(current.leftChild);
      }
      if (current.rightChild !== null) {
        queue.push(current.rightChild);
      }
    }
    return orderResult;
  }

  inOrder(root = this.root) {
    // left -> root -> right
    if (root === null) {
      return [];
    }
    let results = [];
    results = results.concat(this.inOrder(root.leftChild));
    results.push(root.value);
    results = results.concat(this.inOrder(root.rightChild));
    return results;
  }

  preOrder(root = this.root) {
    // root -> left -> right
    if (root === null) {
      return [];
    }
    let results = [];
    results.push(root.value)
    results = results.concat(this.preOrder(root.leftChild));
    results = results.concat(this.preOrder(root.rightChild));
    return results;
  }

  postOrder(root = this.root) {
    // left -> right -> root
    if (root === null) {
      return [];
    }
    let results = [];
    results = results.concat(this.postOrder(root.leftChild));
    results = results.concat(this.postOrder(root.rightChild));
    results.push(root.value);
    return results;
  }

  // Number of edges to a leaf node
  height(node) {
    if (node === null) {
      return -1;
    } else {
      const leftHeight = this.height(node.leftChild);
      const rightHeight = this.height(node.rightChild);
      return Math.max(leftHeight, rightHeight) + 1
    }
  }

  // Number of edges to the tree's root node
  depth(node, root = this.root, level = 0) {
    /*console.log("Checking node:", node ? node.value : null);
    console.log("Current root:", root ? root.value : null);
    console.log("Current level:", level);
    console.log()*/

    if (!node) {
      return null;
    }
    if (root === null) {
      return 0;
    } 
    // If value of root == target node
    if (root.value === node.value) {
      //console.log("found node:", node.value)
      return level;
    }
    // search tree and increase level as you go
    let countLeft = this.depth(node, root.leftChild, level + 1);
    let countRight = this.depth(node, root.rightChild, level + 1);
    
    // Choose the maximum depth from left and right subtrees
    if (countLeft !== null && countRight !== null) {
        return Math.max(countLeft, countRight);
    } else if (countLeft !== null) {
        return countLeft;
    } else {
        return countRight;
    }
  } 

  isBalanced() {

  }
}


const a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const TREE = new Tree(a);
TREE.insert(69);
//console.log(prettyPrint(TREE.root));
console.log(prettyPrint(TREE.root));
/*
console.log(TREE.levelOrder())
console.log(TREE.inOrder());
console.log(TREE.preOrder());
console.log(TREE.postOrder());
console.log(TREE.height(TREE.find(67)));
*/
console.log()
console.log(TREE.depth(TREE.find(69)));
/*
const b = [1, 6, 8]
const TREE2 = new Tree(b);
TREE2.insert(5);
TREE2.insert(7);
TREE2.insert(32);
TREE2.insert(4);
console.log(prettyPrint(TREE2.root))
TREE2.deleteItem(1);
console.log(prettyPrint(TREE2.root))
console.log(TREE2.levelOrder());
*/