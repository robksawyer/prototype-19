/**
 * MinHeap
 */
class MinHeap {
  /**
   * constructor
   */
  constructor() {
    this.heapList = [null];
    this.count = 0;
  }

  /**
   * add
   * @param {*} value
   */
  add(value) {
    this.count++;
    this.heapList.push(value);
    this.heapifyUp();
  }

  /**
   * heapifyUp
   */
  heapifyUp() {
    let index = this.count;
    while (this.parentIndex(index) > 0) {
      let child = this.heapList[index];
      let parent = this.heapList[this.parentIndex(index)];
      if (parent.totalDistance > child.totalDistance) {
        this.heapList[index] = parent;
        this.heapList[this.parentIndex(index)] = child;
      }
      index = this.parentIndex(index);
    }
  }

  /**
   * heapifyDown
   */
  heapifyDown() {
    let index = 1;
    while (this.childExists(index)) {
      let smallerChildIndex = this.getSmallerChildIndex(index);
      let parent = this.heapList[index];
      let child = this.heapList[smallerChildIndex];
      if (parent.distance > child.distance) {
        this.heapList[smallerChildIndex] = parent;
        this.heapList[index] = child;
      }
      index = smallerChildIndex;
    }
  }

  /**
   * retrieveMin
   * @returns
   */
  retrieveMin() {
    if (this.count === 0) {
      return null;
    }
    let min = this.heapList[1];
    this.heapList[1] = this.heapList[this.count];
    this.count--;
    this.heapList.pop();
    this.heapifyDown();
    return min;
  }

  /**
   * parentIndex
   * @param {*} index
   * @returns
   */
  parentIndex(index) {
    return Math.floor(index / 2);
  }

  /**
   * leftChildIndex
   * @param {*} index
   * @returns
   */
  leftChildIndex(index) {
    return index * 2;
  }

  /**
   * rightChildIndex
   * @param {*} index
   * @returns
   */
  rightChildIndex(index) {
    return index * 2 + 1;
  }

  /**
   * getSmallerChildIndex
   * @param {*} index
   * @returns
   */
  getSmallerChildIndex(index) {
    if (this.rightChildIndex(index) > this.count) {
      return this.leftChildIndex(index);
    }
    let leftChild = this.heapList[this.leftChildIndex(index)];
    let rightChild = this.heapList[this.rightChildIndex(index)];
    if (leftChild.distance < rightChild.distance) {
      return this.leftChildIndex(index);
    } else {
      return this.rightChildIndex(index);
    }
  }

  /**
   * childExists
   * @param {*} index
   * @returns
   */
  childExists(index) {
    return this.leftChildIndex(index) <= this.count;
  }
}
export default MinHeap;
