export class Weight {
    constructor(
        public weight: number = undefined,
        public date: number = undefined,
        public note: string = null,
        private indicator ?: string,
    ) {}
}