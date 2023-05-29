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
