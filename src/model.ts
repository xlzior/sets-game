const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const CIRCLE = "circle";
const SQUARE = "square";
const TRIANGLE = "triangle";
const FILLED = "filled";
const STRIPED = "striped";
const OUTLINED = "outlined";

type Colour = typeof RED | typeof GREEN | typeof BLUE;
type Shape = typeof CIRCLE | typeof SQUARE | typeof TRIANGLE;
type Shading = typeof FILLED | typeof STRIPED | typeof OUTLINED;
export type Card = `${Colour}-${Shape}-${Shading}`;

const colours: Colour[] = [RED, GREEN, BLUE];
const shapes: Shape[] = [CIRCLE, SQUARE, TRIANGLE];
const shadings: Shading[] = [FILLED, STRIPED, OUTLINED];

const cards = colours.flatMap((colour: Colour) =>
	shapes.flatMap((shape: Shape) =>
		shadings.map((shading) => `${colour}-${shape}-${shading}` as Card),
	),
);

export function drawCard(): Card {
	const index = Math.floor(Math.random() * cards.length);
	return cards[index];
}

export function drawNCards(n: number): Card[] {
	const drawnCards: Card[] = [];
	while (drawnCards.length < n) {
		const card = drawCard();
		if (!drawnCards.includes(card)) {
			drawnCards.push(card);
		}
	}
	return drawnCards;
}

export function drawNCardsWithSet(n: number): Card[] {
	let drawnCards: Card[] = drawNCards(n);
	while (!containsSet(drawnCards)) {
		drawnCards = drawNCards(n);
	}
	return drawnCards;
}

export function isSet(cards: Card[]): boolean {
	const colours = new Set<Colour>();
	const shapes = new Set<Shape>();
	const shadings = new Set<Shading>();

	for (const card of cards) {
		const [colour, shape, shading] = card.split("-") as [
			Colour,
			Shape,
			Shading,
		];
		colours.add(colour);
		shapes.add(shape);
		shadings.add(shading);
	}

	return colours.size !== 2 && shapes.size !== 2 && shadings.size !== 2;
}

export function containsSet(cards: Card[]): boolean {
	for (let i = 0; i < cards.length; i++) {
		for (let j = i + 1; j < cards.length; j++) {
			for (let k = j + 1; k < cards.length; k++) {
				if (isSet([cards[i], cards[j], cards[k]])) {
					return true;
				}
			}
		}
	}
	return false;
}

export function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
