import { produce } from "immer";
import {
  type Card,
  containsSet,
  drawCard,
  drawNCardsWithSet,
  isSet,
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
  const nextState = produce(state, (draft) => {
    draft[index].selected = !draft[index].selected;
  });
  return checkSet(nextState);
}
export function selectCard(
  state: SelectableCard[],
  index: number,
): SelectableCard[] {
  const nextState = produce(state, (draft) => {
    draft[index].selected = true;
  });
  return checkSet(nextState);
}

export function deselectCard(
  state: SelectableCard[],
  index: number,
): SelectableCard[] {
  return produce(state, (draft) => {
    draft[index].selected = false;
  });
}

export function resetSelection(state: SelectableCard[]): SelectableCard[] {
  return state.map((card) => ({ ...card, selected: false }));
}

export function replaceSet(state: SelectableCard[]): SelectableCard[] {
  const nextState = produce(state, (draft) => {
    draft.forEach((card, index) => {
      if (card.selected) {
        let newCard = drawCard();
        while (draft.some((c) => c.name === newCard)) {
          newCard = drawCard();
        }
        draft[index] = { name: newCard, selected: false };
      }
    });
  });
  if (containsSet(nextState.map((card) => card.name))) {
    return resetSelection(nextState);
  }
  return replaceSet(nextState);
}

export function checkSet(state: SelectableCard[]): SelectableCard[] {
  const selectedCards = state.filter((card) => card.selected);
  if (selectedCards.length !== 3) return state;

  return isSet(selectedCards.map((card) => card.name))
    ? replaceSet(state)
    : resetSelection(state);
}
