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

  isBalanced(node = this.root) {
    // balanced tree = difference of heights of left and right subtree 
    // of every node is not more than 1
    if (node === null) {
      return true;
    }
    const leftHeight = this.height(node.leftChild);
    const rightHeight = this.height(node.rightChild);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.leftChild) && this.isBalanced(node.rightChild);
  }

  rebalance() {
    const inOrder = this.inOrder();
    this.root = this.buildTree(inOrder);
  }
}

// Testing
array = [13, 17, 38, 57, 7, 10, 18];

const bst = new Tree(array);

if (bst.isBalanced()) {
  console.log("Binary Search Tree Balanced:");
  prettyPrint(bst.root);
  console.log(`Level Order:\n${bst.levelOrder()}\n`);
  console.log(`Pre Order:\n${bst.preOrder()}\n`);
  console.log(`Post Order:\n${bst.postOrder()}\n`);
  console.log(`In Order:\n${bst.inOrder()}\n`);

  const numsToAdd = 10;
  for (let i = 0; i < numsToAdd; i++) {
    const num = Math.round(Math.random() * 100);
    bst.insert(num);
  }
  prettyPrint(bst.root);

  if (bst.isBalanced()) {
    console.log("Tree is BALANCED");
  } 
  else {
    console.log("Tree is UNBALANCED\n");
    bst.rebalance();
    prettyPrint(bst.root);
    if (bst.isBalanced()) {
      console.log("Tree is now balanced :)");
      console.log(`Level Order:\n${bst.levelOrder()}\n`);
      console.log(`Pre Order:\n${bst.preOrder()}\n`);
      console.log(`Post Order:\n${bst.postOrder()}\n`);
      console.log(`In Order:\n${bst.inOrder()}\n`);
    }
  }
} else {
  console.log("Binary Search Tree NOT Balanced:");
  prettyPrint(bst.root);
}