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
    this.cards[index] = {
      ...this.cards[index],
      selected: true,
    };
    this.checkSet();
  }

  deselectCard(index: number) {
    this.cards[index] = {
      ...this.cards[index],
      selected: false,
    };
  }

  resetSelection() {
    this.cards = this.cards.map((card) => ({
      ...card,
      selected: false,
    }));
  }

  replaceSet() {
    this.cards.forEach((card, index) => {
      if (card.selected) {
        let card = drawCard();
        while (this.cards.some((c) => c.name === card)) {
          card = drawCard();
        }
        this.cards[index] = { name: card, selected: false };
      }
    });
    if (!containsSet(this.cards.map((card) => card.name))) {
      this.replaceSet();
    }
    this.resetSelection();
  }

  checkSet() {
    const selectedCards = this.cards.filter((card) => card.selected);
    if (selectedCards.length !== 3) return;

    setTimeout(() => {
      if (isSet(selectedCards.map((card) => card.name))) {
        this.replaceSet();
      } else {
        this.resetSelection();
      }
    }, 100);
  }
}
