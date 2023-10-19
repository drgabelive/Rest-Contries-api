interface Binding<T> {
    (): T;
}

export class Container {
    private bindings: Map<string, Binding<unknown>>;
    private singletons: Map<string, unknown>;

    constructor() {
        this.bindings = new Map();
        this.singletons = new Map();
    }

    bind<T>(abstract: string, concrete: () => T, singleton = true): void {
        this.bindings.set(abstract, concrete);
        if(singleton){
            this.singletons.set(abstract,concrete())
        }
    }

    resolve<T>(abstract: string): T {
        const binding = this.bindings.get(abstract);
        const singleton = this.singletons.get(abstract);
        if (!binding) {
            throw new Error(`Binding for ${abstract} does not exist`);
        }

        if (singleton){
            return singleton as T
        }

        const concrete = binding as Binding<T>;
        return concrete();
    }
}
