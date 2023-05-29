// is type guard
interface Comedian {
	funny: boolean;
}

interface StandupComedian extends Comedian {
	routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
	return "routine" in value;
}

function workWithComedian(value: Comedian) {
	if (isStandupComedian(value)) {
		// Type of value: StandupComedian
		console.log(value.routine); // Ok
	}
	console.log(value.funny); // Ok
	// console.log(value.routine); // Error
}

// keyof and typeof
const colorExample = {
	red: 255,
	green: 0,
	blue: 0,
	alpha: 1,
};

function getRgbColorValue(
	color: typeof colorExample,
	key: keyof typeof colorExample
) {
	return color[key];
}

const red = getRgbColorValue(colorExample, "alpha"); // Ok

// asserting errors
try {
	// do something
} catch (error) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}

// type assertion shorthand
const map = new Map<string, number>();
map.set("foo", 1);
const b = map.get("foo")!; // Ok
b.toFixed(2); // Ok

// generics
function identity<T>(input: T) {
	return input;
}

const myString = identity("me"); // Type: "me"
const myNumber = identity(123); // Type: 123
const myBoolean = identity(true); // Type: true

//
function logWrapper<Input>(callback: (input: Input) => void) {
	return (input: Input) => {
		console.log("Input:", input);
		callback(input);
	};
}

// Type: (input: string) => void
logWrapper((input: string) => {
	console.log(input.length);
});
// Type: (input: string) => void
logWrapper<string>((input) => {
	console.log(input.length);
});

// Type: (input: unknown) => void
logWrapper((input) => {
	// console.log(input.length);
	// Error: Property 'length' does not exist on type 'unknown'.
});

function makeTuple<First, Second>(first: First, second: Second) {
	return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // Type of value: readonly [boolean, string]
