// For visualization of results
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

class Node
{
  constructor(value){
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree
{
  constructor(array){
    const sortedArray = Array.from(new Set(array.sort((a, b) => a - b)));
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray)
  {
    if (sortedArray.length === 0) return null;
    console.log(sortedArray);

    const middle = Math.floor(sortedArray.length / 2);
    const left = sortedArray.slice(0, middle);
    const right = sortedArray.slice(middle + 1);

    const newNode = new Node(sortedArray[middle]);
    newNode.leftChild = this.buildTree(left);
    newNode.rightChild = this.buildTree(right);

    return newNode;
  }
}

a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(a);
console.log(bst.buildTree())