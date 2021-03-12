import * as React from "react";
import ElementManager from "../../../ElementManager";

export interface IMassCalculatorElement {
  atomic: number;
  quantity: number;
}

function updateQuantity(
  elements: IMassCalculatorElement[],
  atomic: number,
  quantity: number
) {
  const ensureQuantity = quantity ? quantity : 0;

  if (ensureQuantity < 0 || ensureQuantity > 999) {
    return elements;
  }

  const newElements = [...elements].map((element) => {
    if (element.atomic === atomic) {
      return { ...element, quantity: ensureQuantity };
    }

    return element;
  });

  return newElements;
}

export function useMassCalculator() {
  const [elements, setElements] = React.useState<IMassCalculatorElement[]>([
    { atomic: 67, quantity: 1 },
    { atomic: 44, quantity: 1 },
    { atomic: 16, quantity: 1 },
  ]);
  const [editedElement, setEditedElement] = React.useState<number>(-1);

  const currentEditedElement = () =>
    elements.find((element) => element.atomic === editedElement);

  const increaseAmount = () => {
    const currentElement = currentEditedElement();
    if (currentElement) {
      const newElements = updateQuantity(
        elements,
        currentElement.atomic,
        currentElement.quantity + 1
      );
      setElements(newElements);
    }
  };

  const decreaseAmount = () => {
    const currentElement = currentEditedElement();
    if (currentElement) {
      const newElements = updateQuantity(
        elements,
        currentElement.atomic,
        currentElement.quantity - 1
      );
      setElements(newElements);
    }
  };

  const changeAmount = (amount: number) => {
    const currentElement = currentEditedElement();
    if (currentElement) {
      const newElements = updateQuantity(
        elements,
        currentElement.atomic,
        amount
      );
      setElements(newElements);
    }
  };

  const calculateTotalValue = () => {
    let totalValue = 0;

    if (elements.length) {
      totalValue = elements
        .map((element) => {
          const managedElement = ElementManager.getElement(element.atomic);
          if (managedElement) {
            return Number(managedElement.atomicMass) * element.quantity;
          }
          return 0;
        })
        .reduce((previous, current) => previous + current);
    }

    return totalValue;
  };

  const clearElements = () => {
    setElements([]);
  };

  const selectElement = (atomic: number) => {
    setEditedElement(atomic);
  };

  const removeElement = (atomic: number) => {
    setElements(elements.filter((element) => element.atomic !== atomic));
  };

  const addElement = (atomic: number) => {
    const currentElement = elements.find(
      (element) => element.atomic === atomic
    );

    if (currentElement) {
      const newElements = updateQuantity(
        elements,
        atomic,
        currentElement.quantity + 1
      );
      setElements(newElements);
    } else {
      setElements([
        ...elements,
        {
          atomic,
          quantity: 1,
        },
      ]);
    }
  };

  return {
    elements,
    setElements,
    addElement,
    currentEditedElement,
    setEditedElement,
    clearElements,
    selectElement,
    removeElement,
    calculateTotalValue,
    increaseAmount,
    decreaseAmount,
    changeAmount,
  };
}
