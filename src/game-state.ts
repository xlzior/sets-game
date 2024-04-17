import {
  type Card,
  drawCard,
  drawNCardsWithSet,
  isSet,
  shuffle,
} from "./model";

export type SelectableCard = {
  name: Card;
  selected: boolean;
};

export class GameState {
  cards: SelectableCard[] = [];

  constructor() {
    this.cards = drawNCardsWithSet(9).map((card) => ({
      name: card,
      selected: false,
    }));
  }

  shuffle() {
    this.cards = shuffle(this.cards);
  }

  toggleCard(index: number) {
    // TODO: use Immer?
    this.cards[index] = {
      ...this.cards[index],
      selected: !this.cards[index].selected,
    };
    this.checkSet();
  }

  selectCard(index: number) {
    this.cards[index].selected = true;
    this.checkSet();
  }

  deselectCard(index: number) {
    this.cards[index].selected = false;
  }

  resetSelection() {
    this.cards = this.cards.map((card) => ({
      ...card,
      selected: false,
    }));
  }

  replaceSet() {
    const toReplace = [];
    this.cards.forEach((card, index) => {
      if (card.selected) {
        toReplace.push(index);
      }
    });
    for (const index of toReplace) {
      let card = drawCard();
      // draw a new card
      while (this.cards.some((c) => c.name === card)) {
        card = drawCard();
      }
      this.cards[index] = {
        name: card,
        selected: false,
      };
    }
    // TODO: check if the board contains a set
  }

  checkSet() {
    const selectedCards = this.cards.filter((card) => card.selected);
    if (selectedCards.length !== 3) return;

    if (isSet(selectedCards.map((card) => card.name))) {
      this.replaceSet();
    } else {
      this.resetSelection();
    }
  }
}
