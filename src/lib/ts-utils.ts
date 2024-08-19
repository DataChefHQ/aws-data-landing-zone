
export function kebabToCamelCase(input: string): string {
  return input.split('-').map((word, index) => {
    if (index === 0) {
      return word;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }).join('');
}

export function groupByField<T>(items: T[], field: keyof T): {[key: string]: T[]} {
  return items.reduce<{[key: string]: T[]}>((acc, item) => {
    const key = String(item[field]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}
export function groupByFieldByFunction<T>(items: T[], keyFunction: (item : T) => string): {[key: string]: T[]} {
  return items.reduce<{[key: string]: T[]}>((acc, item) => {
    const key = keyFunction(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

export function uniqueValueByFunction<T>(items: T[], keyFunction: (item: T) => any): T[] {
  const uniqueKeys = new Set();
  const uniqueItems = [];

  for (const item of items) {
    const key = keyFunction(item);
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}