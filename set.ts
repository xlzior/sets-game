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
type Card = `${Colour}-${Shape}-${Shading}`;

const colours: Colour[] = [RED, GREEN, BLUE];
const shapes: Shape[] = [CIRCLE, SQUARE, TRIANGLE];
const shadings: Shading[] = [FILLED, STRIPED, OUTLINED];

const cards = colours.flatMap((colour: Colour) =>
	shapes.flatMap((shape: Shape) =>
		shadings.map((shading) => `${colour}-${shape}-${shading}` as Card),
	),
);

console.log(cards);
