import { splace } from '.';

describe('exports', () => {
  it('exports function', () => {
    expect(splace).toBeInstanceOf(Function);
  });
});

describe('error', () => {
  it.each([
    -1,
    0,
    1,
    Symbol(''),
    [],
    new Date(),
    new Function(),
    null,
    undefined,
    {},
  ])('throws error if first argument is %p', (argument) => {
    expect(() => {
      splace(argument as string, {});
    }).toThrowError('First argument must be a string');
  });

  it.each(['', 'string', 0, 1, Symbol(''), null, undefined])(
    'throws error if second argument is %p',
    (argument) => {
      expect(() => {
        splace('', argument as unknown as object);
      }).toThrowError('Second argument must be an object');
    },
  );
});

describe('empty arguments', () => {
  it('transforms empty string', () => {
    expect(splace('', {})).toEqual([]);
  });

  it('transforms empty object', () => {
    expect(splace('a', {})).toEqual(['a']);
  });
});

describe('excludeEmpty=false', () => {
  it('splits and replaces a letter', () => {
    expect(splace('a', { a: 'b' }, false)).toEqual(['', 'b', '']);
  });

  it('splits and replaces a word', () => {
    expect(splace('Hello, world!', { world: 'foo' }, false)).toEqual([
      'Hello, ',
      'foo',
      '!',
    ]);
  });

  it('splits and replaces words', () => {
    expect(splace('foo bar baz', { foo: 'qux', bar: 'quux' }, false)).toEqual([
      '',
      'qux',
      ' ',
      'quux',
      ' baz',
    ]);
  });
});

describe('edge cases', () => {
  it('does not split and replace a non-matching key', () => {
    expect(splace('a', { b: 'c' })).toEqual(['a']);
  });

  it('splits and replaces a letter', () => {
    expect(splace('a', { a: 'b' })).toEqual(['b']);
  });

  it('splits and replaces space', () => {
    expect(splace(' ', { ' ': 'a' })).toEqual(['a']);
  });

  it('splits and replaces empty key', () => {
    expect(splace('a', { '': 'b' })).toEqual(['a']);
  });

  it('splits and replaces empty value', () => {
    expect(splace('a', { a: '' })).toEqual([]);
  });

  it('splits and replaces special character', () => {
    expect(splace('say what?', { '?': '!' })).toEqual(['say what', '!']);
  });

  it('splits and replaces special characters', () => {
    expect(
      splace('.*+?^${}()|[]\\', {
        '.': 'a',
        '*': 'b',
        '+': 'c',
        '?': 'd',
        '^': 'e',
        $: 'f',
        '{': 'g',
        '}': 'h',
        '(': 'i',
        ')': 'j',
        '|': 'k',
        '[': 'l',
        ']': 'm',
        '\\': 'n',
      }),
    ).toMatchInlineSnapshot(`
      [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
      ]
    `);
  });

  it('splits and replaces word with non-word', () => {
    expect(splace('Hello, world!', { world: 42 })).toEqual([
      'Hello, ',
      42,
      '!',
    ]);
  });

  it('splits and replaces words with non-words', () => {
    expect(splace('Hello, world!', { Hello: {}, world: [], '!': 0 })).toEqual([
      {},
      ', ',
      [],
      0,
    ]);
  });
});

describe('valid arguments', () => {
  it('splits and replaces letters', () => {
    expect(splace('abc', { b: 'd' })).toEqual(['a', 'd', 'c']);
  });

  it('splits and replaces word', () => {
    expect(splace('foo bar baz', { foo: 'qux' })).toEqual(['qux', ' bar baz']);
  });

  it('splits and replaces words', () => {
    expect(splace('foo bar baz', { foo: 'qux', bar: 'quux' })).toEqual([
      'qux',
      ' ',
      'quux',
      ' baz',
    ]);
  });
});

describe('complex string', () => {
  const string =
    'How much wood would a woodchuck chuck, if a woodchuck could chuck wood?';

  it('splits and replaces word', () => {
    expect(splace(string, { wood: 'foo' })).toMatchInlineSnapshot(`
      [
        "How much ",
        "foo",
        " would a ",
        "foo",
        "chuck chuck, if a ",
        "foo",
        "chuck could chuck ",
        "foo",
        "?",
      ]
    `);
  });

  it('splits and replaces words', () => {
    expect(splace(string, { wood: 'foo', chuck: 'bar' }))
      .toMatchInlineSnapshot(`
      [
        "How much ",
        "foo",
        " would a ",
        "foo",
        "bar",
        " ",
        "bar",
        ", if a ",
        "foo",
        "bar",
        " could ",
        "bar",
        " ",
        "foo",
        "?",
      ]
    `);
  });

  it('splits and replaces words following order', () => {
    expect(splace(string, { woodchuck: 'qux', wood: 'foo', chuck: 'bar' }))
      .toMatchInlineSnapshot(`
      [
        "How much ",
        "foo",
        " would a ",
        "qux",
        " ",
        "bar",
        ", if a ",
        "qux",
        " could ",
        "bar",
        " ",
        "foo",
        "?",
      ]
    `);
  });
});
