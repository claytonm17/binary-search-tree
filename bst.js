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
    if (value < this.root.value) {
      return this.find(value, root.leftChild);
    } 
    else if (value > this.root.value) {
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
}

const a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const TREE = new Tree(a);
TREE.insert(69);
console.log(prettyPrint(TREE.root));
TREE.deleteItem(4);
console.log(prettyPrint(TREE.root));
console.log(TREE.levelOrder())
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