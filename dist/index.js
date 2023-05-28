"use strict";
class Lesson {
    subject;
    constructor(subject) {
        this.subject = subject;
    }
}
class OnlineLesson extends Lesson {
    url;
    constructor(subject, url) {
        super(subject);
        this.url = url;
    }
}
let lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok
let online;
online = new OnlineLesson("coding", "oreilly.com"); // Ok
// online = new Lesson("coding"); // Error
