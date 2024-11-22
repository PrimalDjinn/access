import { and, eq, or, SQL } from "drizzle-orm";
import type { TableConfig, Table } from "drizzle-orm"

export type TypeFromLiteral<T> =
    T extends 'string' ? string :
    T extends 'number' ? number :
    T extends 'boolean' ? boolean :
    T extends 'bigint' ? bigint :
    T extends 'float' ? number :
    T extends 'double' ? number :
    T extends 'real' ? number :
    T extends 'date' ? Date :
    T extends 'datetime' ? Date :
    T extends 'timestamp' ? Date :
    T extends 'blob' ? Buffer :
    T extends 'buffer' ? Buffer :
    T extends 'json' ? any :
    T extends 'jsonb' ? any :
    T extends 'array' ? any[] :
    T extends 'object' ? Record<string, any> :
    never;

export type TableWithFields<T extends TableConfig> = {
    [Key in keyof T['columns']]: TypeFromLiteral<T['columns'][Key]['dataType']> | null
};

export type TableWithColumns<T extends TableConfig> = Table<T> & {
    [Key in keyof T['columns']]: T['columns'][Key];
};

export type Partial<T> = { [P in keyof T]?: T[P] | null | undefined; }

type JoinStrategy = 'AND' | 'OR';
function q<T extends TableConfig>(
    table: TableWithColumns<T>
): _Q<T>;
function q<T extends TableConfig>(
    table: TableWithColumns<T>,
    data: Partial<TableWithFields<T>>,
    strategy?: JoinStrategy
): SQL;
function q<T extends TableConfig>(
    table: TableWithColumns<T>,
    data?: Partial<TableWithFields<T>>,
    strategy: JoinStrategy = 'AND'
) {
    if (!data) return new _Q(table)
    const keys = Object.keys(data) as (keyof TableWithColumns<T>)[];
    const conditions = keys.map(key => eq(table[key], data[key]));
    return strategy === 'AND' ? and(...conditions) : or(...conditions);
}

class _Q<T extends TableConfig> {
    private conditions: SQL[] = [];
    private readonly table: TableWithColumns<T>;

    constructor(table: TableWithColumns<T>) {
        this.table = table;
    }

    get value(): SQL | undefined {
        return this.conditions.length ? and(...this.conditions) : undefined;
    }

    or(data: Partial<TableWithFields<T>>): this {
        return this.join(data, 'OR');
    }

    and(data: Partial<TableWithFields<T>>): this {
        return this.join(data, 'AND');
    }

    private join(data: Partial<TableWithFields<T>>, strategy: JoinStrategy): this {
        const keys = Object.keys(data) as (keyof TableWithColumns<T>)[];
        const conditions = keys.map(key => eq(this.table[key], data[key]));
        const joinFn = strategy === 'AND' ? and : or;

        if (this.conditions.length) {
            const newConditions = joinFn(...conditions)
            if (newConditions) this.conditions.push(newConditions);
        } else {
            this.conditions = conditions;
        }

        return this;
    }
}

function createQ<T extends TableConfig>(): typeof q & {
    new <T extends TableConfig>(table: TableWithColumns<T>): _Q<T>;
} {
    return new Proxy(q, {
        construct(target, args: [TableWithColumns<T>]) {
            return new _Q<T>(args[0]);
        }
    }) as any;
}

export const Q = createQ();
