export class Quiz {
    constructor(
        // tslint:disable-next-line: variable-name
        public Question?: string,
        public Answer1?: string,
        public Answer2?: string,
        public Answer3?: string,
        public Answer4?: string,
        public CorrectAnswer?: string,
        public AboutQuiz?: string,
        public Specialist?: string
    ) {}
}
