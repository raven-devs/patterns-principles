// npx ts-node src/module/patterns-exercise/singleton.ts

class Context {
  private static instance: Context | null = null;
  private _data = new Map<string, unknown>();

  private constructor() {}

  public static getInstance() {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  public get entries() {
    return this._data;
  }

  public set(key: string, value: unknown) {
    this._data.set(key, value);
  }

  public clear() {
    this._data.clear();
  }
}

function main() {
  const context1 = Context.getInstance();
  context1.set('name', 'Jack');
  context1.set('address', { city: 'London', postCode: '12345' });
  console.log('context1', context1.entries);

  const context2 = Context.getInstance();
  console.log('context2', context2.entries);

  context2.clear();
  console.log('context1 after clear', context1.entries);
}

main();

export {};
