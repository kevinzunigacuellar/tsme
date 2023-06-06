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

// generic functions
function identity<T>(input: T) {
	return input;
}

const myString = identity("me"); // Type: "me"
const myNumber = identity(123); // Type: 123
const myBoolean = identity(true); // Type: true

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
logWrapper((_input) => {
	// console.log(input.length);
	// Error: Property 'length' does not exist on type 'unknown'.
});

function makeTuple<First, Second>(first: First, second: Second) {
	return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // Type of value: readonly [boolean, string]

// basic interface example generic
interface Box<T> {
	inside: T;
}

const stringBox: Box<string> = {
	inside: "hello",
};

// generic interface
interface BasicNode<T> {
	next?: BasicNode<T>;
	value: T;
}

function getLast<T>(node: BasicNode<T>): T {
	if (node.next === undefined) {
		return node.value;
	}
	return getLast(node.next);
}

const node: BasicNode<string> = {
	value: "foo",
	next: {
		value: "bar",
	},
};

const value = getLast(node);

// generic default
class BasicNodeClass<T = number> {
	next?: BasicNodeClass<T>;
	value: T;

	constructor(value: T) {
		this.value = value;
	}

	getLast(): T {
		if (this.next === undefined) {
			return this.value;
		}
		return this.next.getLast();
	}
}

const nodeClass = new BasicNodeClass("foo");
nodeClass.next = new BasicNodeClass("bar");
const valueClass = nodeClass.getLast();

const nn = new BasicNodeClass(0);

// generics types defaults only can go at the end
function correctExample<T = number, U = string>(input: T, another: U) {}

// incorrect
// function incorrectExample<T = number, U>(input: T, another: U = "foo") {}

interface WithLength {
	length: number;
}

function somethingWithLength<T extends WithLength>(arg: T) {
	console.log(arg.length);
}

somethingWithLength("foo"); // Ok
somethingWithLength([1, 2, 3]); // Ok
somethingWithLength({ length: 10 }); // Ok
//somethingWithLength(10); // Error

/* Funtime */

/*
The first function constrains the key parameter to be a valid key of the object type, 
allowing the return type to be inferred based on the specific key provided. 

The second function allows any key from the object type to be passed but infers 
the return type as a union of all possible property types.
*/
function get<T, Key extends keyof T>(obj: T, key: Key) {
	return obj[key];
}

function get2<T>(obj: T, key: keyof T) {
	return obj[key];
}

const obj = {
	foo: "hello",
	bar: [1, 2, 3],
};

const favorite = get(obj, "foo"); // Type: string
const vvv = get2(obj, "foo"); // Type: string | number[]

const numbers = get(obj, "bar");

// const avoid = get(obj, "baz"); // Error

// mapped types

// using type
type Animals = "alligator" | "baboon" | "cat";

type AnimalCounts = {
	[K in Animals]: number;
};

const animalCounts: AnimalCounts = {
	alligator: 5,
	baboon: 12,
	cat: 3,
};

// using Record
const bbb: Record<Animals, number> = {
	alligator: 5,
	baboon: 12,
	cat: 3,
};

// using interface
interface Animals2 {
	alligator: number;
	baboon: number;
	cat: number;
}

type AnimalCounts2 = {
	[K in keyof Animals2]: number;
};
