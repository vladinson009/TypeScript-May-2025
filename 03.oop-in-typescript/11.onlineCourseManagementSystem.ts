abstract class Course {
  title: string;
  duration: number;
  constructor(title: string, duration: number) {
    this.title = title;
    this.duration = duration;
  }
  abstract getDescription(): string;
}
class ProgrammingCourse extends Course {
  language: string;
  constructor(title: string, duration: number, language: string) {
    super(title, duration);
    this.language = language;
  }
  override getDescription(): string {
    return `Programming Course: ${this.title} in ${this.language} - ${this.duration} hours`;
  }
}
class DesignCourse extends Course {
  tools: string[];
  constructor(title: string, duration: number, tools: string[]) {
    super(title, duration);
    this.tools = tools;
  }
  override getDescription(): string {
    return `Design Course: ${this.title} using ${this.tools.join(', ')} - ${
      this.duration
    } hours`;
  }
}
const jsCourse = new ProgrammingCourse('Intro to JavaScript', 40, 'JavaScript');
const uiCourse = new DesignCourse('UX Fundamentals', 30, ['Figma', 'Sketch']);

console.log(jsCourse.getDescription());
console.log(uiCourse.getDescription());
/**
 * Programming Course: Intro to JavaScript in JavaScript - 40 hours
Design Course: UX Fundamentals using Figma, Sketch - 30 hours
 */
