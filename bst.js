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

  insert(value, currentNode = this.root)
  {
    if (currentNode === null) return new Node(value);
    if (currentNode.value === value) return;

    if (currentNode.value < value)
    {
      currentNode.rightChild = this.insert(value, currentNode.rightChild);
    }
    else
    {
      currentNode.leftChild = this.insert(value, currentNode.leftChild);
    }
    return currentNode;
  }

  deleteItem(value, currentNode = this.root)
  {
    if (currentNode == null) return currentNode;

    if (value < currentNode.value)
    {
      currentNode.leftChild = this.deleteItem(value, currentNode.leftChild);
    }
    else if (value > currentNode.value)
    {
      currentNode.rightChild = this.deleteItem(value, currentNode.rightChild);
    } 
    else
    {
      // No child or only one child
      if (currentNode.leftChild == null) 
      {
        return currentNode.rightChild;
      }
      else if (currentNode.rightChild == null)
      {
        return currentNode.leftChild;
      }

      // Node with two children
      currentNode.value = this.minValue(currentNode.rightChild);
      currentNode.rightChild = this.deleteItem(currentNode.value, currentNode.rightChild);
    }
    return currentNode;
  }
  minValue(node) {
    let current = node;
    while (current.leftChild !== null) {
      current = current.leftChild;
    }
    return current.value;
  }

  find(value, currentNode = this.root)
  {
    if (currentNode.value === value) return currentNode;

    if (value < currentNode.value){
      return this.find(value, currentNode.leftChild);
    } 
    else if (value > currentNode.value){
      return this.find(value, currentNode.rightChild);
    }
  }
}

a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(a);
prettyPrint(bst.root)
bst.insert(17);
bst.deleteItem(324);
prettyPrint(bst.root)
console.log(bst.find(67))