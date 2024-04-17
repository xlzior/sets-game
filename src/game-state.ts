import {
  type Card,
  containsSet,
  drawCard,
  drawNCardsWithSet,
  isSet,
  shuffle,
} from "./model";

export type SelectableCard = {
  name: Card;
  selected: boolean;
};

export function initialiseState(): SelectableCard[] {
  return drawNCardsWithSet(9).map((card) => ({
    name: card,
    selected: false,
  }));
}

export function toggleCard(
  state: SelectableCard[],
  index: number,
): SelectableCard[] {
  const nextState = state.map((card, i) =>
    i === index ? { ...card, selected: !card.selected } : card,
  );
  return checkSet(nextState);
}

export function selectCard(
  state: SelectableCard[],
  index: number,
): SelectableCard[] {
  const nextState = state.map((card, i) =>
    i === index ? { ...card, selected: true } : card,
  );
  return checkSet(nextState);
}

export function deselectCard(
  state: SelectableCard[],
  index: number,
): SelectableCard[] {
  return state.map((card, i) =>
    i === index ? { ...card, selected: false } : card,
  );
}

export function resetSelection(state: SelectableCard[]): SelectableCard[] {
  return state.map((card) => ({ ...card, selected: false }));
}

export function replaceSet(state: SelectableCard[]): SelectableCard[] {
  state.forEach((card, index) => {
    if (card.selected) {
      let newCard = drawCard();
      while (state.some((c) => c.name === newCard)) {
        newCard = drawCard();
      }
      state[index] = { name: newCard, selected: false };
    }
  });
  if (!containsSet(state.map((card) => card.name))) {
    return replaceSet(state);
  }
  return resetSelection(state);
}

export function checkSet(state: SelectableCard[]): SelectableCard[] {
  const selectedCards = state.filter((card) => card.selected);
  if (selectedCards.length !== 3) return state;

  return isSet(selectedCards.map((card) => card.name))
    ? replaceSet(state)
    : resetSelection(state);
}
